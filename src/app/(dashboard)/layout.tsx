"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileHeader from "@/components/layout/MobileHeader";
import HelpWidget from "@/components/HelpWidget";
import { usePathname } from "next/navigation"; // <-- added

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // <-- added

  // Hide HelpWidget only on /profile
  const hideHelpWidget = pathname === "/profile";

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#ECEEF2] text-[#0C1014]">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setMenuOpen(true)} />

      {/* Main area - container */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4 min-h-0">
        {/* Sidebar (drawer for mobile, fixed for desktop) */}
        <Sidebar openMobile={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* Content area: allow inner scrolling, no page overflow */}
        <main
          className="
            flex-1 min-h-0 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            bg-[#FFFFFF]/60 backdrop-blur-xl border border-[#E5E7EB]
            rounded-2xl shadow-sm
            p-0 pb-6
          "
        >
          {children}
        </main>
      </div>

      {/* Hide HelpWidget on /profile */}
      {!hideHelpWidget && <HelpWidget />}
    </div>
  );
}
