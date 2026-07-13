import { NextResponse } from "next/server";
import { isBlobConfigured } from "@/lib/storage";
import { isPersistenceConfigured } from "@/lib/content";

export async function GET() {
  return NextResponse.json({
    blobConfigured: isBlobConfigured,
    redisConfigured: isPersistenceConfigured,
  });
}
