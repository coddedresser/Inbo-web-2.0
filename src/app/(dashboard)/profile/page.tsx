"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Mail } from "lucide-react";

export default function ProfileSection() {
  const [appearance, setAppearance] = useState<"light" | "dark" | "system">(
    "system"
  );

  return (
    <div className="flex flex-col w-full">
      {/* HEADER (unchanged) */}
      <div className="w-full">
        <div className="w-full h-[78px] bg-white border border-[#E5E7EB] flex items-center justify-between px-6 shadow-sm">
          <h2 className="text-[26px] font-bold text-[#0C1014]">Profile</h2>
        </div>
      </div>

      {/* INNER CONTAINER */}
      <div className="flex flex-col w-full px-6 py-8 gap-6">

        {/* ---------------- PROFILE CARD ---------------- */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#EDEDED]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
              AS
            </div>

            <div>
              <p className="font-semibold text-lg text-gray-900">Sarah Mitchell</p>
              <p className="text-sm text-gray-500">Joined August 17, 2025</p>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                <Mail size={14} /> example@email.com
              </p>
            </div>

            <button className="ml-auto px-5 py-2 border rounded-xl text-sm hover:bg-gray-50">
              Edit
            </button>
          </div>
        </div>

        {/* ---------------- INBO MAIL ---------------- */}
        <div className="bg-white rounded-2xl shadow-md border border-[#EDEDED] p-6">
          <p className="font-semibold text-gray-900 text-lg mb-3">Your Inbo mail</p>

          <div className="relative bg-[#FFF4E8] border border-[#F8D6B8] px-5 py-6 rounded-xl overflow-hidden flex justify-between items-center">
            <div className="absolute right-0 top-0 opacity-50">
              <Image src="/profile/mail-bg.png" alt="bg" width={300} height={140} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <Image src="/logos/help-inbo-logo.png" alt="icon" width={32} height={32} />
                <div>
                  <p className="font-semibold text-[#C94F26] text-sm">Inbo Mailbox</p>
                  <p className="font-semibold text-gray-900 text-base">example@inbo.club</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Use this email address when subscribing to newsletters. All newsletters
                sent to this address will appear here in Inbo.
              </p>
            </div>

            <button className="relative z-10 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 shadow-sm text-sm">
              Copy Address
            </button>
          </div>
        </div>

        {/* ---------------- MOBILE APP DOWNLOAD ---------------- */}
        <div className="bg-white rounded-2xl shadow-md border border-[#EDEDED] px-6 py-8">
          <p className="text-[#E55E3A] font-semibold text-sm">MOBILE APP</p>
          <p className="font-semibold text-lg text-gray-900 mt-2">
            Scan QR to download our INBO Application
          </p>

          <div className="flex items-center justify-between mt-6">
            <Image
              src="/profile/phone.png"
              alt="Mobile app"
              width={260}
              height={200}
              className="rounded-xl"
            />

            <div className="flex gap-10">
              <div className="flex flex-col items-center">
                <Image
                  src="/profile/qr-ios.png"
                  width={110}
                  height={110}
                  alt="QR iOS"
                  className="rounded-md shadow"
                />
                <p className="mt-2 text-sm">For iOS</p>
              </div>

              <div className="flex flex-col items-center">
                <Image
                  src="/profile/qr-android.png"
                  width={110}
                  height={110}
                  alt="QR Android"
                  className="rounded-md shadow"
                />
                <p className="mt-2 text-sm">For Android</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- APPEARANCE ---------------- */}
        <div className="bg-white rounded-2xl shadow-md border border-[#EDEDED] p-6">
          <p className="font-semibold text-gray-900 text-lg mb-4">Appearance</p>

          <div className="flex items-center gap-6">
            {[
              { mode: "light", img: "/profile/appearance-light.png" },
              { mode: "dark", img: "/profile/appearance-dark.png" },
              { mode: "system", img: "/profile/appearance-system.png" },
            ].map(({ mode, img }) => (
              <button
                key={mode}
                onClick={() => setAppearance(mode as any)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  appearance === mode
                    ? "border-[#E55E3A] shadow-lg"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Image src={img} width={110} height={70} alt={mode} />
                <span className="text-sm capitalize">{mode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- GMAIL CONNECTION ---------------- */}
        <div className="bg-white rounded-2xl shadow-md border border-[#EDEDED] p-6">
          <p className="font-semibold text-gray-900 text-lg mb-3">Gmail Connection</p>

          <div className="flex items-center gap-3">
            <Image src="/profile/gmail.png" width={32} height={32} alt="Gmail" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">Gmail (Primary)</p>
              <p className="text-sm text-gray-600">example@inbo.club</p>
            </div>
          </div>
        </div>

        {/* ---------------- INTEGRATION ---------------- */}
        <div className="bg-white rounded-2xl shadow-md border border-[#EDEDED] p-6">
          <p className="font-semibold text-lg text-gray-900">Integration</p>

          <p className="text-sm text-gray-500 mt-2 mb-4">No Integration Apps Found</p>

          <button className="px-5 py-2 bg-[#d25f3f] text-white rounded-full hover:bg-[#d95332] shadow-sm">
            + Add apps
          </button>
        </div>

        {/* ---------------- SETTINGS ---------------- */}
        <div className="bg-white rounded-2xl shadow-md border border-[#EDEDED] p-6">
          <p className="font-semibold text-gray-900 mb-4 text-lg">Setting and Helps</p>

          {[
            { label: "Account", icon: "/icons/account-icon.png" },
            { label: "Help Center", icon: "/icons/help-center-icon.png" },
            { label: "Contact Support", icon: "/icons/contact-support-icon.png" },
            { label: "Privacy & Security Info", icon: "/icons/account-icon.png" },
            { label: "Send Feedback", icon: "/icons/feedback-icon.png" },
            { label: "Report a Bug", icon: "/icons/feedback-bug-icon.png" },
            { label: "About", icon: "/icons/about-icon.png" },
          ].map(({ label, icon }) => (
            <div
              key={label}
              className="w-full bg-white rounded-xl shadow-[0px_4px_24px_rgba(219,219,219,0.25)] border border-[#EEEFF2] px-4 py-3 flex items-center justify-between mb-3 cursor-pointer hover:bg-gray-50"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">
                <Image src={icon} width={22} height={22} alt={label} />
                <span className="text-[#0C1014] text-[16px] leading-[20px] font-normal">
                  {label}
                </span>
              </div>

              {/* RIGHT ARROW */}
              <ChevronRight className="text-black opacity-80" size={20} />
            </div>
          ))}

          <button className="mt-6 w-full text-red-500 border border-red-300 py-2 rounded-lg bg-[#FFF5F5] hover:bg-[#ffecec]">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
