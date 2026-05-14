import express from "express";
import cors from "cors";

const PORT = Number(process.env.PORT || 8080);
const USER_BASE = process.env.USER_BASE || "http://127.0.0.1:8081";
const FOOD_BASE = process.env.FOOD_BASE || "http://127.0.0.1:8082";
const ORDER_BASE = process.env.ORDER_BASE || "http://127.0.0.1:8083";

async function proxyJson(req, res, url) {
  try {
    const init = { method: req.method, headers: { "Content-Type": "application/json" } };
    if (req.method !== "GET" && req.method !== "HEAD") init.body = JSON.stringify(req.body || {});
    const upstream = await fetch(url, init);
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader("Content-Type", "application/json");
    res.send(text || "{}");
  } catch (e) {
    res.status(500).json({ error: e?.message || "GATEWAY_ERROR" });
  }
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "apiGateway", deps: { USER_BASE, FOOD_BASE, ORDER_BASE } }));

// Users
app.post("/api/users/register", (req, res) => proxyJson(req, res, `${USER_BASE}/register`));
app.post("/api/users/login", (req, res) => proxyJson(req, res, `${USER_BASE}/login`));

// Foods
app.get("/api/foods", (req, res) => proxyJson(req, res, `${FOOD_BASE}/foods`));
app.get("/api/foods/:id", (req, res) => proxyJson(req, res, `${FOOD_BASE}/foods/${encodeURIComponent(req.params.id)}`));

// Orders
app.post("/api/orders", (req, res) => proxyJson(req, res, `${ORDER_BASE}/orders`));
app.get("/api/orders", (req, res) => proxyJson(req, res, `${ORDER_BASE}/orders?userId=${encodeURIComponent(String(req.query.userId || ""))}`));

app.listen(PORT, () => console.log(`API Gateway listening on :${PORT}`));

