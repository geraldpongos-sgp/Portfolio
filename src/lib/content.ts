import fs from "fs/promises";
import path from "path";
import { defaultPortfolioData, PortfolioData } from "@/data/portfolio";

const CONTENT_KEY = "portfolio:content";
const LOCAL_FILE = path.join(process.cwd(), ".data", "content.json");

const hasRedis = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

export async function getContent(): Promise<PortfolioData> {
  try {
    if (hasRedis) {
      const redis = await getRedis();
      const data = await redis.get<PortfolioData>(CONTENT_KEY);
      return data ?? defaultPortfolioData;
    }
    const raw = await fs.readFile(LOCAL_FILE, "utf-8");
    return JSON.parse(raw) as PortfolioData;
  } catch {
    return defaultPortfolioData;
  }
}

export async function saveContent(data: PortfolioData): Promise<void> {
  if (hasRedis) {
    const redis = await getRedis();
    await redis.set(CONTENT_KEY, data);
    return;
  }
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export const isPersistenceConfigured = hasRedis;
