"use client";

import { useRef, useState, useEffect } from "react";
import { ListFilter } from "lucide-react";

/* ------------------ Types & Constants ------------------ */

export type FilterValue = "unread" | "read" | "all";

export const FILTER_LABELS: Record<FilterValue, string> = {
  unread: "Unread",
  read: "Read",
  all: "All",
};

/* ------------------ Main Component ------------------ */
type FilterButtonProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
};

export default function FilterButton({
  value,
  onChange,
}: FilterButtonProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div ref={anchorRef} className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          flex items-center gap-2 px-3 py-2
          bg-[#F6F7F8] border border-[#DFE2E6]
          rounded-xl hover:bg-white transition
          text-sm font-medium
        "
      >
        <ListFilter size={16} />
        {FILTER_LABELS[value]}
      </button>

      {/* MOBILE → BOTTOM SHEET */}
      {open && isMobile && (
        <MobileBottomSheet onClose={() => setOpen(false)}>
          <FilterContent
            value={value}
            onChange={(v) => {
              onChange(v);
              setOpen(false);
            }}
          />
        </MobileBottomSheet>
      )}

      {/* DESKTOP → POPOVER */}
      {open && !isMobile && (
        <DesktopPopover onClose={() => setOpen(false)}>
          <FilterContent
            value={value}
            onChange={(v) => {
              onChange(v);
              setOpen(false);
            }}
          />
        </DesktopPopover>
      )}
    </div>
  );
}

/* ------------------ Filter Content ------------------ */

function FilterContent({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  return (
    <div className="space-y-6">
      {(Object.keys(FILTER_LABELS) as FilterValue[]).map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className="flex w-full items-center justify-between text-base"
        >
          <span>{FILTER_LABELS[key]}</span>

          <span
            className={`h-5 w-5 rounded-full border flex items-center justify-center
              ${value === key ? "border-[#C95C3A]" : "border-gray-300"}
            `}
          >
            {value === key && (
              <span className="h-3 w-3 rounded-full bg-[#C95C3A]" />
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ------------------ Desktop Popover ------------------ */

function DesktopPopover({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Popover (FIXED, NOT CLIPPED) */}
      <div className="fixed z-50 top-[90px] right-6 w-56 rounded-xl border bg-white p-4 shadow-lg">
        {children}
      </div>
    </>
  );
}

/* ------------------ Mobile Bottom Sheet ------------------ */

function MobileBottomSheet({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 sm:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="absolute bottom-0 w-full rounded-t-2xl bg-white p-6">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-300" />
        {children}
      </div>
    </div>
  );
}
