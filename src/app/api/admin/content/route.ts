import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { PortfolioData } from "@/data/portfolio";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as PortfolioData;

  if (!body.personalInfo || !body.contact || !Array.isArray(body.projects)) {
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }

  await saveContent(body);
  return NextResponse.json({ success: true });
}
