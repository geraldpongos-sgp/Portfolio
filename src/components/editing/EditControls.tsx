"use client";

import React from "react";
import { Plus, X } from "lucide-react";

export function RemoveButton({
  onClick,
  className = "",
  size = 12,
}: {
  onClick: () => void;
  className?: string;
  size?: number;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label="Remove"
      className={`z-30 flex items-center justify-center rounded-full bg-red-500/90 hover:bg-red-500 text-white shadow-md transition-colors ${className}`}
    >
      <X size={size} />
    </button>
  );
}

export function AddTile({
  label,
  onClick,
  className = "",
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 border border-dashed border-[#e8b654]/40 hover:border-[#e8b654] text-[#e8b654] hover:text-[#f5efe4] rounded-xl text-sm font-semibold transition-colors ${className}`}
    >
      <Plus size={16} /> {label}
    </button>
  );
}
