import { promises as fs } from "fs";
import path from "path";

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

export async function loadJsonDb(filePath, defaultValue) {
  await ensureDir(filePath);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    if (e?.code === "ENOENT") {
      await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2), "utf8");
      return defaultValue;
    }
    throw e;
  }
}

export async function saveJsonDb(filePath, data) {
  await ensureDir(filePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

