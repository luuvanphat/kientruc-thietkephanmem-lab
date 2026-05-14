import express from "express";
import { nanoid } from "nanoid";
import { connectWithRetry, consumeQueue, publishJson, ROUTING, setupChannel } from "../shared/eventBus.js";

const PORT = Number(process.env.PORT || 8084);
const AMQP_URL = process.env.AMQP_URL || "amqp://guest:guest@127.0.0.1:5672";

let ch;

function randomSuccess() {
  return Math.random() < 0.8;
}

async function startConsumer() {
  const conn = await connectWithRetry(AMQP_URL);
  ch = await setupChannel(conn);

  await consumeQueue(ch, "fds.payment.process", [ROUTING.ORDER_CREATED], async (evt) => {
    // simulate payment processing latency
    await new Promise((r) => setTimeout(r, 300 + Math.floor(Math.random() * 700)));

    const ok = randomSuccess();
    const routingKey = ok ? ROUTING.PAYMENT_SUCCESS : ROUTING.PAYMENT_FAILED;

    publishJson(ch, routingKey, {
      eventId: `evt_${nanoid(10)}`,
      type: ok ? "PAYMENT_SUCCESS" : "PAYMENT_FAILED",
      orderId: evt.orderId,
      createdAt: new Date().toISOString()
    });
  });
}

const app = express();

app.get("/health", (_req, res) => res.json({ ok: true, service: "paymentService", amqp: AMQP_URL }));

await startConsumer();

app.listen(PORT, () => console.log(`Payment Service listening on :${PORT}`));

