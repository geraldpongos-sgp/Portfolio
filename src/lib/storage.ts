import fs from "fs/promises";
import path from "path";

const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function saveUpload(file: File): Promise<string> {
  const filename = `${Date.now()}-${safeName(file.name)}`;

  if (hasBlob) {
    const { put } = await import("@vercel/blob");
    const blob = await put(filename, file, { access: "public" });
    return blob.url;
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export const isBlobConfigured = hasBlob;
