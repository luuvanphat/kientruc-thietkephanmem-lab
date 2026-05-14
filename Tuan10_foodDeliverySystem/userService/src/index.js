import express from "express";
import cors from "cors";
import { loadJsonDb, saveJsonDb } from "./db.js";

const PORT = Number(process.env.PORT || 8081);
const DB_PATH = process.env.DB_PATH || "./users.json";

async function readDb() {
  return await loadJsonDb(DB_PATH, { nextId: 1, users: [] });
}
async function writeDb(db) {
  await saveJsonDb(DB_PATH, db);
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "userService" }));

// POST /register { username, password }
app.post("/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "INVALID_INPUT" });
  const db = await readDb();
  if (db.users.some((u) => u.username === username)) return res.status(409).json({ error: "USERNAME_TAKEN" });
  const id = String(db.nextId++);
  db.users.push({ id, username, password });
  await writeDb(db);
  res.json({ ok: true, userId: id });
});

// POST /login { username, password }
app.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "INVALID_INPUT" });
  const db = await readDb();
  const u = db.users.find((x) => x.username === username && x.password === password) || null;
  if (!u) return res.status(401).json({ error: "INVALID_CREDENTIALS" });
  res.json({ ok: true, userId: u.id });
});

app.listen(PORT, () => console.log(`User Service listening on :${PORT}`));

