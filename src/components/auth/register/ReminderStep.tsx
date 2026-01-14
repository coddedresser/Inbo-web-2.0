"use client";

import {
  Sunrise,
  Train,
  Salad,
  Moon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { useState, useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ================= IMPROVED TIME PICKER ================= */

interface TimePickerProps {
  hour: string;
  setHour: (h: string) => void;
  period: string;
  setPeriod: (p: string) => void;
}

function TimePicker({ hour, setHour, period, setPeriod }: TimePickerProps) {
  const hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const periods = ["AM", "PM"];

  const currentHourIndex = hours.indexOf(hour);
  const currentPeriodIndex = periods.indexOf(period);

  const incrementHour = () => {
    const nextIndex = (currentHourIndex + 1) % hours.length;
    setHour(hours[nextIndex]);
  };

  const decrementHour = () => {
    const prevIndex = (currentHourIndex - 1 + hours.length) % hours.length;
    setHour(hours[prevIndex]);
  };

  const togglePeriod = () => {
    setPeriod(period === "AM" ? "PM" : "AM");
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Hour Picker */}
      <div className="flex flex-col items-center">
        <button
          onClick={incrementHour}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Increase hour"
        >
          <ChevronUp size={20} className="text-gray-600" />
        </button>
        
        <div className="w-14 h-12 flex items-center justify-center border-2 border-[#C46A54] rounded-xl bg-white">
          <span className="text-2xl font-bold text-[#0C1014]">{hour}</span>
        </div>
        
        <button
          onClick={decrementHour}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Decrease hour"
        >
          <ChevronDown size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Separator */}
      <div className="text-2xl font-bold text-[#0C1014]">:</div>

      {/* Minutes (fixed at 00) */}
      <div className="flex flex-col items-center">
        <div className="p-1 opacity-0">
          <ChevronUp size={20} />
        </div>
        
        <div className="w-14 h-12 flex items-center justify-center border-2 border-gray-200 rounded-xl bg-gray-50">
          <span className="text-2xl font-bold text-gray-400">00</span>
        </div>
        
        <div className="p-1 opacity-0">
          <ChevronDown size={20} />
        </div>
      </div>

      {/* AM/PM Picker */}
      <div className="flex flex-col items-center ml-1">
        <button
          onClick={togglePeriod}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Toggle AM/PM"
        >
          <ChevronUp size={20} className="text-gray-600" />
        </button>
        
        <div 
          onClick={togglePeriod}
          className="w-12 h-12 flex items-center justify-center border-2 border-[#C46A54] rounded-xl bg-[#FDF6F4] cursor-pointer hover:bg-[#FAE8E4] transition-colors"
        >
          <span className="text-lg font-bold text-[#C46A54]">{period}</span>
        </div>
        
        <button
          onClick={togglePeriod}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Toggle AM/PM"
        >
          <ChevronDown size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

/* ================= PRESET TIME BUTTONS ================= */

interface PresetTimesProps {
  hour: string;
  period: string;
  onSelect: (h: string, p: string) => void;
}

function PresetTimes({ hour, period, onSelect }: PresetTimesProps) {
  const presets = [
    { label: "6 AM", hour: "6", period: "AM" },
    { label: "8 AM", hour: "8", period: "AM" },
    { label: "12 PM", hour: "12", period: "PM" },
    { label: "6 PM", hour: "6", period: "PM" },
    { label: "9 PM", hour: "9", period: "PM" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-3">
      {presets.map((preset) => {
        const isActive = hour === preset.hour && period === preset.period;
        return (
          <button
            key={preset.label}
            onClick={() => onSelect(preset.hour, preset.period)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${isActive 
                ? "bg-[#C46A54] text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}




/* ================= MAIN ================= */

export default function ReminderStep({
  reminder,
  setReminder,
  reminderTime,
  setReminderTime,
  onContinue,
  onBack,
}: any) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showTimeSelect, setShowTimeSelect] = useState(false);

  /* ---------------- TIME STATE (SOURCE OF TRUTH) ---------------- */

  const [hour, setHour] = useState("6");
  const [period, setPeriod] = useState("AM");

  /* ---------------- SYNC reminderTime (SAFE, ONE-WAY) ---------------- */

  useEffect(() => {
    let h = Number(hour);

    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    setReminderTime(`${String(h).padStart(2, "0")}:00`);
  }, [hour, period, setReminderTime]);



  /* ---------------- OPTIONS ---------------- */

  const options = [
    { key: "after_waking_up", label: "After waking up", icon: Sunrise, color: "#F97316" },
    { key: "while_commuting", label: "While commuting", icon: Train, color: "#2563EB" },
    { key: "at_lunchtime", label: "At lunchtime", icon: Salad, color: "#16A34A" },
    { key: "before_bedtime", label: "Before bedtime", icon: Moon, color: "#C026D3" },
  ];

  const canContinue = reminder !== "" && reminder !== "none";
  const radius = isMobile ? "rounded-2xl" : "rounded-full";

  /* ---------------- HANDLERS ---------------- */

  const handleContinue = () => {
    if (!canContinue) return;
    setShowTimeSelect(true);
  };

  const handleSkip = () => {
    setReminder("none");
    onContinue();
  };

  /* ---------------- CTA ---------------- */

  const CTAButton = (
    <button
      onClick={showTimeSelect ? onContinue : handleContinue}
      disabled={!canContinue && !showTimeSelect}
      className={`
        w-full py-4 text-[18px] font-medium text-white
        ${radius}
        ${canContinue || showTimeSelect
          ? "bg-[#C46A54]"
          : "bg-[#E5C5BE] opacity-50"}
      `}
    >
      Continue
    </button>
  );

  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* ---------------- TITLE ---------------- */}
      <div className="text-center mb-4 max-w-[360px]">
        <h1 className="text-[24px] md:text-[26px] font-bold leading-[30px] text-[#0C1014]">
          Would you like to get a reading reminder?
        </h1>

        <p className="mt-1.5 text-[13px] leading-[18px] text-[#6F7680]">
          Having a specific time set apart for reading can help build a habit and
          be more consistent
        </p>
      </div>

      {/* ================= VIEW 1 ================= */}
      {!showTimeSelect && (
        <>
          <div className="w-full max-w-[380px] flex flex-col gap-2">
            {options.map(({ key, label, icon: Icon, color }) => {
              const active = reminder === key;

              return (
                <button
                  key={key}
                  onClick={() => setReminder(key)}
                  className={`
                    flex items-center gap-3 px-4 py-3
                    border transition-all text-[14px]
                    ${radius}
                    ${active
                      ? "bg-[#F6ECE7] border-[#C46A54]"
                      : "bg-[#F5F7F9] border-transparent"}
                  `}
                >
                  <span className="flex items-center justify-center w-7 h-7" style={{ color }}>
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="text-[#0C1014] font-medium">{label}</span>
                </button>
              );
            })}
          </div>

          {!isMobile && (
            <>
              <div className="mt-6 w-[280px]">{CTAButton}</div>
              <button onClick={onBack} className="mt-3 text-md font-semibold underline">← Back</button>
              <button onClick={handleSkip} className="mt-3 text-sm underline text-[#6F7680]">Skip</button>
            </>
          )}
        </>
      )}

      {/* ================= VIEW 2 ================= */}
      {showTimeSelect && (
        <>
          <div className={`w-full max-w-[380px] bg-white border border-[#E9EAEE] shadow-sm text-center p-5 mb-4 ${radius}`}>
            <h2 className="text-[18px] font-semibold mb-2">Perfect!</h2>

            <p className="text-[13px] text-[#6F7680] mb-4">
              We’ll send you a reminder one hour before your reading.
            </p>

            {/* ================= IMPROVED TIME PICKER ================= */}
            <TimePicker
              hour={hour}
              setHour={setHour}
              period={period}
              setPeriod={setPeriod}
            />

            {/* Quick preset times */}
            <PresetTimes
              hour={hour}
              period={period}
              onSelect={(h, p) => {
                setHour(h);
                setPeriod(p);
              }}
            />

            {/* Selected time display */}
            <div className="mt-4 py-2 px-4 bg-[#F6ECE7] rounded-xl inline-block">
              <span className="text-[16px] font-semibold text-[#C46A54]">
                Reminder at {hour}:00 {period}
              </span>
            </div>
          </div>

          {!isMobile && (
            <>
              <div className="w-[280px]">{CTAButton}</div>
              <button onClick={() => setShowTimeSelect(false)} className="mt-3 underline font-semibold text-sm">← Back</button>
              <button onClick={handleSkip} className="mt-2 text-sm underline text-[#6F7680]">Skip</button>
            </>
          )}
        </>
      )}

      {/* ================= MOBILE BOTTOM CTA ================= */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 pb-6 pt-4">
          <button onClick={handleSkip} className="block w-full text-center text-sm underline text-[#6F7680] mb-4">
            Skip
          </button>
          {CTAButton}
        </div>
      )}
    </div>
  );
}
