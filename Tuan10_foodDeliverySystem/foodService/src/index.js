import express from "express";
import cors from "cors";

const PORT = Number(process.env.PORT || 8082);

const foods = [
  { id: "f1", name: "Cơm gà xối mỡ", price: 45000, desc: "Giòn rụm, kèm nước sốt" },
  { id: "f2", name: "Bún bò Huế", price: 55000, desc: "Cay nhẹ, nhiều topping" },
  { id: "f3", name: "Trà sữa trân châu", price: 39000, desc: "Size M, ít đường" }
];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true, service: "foodService" }));

// GET /foods
app.get("/foods", (_req, res) => {
  res.json(foods.map(({ id, name, price }) => ({ id, name, price })));
});

// GET /foods/:id
app.get("/foods/:id", (req, res) => {
  const f = foods.find((x) => x.id === req.params.id);
  if (!f) return res.status(404).json({ error: "FOOD_NOT_FOUND" });
  res.json(f);
});

app.listen(PORT, () => console.log(`Food Service listening on :${PORT}`));

