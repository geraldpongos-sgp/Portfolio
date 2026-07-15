import { NextRequest, NextResponse } from "next/server";
import { saveUpload } from "@/lib/storage";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isPdf = file.type === "application/pdf";
  if (!isImage && !isVideo && !isPdf) {
    return NextResponse.json({ error: "Only image, video, or PDF files are allowed." }, { status: 400 });
  }

  const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File is too large." }, { status: 400 });
  }

  const url = await saveUpload(file);
  return NextResponse.json({ url });
}
