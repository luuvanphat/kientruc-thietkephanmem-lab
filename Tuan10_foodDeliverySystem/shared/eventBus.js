import amqplib from "amqplib";

export const EXCHANGE = "fds.events";

export const ROUTING = {
  ORDER_CREATED: "order.created",
  PAYMENT_SUCCESS: "payment.success",
  PAYMENT_FAILED: "payment.failed"
};

export async function connectWithRetry(amqpUrl, { retries = 50, delayMs = 1000 } = {}) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await amqplib.connect(amqpUrl);
      return conn;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastErr;
}

export async function setupChannel(conn) {
  const ch = await conn.createChannel();
  await ch.assertExchange(EXCHANGE, "topic", { durable: true });
  return ch;
}

export function publishJson(ch, routingKey, payload) {
  const buf = Buffer.from(JSON.stringify(payload));
  ch.publish(EXCHANGE, routingKey, buf, {
    contentType: "application/json",
    persistent: true
  });
}

export async function consumeQueue(ch, queueName, bindings, onMessage) {
  const q = await ch.assertQueue(queueName, { durable: true });
  for (const rk of bindings) {
    await ch.bindQueue(q.queue, EXCHANGE, rk);
  }
  await ch.consume(
    q.queue,
    async (msg) => {
      if (!msg) return;
      try {
        const json = JSON.parse(msg.content.toString("utf8"));
        await onMessage(json, msg.fields.routingKey);
        ch.ack(msg);
      } catch (e) {
        console.error("consume error", e);
        ch.nack(msg, false, false);
      }
    },
    { noAck: false }
  );
}

