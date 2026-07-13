export async function uploadFile(file: File, blobConfigured: boolean): Promise<string> {
  if (blobConfigured) {
    const { upload } = await import("@vercel/blob/client");
    const blob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/admin/blob-upload",
    });
    return blob.url;
  }

  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Upload failed.");
  return json.url;
}
