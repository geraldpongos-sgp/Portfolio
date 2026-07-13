"use client";

import React, { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { uploadFile } from "@/lib/uploadClient";

export function EditableImage({
  onUploaded,
  blobConfigured,
  accept = "image/*",
  label = "Change Photo",
  className = "",
  inline = false,
}: {
  onUploaded: (url: string) => void;
  blobConfigured: boolean;
  accept?: string;
  label?: string;
  className?: string;
  inline?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file, blobConfigured);
      onUploaded(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const wrapperClassName = inline
    ? `relative flex items-center justify-start bg-white/5 hover:bg-white/10 border border-[#2a231a] rounded-lg px-3 py-2 transition-colors cursor-pointer ${className}`
    : `absolute inset-0 z-30 flex items-center justify-center bg-black/0 hover:bg-black/55 opacity-0 hover:opacity-100 transition-all cursor-pointer ${className}`;

  return (
    <div className={wrapperClassName} onClick={() => inputRef.current?.click()}>
      <span
        className={
          inline
            ? "inline-flex items-center gap-2 text-xs font-semibold text-[#d8cbb2]"
            : "inline-flex items-center gap-2 px-4 py-2 rounded-full gold-fill text-[#050403] text-xs font-bold whitespace-nowrap"
        }
      >
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {uploading ? "Uploading..." : label}
      </span>
      {error && (
        <span className="absolute bottom-full mb-1 inset-x-0 text-center text-[10px] text-red-300 bg-black/70 rounded px-1 py-0.5">
          {error}
        </span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
