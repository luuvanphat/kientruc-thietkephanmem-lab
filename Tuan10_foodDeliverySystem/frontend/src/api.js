export const GATEWAY_BASE = String(import.meta.env.VITE_GATEWAY_BASE || "http://localhost:8080");

export async function apiJson(path, init) {
  const res = await fetch(`${GATEWAY_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.error || `HTTP_${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

