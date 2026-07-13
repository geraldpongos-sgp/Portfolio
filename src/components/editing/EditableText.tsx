"use client";

import React, { useEffect, useRef } from "react";

export function EditableText({
  value,
  onCommit,
  className = "",
  as = "span",
  multiline = false,
  placeholder = "Click to edit...",
}: {
  value: string;
  onCommit: (value: string) => void;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  multiline?: boolean;
  placeholder?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Resync DOM text when the value changes externally (e.g. a sibling list item
    // was removed and this instance now represents different data at the same index).
    // Skip while focused so we don't clobber in-progress typing.
    if (ref.current && document.activeElement !== ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  const handleBlur = () => {
    const text = ref.current?.textContent ?? "";
    if (text !== value) onCommit(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      (ref.current as HTMLElement)?.blur();
    }
    if (e.key === "Escape") {
      if (ref.current) ref.current.textContent = value;
      (ref.current as HTMLElement)?.blur();
    }
  };

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-placeholder={placeholder}
      className={`${className} ${multiline ? "whitespace-pre-wrap" : ""} outline outline-dashed outline-1 outline-[#e8b654]/30 hover:outline-[#e8b654]/60 focus:outline-2 focus:outline-[#e8b654] focus:bg-[#e8b654]/5 rounded-sm px-0.5 -mx-0.5 cursor-text transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-[#5c5142]`}
    />
  );
}
