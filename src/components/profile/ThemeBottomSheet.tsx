"use client";

import { useEffect, useRef, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

interface ThemeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  value?: ThemeMode;
  onChange?: (theme: ThemeMode) => void;
}

export default function ThemeBottomSheet({
  isOpen,
  onClose,
  value = "system",
  onChange,
}: ThemeBottomSheetProps) {
  const [theme, setTheme] = useState<ThemeMode>(value);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Lock body scroll */
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  /* ESC key */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* Outside click */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectTheme = (mode: ThemeMode) => {
    setTheme(mode);
    onChange?.(mode);
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Bottom Sheet */}
      <div
        className="fixed inset-x-0 bottom-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={panelRef}
          className="
            bg-white
            rounded-t-2xl
            p-5
            shadow-[0_-8px_24px_rgba(0,0,0,0.08)]
          "
        >
          {/* Handle */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1.5 rounded-full bg-gray-300" />
          </div>

          <h3 className="text-base font-medium mb-4 text-center">
            App theme
          </h3>

          <div className="flex gap-3">
            <ThemeCard
              label="Light"
              image="/badges/theme-light.png"
              active={theme === "light"}
              onClick={() => selectTheme("light")}
            />
            <ThemeCard
              label="Dark"
              image="/badges/theme-dark.png" 
              active={theme === "dark"}
              onClick={() => selectTheme("dark")}
            />
            <ThemeCard
              label="System"
              image="/badges/theme-system.png" 
              active={theme === "system"}
              onClick={() => selectTheme("system")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* THEME CARD */
/* ---------------------------------- */

function ThemeCard({
  label,
  image,
  active,
  onClick,
}: {
  label: string;
  image: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center gap-2"
    >
      <div
        className={`
          rounded-[20px] overflow-hidden border
          ${active ? "border-black border-4" : "border-gray-300"}
        `}
      >
        <img
          src={image}
          alt={label}
          className="w-full h-auto object-cover"
        />
      </div>

      <span className="text-sm font-medium text-[#0C1014]">
        {label}
      </span>
    </button>
  );
}
