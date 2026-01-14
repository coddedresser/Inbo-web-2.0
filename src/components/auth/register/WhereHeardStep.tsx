"use client";

import {
  UsersIcon,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { userService } from "@/services/user";

/* Same media hook pattern */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener();
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

interface WhereStepProps {
  whereHeard: string;
  setWhereHeard: (value: string) => void;
  categories: string[];
  reminder: string;
  reminderTime: string;
  onContinue: () => void;
  onBack: () => void;
}

export default function WhereStep({
  whereHeard,
  setWhereHeard,
  categories,
  reminder,
  reminderTime,
  onContinue,
  onBack,
}: WhereStepProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    { key: "app_store", label: "App Store", icon: <img src="/icons/apple-store-icon.png" className="h-5 w-5" /> },
    { key: "google", label: "Google Search", icon: <img src="/icons/google-icon.png" className="h-5 w-5" /> },
    {
      key: "social",
      label: "Facebook/Instagram",
      icon: <img src="/icons/instagram-icon.png" className="h-5 w-5" />,
    },
    { key: "friends", label: "Friends/family", icon: <UsersIcon size={18} /> },
    { key: "other", label: "Other", icon: <MoreHorizontal size={18} /> },
  ];

  const canContinue = !!whereHeard;

  /* ---------------- SUBMIT ONBOARDING ---------------- */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await userService.completeOnboarding({
        categories,
        reminder: reminder !== "none" ? reminder : undefined,
        reminderTime: reminder !== "none" ? reminderTime : undefined,
        whereHeard,
      });
      
      onContinue();
    } catch (err: any) {
      console.error("Onboarding submission failed:", err);
      setError(err?.response?.data?.message || "Failed to complete onboarding. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- SKIP (still submits other data) ---------------- */
  const handleSkip = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await userService.completeOnboarding({
        categories,
        reminder: reminder !== "none" ? reminder : undefined,
        reminderTime: reminder !== "none" ? reminderTime : undefined,
        // whereHeard is optional when skipping
      });
      
      onContinue();
    } catch (err: any) {
      console.error("Onboarding submission failed:", err);
      // Still navigate even if API fails, user can complete later
      onContinue();
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     MOBILE SECTION
     ========================= */
  if (isMobile) {
    return (
      <div className="max-h-screen flex flex-col bg-white">

        {/* CONTENT */}
        <div className="flex-1 px-4 pt-6 pb-40">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-[24px] font-bold text-[#0C1014] leading-[30px]">
              Where did you hear<br />about inbo?
            </h1>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {options.map((opt) => {
              const active = whereHeard === opt.key;

              return (
                <button
                  key={opt.key}
                  onClick={() => setWhereHeard(opt.key)}
                  disabled={isSubmitting}
                  className={`
                    flex items-center gap-3 px-5 py-4 rounded-2xl w-full
                    text-[15px] transition-all border
                    ${
                      active
                        ? "bg-[#EAD7CF] border-[#B85A44]"
                        : "bg-[#F5F6F8] border-transparent hover:bg-[#ECECEC]"
                    }
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <span className="text-black">{opt.icon}</span>
                  <span className="text-black">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* ================= MOBILE BOTTOM CTA (MATCHES ReminderStep) ================= */}
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 pb-6 pt-4">
          <button
            onClick={handleSkip}
            disabled={isSubmitting}
            className="block w-full text-center text-sm underline text-[#6F7680] mb-4 disabled:opacity-50"
          >
            Skip
          </button>

          <button
            onClick={handleSubmit}
            disabled={!canContinue || isSubmitting}
            className={`
              w-full py-4 text-[18px] font-medium text-white rounded-2xl
              ${
                canContinue && !isSubmitting
                  ? "bg-[#C46A54]"
                  : "bg-[#E5C5BE] opacity-50"
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={20} className="animate-spin" /> Finishing up...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     DESKTOP SECTION
     ========================= */
  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* TITLE */}
      <div className="text-center mb-6">
        <h1 className="text-[26px] font-bold text-[#0C1014] leading-[32px]">
          Where did you hear<br />about inbo?
        </h1>
      </div>

      {/* OPTIONS LIST */}
      <div className="flex flex-col gap-2 w-full max-w-[380px]">
        {options.map((opt) => {
          const active = whereHeard === opt.key;

          return (
            <button
              key={opt.key}
              onClick={() => setWhereHeard(opt.key)}
              disabled={isSubmitting}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-full w-full
                text-[14px] transition-all border
                ${
                  active
                    ? "bg-[#EAD7CF] border-[#B85A44] md:bg-[#444444] md:border-[#444444]"
                    : "bg-[#F5F6F8] border-transparent hover:bg-[#ECECEC]"
                }
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <span className={active ? "text-black md:text-white" : "text-black"}>
                {opt.icon}
              </span>

              <span className={active ? "text-black md:text-white" : "text-black"}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 px-3 py-2 rounded-xl bg-red-50 border border-red-200 w-full max-w-[380px]">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* CONTINUE BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={!canContinue || isSubmitting}
        className={`
          mt-6 w-full max-w-[380px] py-3.5 rounded-full text-[16px] font-medium
          ${
            canContinue && !isSubmitting
              ? "bg-[#C46A54] text-white"
              : "bg-[#F0F1F3] text-[#A0A4A8] cursor-not-allowed"
          }
        `}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={18} className="animate-spin" /> Finishing up...
          </span>
        ) : (
          "Continue"
        )}
      </button>

      {/* SKIP */}
      <button
        onClick={handleSkip}
        disabled={isSubmitting}
        className="text-[#6F7680] underline text-sm mt-2 disabled:opacity-50"
      >
        Skip
      </button>

      {/* BACK */}
      <button
        onClick={onBack}
        disabled={isSubmitting}
        className="text-[#0C1014] font-semibold underline text-sm mt-2 disabled:opacity-50"
      >
        ← Back
      </button>
    </div>
  );
}
