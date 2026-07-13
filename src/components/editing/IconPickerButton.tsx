"use client";

import React, { useState } from "react";
import type { ComponentType } from "react";

export function IconPickerButton({
  value,
  options,
  iconMap,
  onChange,
  size = 18,
}: {
  value: string;
  options: string[];
  iconMap: Record<string, ComponentType<{ size?: number; className?: string }>>;
  onChange: (icon: string) => void;
  size?: number;
}) {
  const [open, setOpen] = useState(false);
  const Current = iconMap[value];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="p-1.5 rounded-md hover:bg-[#e8b654]/20 transition-colors outline outline-dashed outline-1 outline-[#e8b654]/30"
        aria-label="Change icon"
      >
        {Current && <Current size={size} className="text-[#e8b654]" />}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute z-40 top-full left-0 mt-1 p-2 grid grid-cols-5 gap-1 bg-[#14100c] border border-[#2a231a] rounded-lg shadow-xl w-56">
            {options.map((name) => {
              const Icon = iconMap[name];
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={`p-2 rounded-md flex items-center justify-center hover:bg-[#e8b654]/20 transition-colors ${
                    name === value ? "bg-[#e8b654]/20" : ""
                  }`}
                  aria-label={name}
                >
                  <Icon size={16} className="text-[#e8dcc4]" />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
