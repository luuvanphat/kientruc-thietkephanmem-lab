import express from "express";
import { connectWithRetry, consumeQueue, ROUTING, setupChannel } from "../shared/eventBus.js";

const PORT = Number(process.env.PORT || 8085);
const AMQP_URL = process.env.AMQP_URL || "amqp://guest:guest@127.0.0.1:5672";

async function startConsumer() {
  const conn = await connectWithRetry(AMQP_URL);
  const ch = await setupChannel(conn);

  await consumeQueue(ch, "fds.notification", [ROUTING.PAYMENT_SUCCESS], async (evt) => {
    console.log(`"Đơn hàng #${evt.orderId} đã thanh toán thành công!"`);
  });
}

const app = express();
app.get("/health", (_req, res) => res.json({ ok: true, service: "notificationService", amqp: AMQP_URL }));

await startConsumer();

app.listen(PORT, () => console.log(`Notification Service listening on :${PORT}`));

