import React, { useEffect, useMemo, useState } from "react";
import { apiJson, GATEWAY_BASE } from "./api.js";

export default function App() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem("fds_auth");
    return raw ? JSON.parse(raw) : { userId: "" };
  });
  const isLoggedIn = useMemo(() => Boolean(auth.userId), [auth.userId]);

  const [username, setUsername] = useState("bao");
  const [password, setPassword] = useState("123");

  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState({}); // foodId -> qty
  const [orders, setOrders] = useState([]);

  async function loadFoods() {
    const list = await apiJson("/api/foods");
    setFoods(list);
  }

  async function loadOrders() {
    if (!auth.userId) return;
    const list = await apiJson(`/api/orders?userId=${encodeURIComponent(auth.userId)}`);
    setOrders(list);
  }

  useEffect(() => {
    loadFoods().catch(() => {});
  }, []);

  useEffect(() => {
    loadOrders().catch(() => {});
    const t = setInterval(() => loadOrders().catch(() => {}), 1500);
    return () => clearInterval(t);
  }, [auth.userId]);

  async function register() {
    setBusy(true);
    setMessage("");
    try {
      const r = await apiJson("/api/users/register", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      setMessage(`REGISTER_OK userId=${r.userId}`);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function login() {
    setBusy(true);
    setMessage("");
    try {
      const r = await apiJson("/api/users/login", { method: "POST", body: JSON.stringify({ username, password }) });
      const a = { userId: r.userId };
      setAuth(a);
      localStorage.setItem("fds_auth", JSON.stringify(a));
      setMessage("LOGIN_OK");
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    setAuth({ userId: "" });
    localStorage.removeItem("fds_auth");
    setCart({});
    setOrders([]);
    setMessage("LOGOUT_OK");
  }

  function add(foodId) {
    setCart((c) => ({ ...c, [foodId]: (c[foodId] || 0) + 1 }));
  }

  function dec(foodId) {
    setCart((c) => {
      const next = { ...c };
      const v = (next[foodId] || 0) - 1;
      if (v <= 0) delete next[foodId];
      else next[foodId] = v;
      return next;
    });
  }

  async function createOrder() {
    if (!isLoggedIn) return setMessage("PLEASE_LOGIN");
    const items = Object.entries(cart).map(([foodId, qty]) => ({ foodId, qty }));
    if (!items.length) return setMessage("CART_EMPTY");

    setBusy(true);
    setMessage("");
    try {
      await apiJson("/api/orders", { method: "POST", body: JSON.stringify({ userId: auth.userId, items }) });
      setCart({});
      await loadOrders();
      setMessage("ORDER_CREATED (payment async via event)");
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  }

  const cartCount = Object.values(cart).reduce((s, v) => s + (Number(v) || 0), 0);

  return (
    <div className="page">
      <header className="header">
        <div>
          <div className="title">Food Delivery — Hybrid (REST + Event)</div>
          <div className="sub">
            Gateway: <code>{GATEWAY_BASE}</code>
          </div>
        </div>
        <div className="pill">
          {isLoggedIn ? (
            <>
              userId: <b>{auth.userId}</b>
              <button className="btn" onClick={logout} disabled={busy}>
                Logout
              </button>
            </>
          ) : (
            <span className="muted">Chưa đăng nhập</span>
          )}
        </div>
      </header>

      {message ? <div className="alert">{message}</div> : null}

      <div className="grid">
        <section className="card">
          <div className="cardTitle">Login/Register</div>
          <div className="formRow">
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} disabled={busy} />
          </div>
          <div className="formRow">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} />
          </div>
          <div className="actions">
            <button className="btn" onClick={register} disabled={busy}>
              Register
            </button>
            <button className="btn primary" onClick={login} disabled={busy}>
              Login
            </button>
            <div className="muted small">Demo: đăng ký tài khoản bất kỳ, rồi login.</div>
          </div>
        </section>

        <section className="card">
          <div className="cardTitle">Danh sách món</div>
          <div className="actions">
            <button className="btn" onClick={() => loadFoods().catch(() => {})} disabled={busy}>
              Refresh foods
            </button>
          </div>
          <div className="list">
            {foods.map((f) => (
              <div className="row" key={f.id}>
                <div className="rowMain">
                  <div className="rowName">
                    {f.name} <span className="muted">({f.id})</span>
                  </div>
                  <div className="rowMeta">
                    Giá: <b>{Number(f.price).toLocaleString()}đ</b>
                  </div>
                </div>
                <button className="btn primary" onClick={() => add(f.id)} disabled={busy}>
                  + Add
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="card span2">
          <div className="cardTitle">Giỏ hàng / Đặt hàng</div>
          <div className="actions">
            <button className="btn primary" onClick={createOrder} disabled={busy || !cartCount}>
              Create order (REST)
            </button>
            <div className="muted small">
              Payment chạy ngầm bằng event; status order sẽ tự đổi khi refresh/poll.
            </div>
          </div>
          {cartCount ? (
            <div className="list">
              {Object.entries(cart).map(([foodId, qty]) => (
                <div className="row" key={foodId}>
                  <div className="rowMain">
                    <div className="rowName">{foodId}</div>
                    <div className="rowMeta">
                      Qty: <b>{qty}</b>
                    </div>
                  </div>
                  <div className="actions">
                    <button className="btn" onClick={() => dec(foodId)} disabled={busy}>
                      -
                    </button>
                    <button className="btn" onClick={() => add(foodId)} disabled={busy}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="muted">Giỏ hàng trống.</div>
          )}
        </section>

        <section className="card span2">
          <div className="cardTitle">Đơn hàng (GET /orders)</div>
          <div className="actions">
            <button className="btn" onClick={() => loadOrders().catch(() => {})} disabled={busy || !isLoggedIn}>
              Refresh orders
            </button>
          </div>
          <div className="list">
            {orders.map((o) => (
              <div className="row" key={o.orderId}>
                <div className="rowMain">
                  <div className="rowName">
                    Order <b>{o.orderId}</b> · status <b>{o.status}</b>
                  </div>
                  <div className="rowMeta muted small">{o.createdAt}</div>
                </div>
              </div>
            ))}
            {orders.length === 0 ? <div className="muted">Chưa có order.</div> : null}
          </div>
        </section>
      </div>
    </div>
  );
}

