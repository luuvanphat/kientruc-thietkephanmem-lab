import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { loadJsonDb, saveJsonDb } from "./db.js";
import { connectWithRetry, consumeQueue, publishJson, ROUTING, setupChannel } from "../shared/eventBus.js";

const PORT = Number(process.env.PORT || 8083);
const DB_PATH = process.env.DB_PATH || "./orders.json";
const AMQP_URL = process.env.AMQP_URL || "amqp://guest:guest@127.0.0.1:5672";

async function readDb() {
  return await loadJsonDb(DB_PATH, { orders: [] });
}
async function writeDb(db) {
  await saveJsonDb(DB_PATH, db);
}

let ch;

async function startEventConsumer() {
  const conn = await connectWithRetry(AMQP_URL);
  ch = await setupChannel(conn);

  // Consume payment result to update order status
  await consumeQueue(ch, "fds.order.update", [ROUTING.PAYMENT_SUCCESS, ROUTING.PAYMENT_FAILED], async (evt, rk) => {
    const db = await readDb();
    const idx = db.orders.findIndex((o) => o.orderId === evt.orderId);
    if (idx < 0) return;
    db.orders[idx].status = rk === ROUTING.PAYMENT_SUCCESS ? "PAID" : "PAYMENT_FAILED";
    db.orders[idx].payment = { status: rk, at: new Date().toISOString() };
    await writeDb(db);
  });
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "orderService", amqp: AMQP_URL }));

// POST /orders { userId, items: [{foodId, qty}] }
// Return nhanh: tạo order PENDING + publish ORDER_CREATED
app.post("/orders", async (req, res) => {
  const { userId, items } = req.body || {};
  const normalized = Array.isArray(items)
    ? items
        .map((i) => ({ foodId: String(i.foodId || ""), qty: Number(i.qty || 0) }))
        .filter((i) => i.foodId && Number.isFinite(i.qty) && i.qty > 0)
    : [];

  if (!userId || normalized.length === 0) return res.status(400).json({ error: "INVALID_INPUT" });
  if (!ch) return res.status(503).json({ error: "EVENT_BUS_NOT_READY" });

  const orderId = `o_${nanoid(10)}`;
  const createdAt = new Date().toISOString();
  const order = { orderId, userId: String(userId), items: normalized, status: "PENDING_PAYMENT", createdAt };

  const db = await readDb();
  db.orders.push(order);
  await writeDb(db);

  publishJson(ch, ROUTING.ORDER_CREATED, {
    eventId: `evt_${nanoid(10)}`,
    type: "ORDER_CREATED",
    orderId,
    userId: String(userId),
    items: normalized,
    createdAt
  });

  res.json({ ok: true, order });
});

// GET /orders?userId=...
app.get("/orders", async (req, res) => {
  const userId = String(req.query.userId || "");
  const db = await readDb();
  const list = userId ? db.orders.filter((o) => o.userId === userId) : db.orders;
  res.json(list.slice().reverse());
});

await startEventConsumer();

app.listen(PORT, () => console.log(`Order Service listening on :${PORT}`));

