"use client";

import { ListFilter } from "lucide-react";

export default function FilterButton({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2
        bg-[#F6F7F8] border border-[#DFE2E6]
        rounded-xl hover:bg-white transition
        text-sm font-medium
        ${className}
      `}
    >
      {/* Icon (always visible) */}
      <ListFilter size={16} />

      {/* Text (hidden on mobile, visible from sm: and up) */}
      <span className="hidden sm:inline">Filter</span>
    </button>
  );
}
