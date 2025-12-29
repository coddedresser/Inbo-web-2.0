"use client";

import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { PUBLISHERS, Publisher } from "./page";
import MobileInboxCard from "@/components/inbox/InboxCard";
import FilterButton, { FilterValue } from "@/components/FilterButton";
import Link from "next/link";

/* ============================================================
   MOBILE MAIN SCREEN (Pixel-Perfect)
============================================================ */
export default function MobileSubscriptionSection() {
  const [selectedPublisher, setSelectedPublisher] =
    useState<Publisher | null>(null);
  const [tab, setTab] = useState<"active" | "inactive">("active");

  const active = PUBLISHERS.filter((p) => p.active);
  const inactive = PUBLISHERS.filter((p) => !p.active);

  const publicationCount =
    tab === "active" ? active.length : inactive.length;

  if (selectedPublisher) {
    return (
      <MobilePublisherDetail
        publisher={selectedPublisher}
        onBack={() => setSelectedPublisher(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* HEADER */}
      <div className="flex items-center h-[60px] px-4 bg-[#F5F6FA] border-[#EAECF0]">
        <Link href="/profile" aria-label="Go back to profile">
          <ArrowLeft size={22} className="mr-3" />
        </Link>
        <p className="text-[18px] font-semibold flex-1 text-center mr-6">
          Subscription
        </p>
      </div>

      <div className="mt-2 bg-white rounded-2xl min-h-[92vh] shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* COUNT + SEGMENTED CONTROL */}
        <div className="flex justify-between items-center px-4 mt-5">
          <p className="text-[16px] font-medium">
            {publicationCount} Publication
          </p>

          <div className="flex rounded-full bg-white border border-[#D8DDE3] p-1">
            <button
              onClick={() => setTab("active")}
              className={`px-4 py-1 text-[14px] font-medium rounded-full ${
                tab === "active"
                  ? "bg-[#D0D4DB] text-[#0C0D0E]"
                  : "text-[#6F7680]"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setTab("inactive")}
              className={`px-4 py-1 text-[14px] font-medium rounded-full ${
                tab === "inactive"
                  ? "bg-[#D0D4DB] text-[#0C0D0E]"
                  : "text-[#6F7680]"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="mt-6 bg-white">
          {(tab === "active" ? active : inactive).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPublisher(p)}
              className="w-full flex items-center px-4 py-4 border-b border-[#EEF0F2]"
            >
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-[#F1F3F5] mr-3">
                <img
                  src={p.logo}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col items-start">
                <p className="text-[15px] font-semibold text-left">
                  {p.name}
                </p>
                <p className="text-[13px] text-[#6F7680] text-left leading-[18px]">
                  {p.totalItems} items, most recent was{" "}
                  {p.lastReceivedAgo}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PUBLISHER DETAIL — Filter Applied
============================================================ */
function MobilePublisherDetail({
  publisher,
  onBack,
}: {
  publisher: Publisher;
  onBack: () => void;
}) {
  const [state, setState] = useState(publisher);
  const [filter, setFilter] = useState<FilterValue>("all");

  const total = state.newsletters.length;
  const read = state.newsletters.filter((n) => n.read).length;
  const readPercentage = total
    ? Math.round((read / total) * 100)
    : 0;

  /* ------------------ FILTER LOGIC ------------------ */
  const filteredNewsletters = useMemo(() => {
    if (filter === "all") return state.newsletters;
    if (filter === "read")
      return state.newsletters.filter((n) => n.read);
    return state.newsletters.filter((n) => !n.read);
  }, [state.newsletters, filter]);

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* HEADER */}
      <div className="flex items-center h-[60px] px-4 bg-[#F5F6FA]">
        <ArrowLeft size={22} onClick={onBack} className="mr-3" />
        <p className="text-[18px] font-semibold flex-1 text-center mr-6">
          {state.name}
        </p>
      </div>

      {/* CONTENT */}
      <div className="mt-2 bg-white rounded-2xl min-h-[92vh] border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* TOP CARD */}
        <div className="p-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                <img
                  src={state.logo}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[17px] font-bold">{state.name}</p>
            </div>

            <p className="text-[14px] text-[#6F7680]">
              {state.description}
            </p>

            <p className="text-[14px]">
              <span className="font-medium">First mail: </span>
              <span className="text-[#6F7680]">
                {state.firstMail}
              </span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button className="text-[17px] text-gray-500 font-semibold">
              Unsubscribe
            </button>

            <div className="flex items-center gap-3">
              <span
                className={`text-[16px] font-medium ${
                  state.active
                    ? "text-[#0C1014]"
                    : "text-[#A2AAB4]"
                }`}
              >
                {state.active ? "Active" : "Inactive"}
              </span>

              <button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    active: !prev.active,
                  }))
                }
                className={`w-[46px] h-[26px] rounded-full relative transition ${
                  state.active
                    ? "bg-[#C46A54]"
                    : "bg-[#D0D4DB]"
                }`}
              >
                <span
                  className={`absolute top-[4px] w-[18px] h-[18px] bg-white rounded-full transition ${
                    state.active
                      ? "left-[22px]"
                      : "left-[4px]"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ENGAGEMENT */}
        <div className="bg-[#F3F4F6] mx-4 mb-4 rounded-2xl p-5">
          <p className="text-[18px] font-semibold mb-4">
            Your Engagement
          </p>

          <div className="flex justify-between mb-4">
            <div>
              <p className="text-[14px] text-[#A2AAB4]">
                Total newsletter received
              </p>
              <p className="text-[24px] font-bold">{total}</p>
            </div>

            <div>
              <p className="text-[14px] text-[#A2AAB4]">
                Read percentage
              </p>
              <p className="text-[24px] font-bold">
                {readPercentage}%
              </p>
            </div>
          </div>

          <div className="h-[8px] rounded-full bg-[#ECEFF3] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${readPercentage}%`,
                background:
                  "linear-gradient(90deg, #CA1C1C 0%, #01AF0C 100%)",
              }}
            />
          </div>
        </div>

        {/* RECENT ISSUES */}
        <div className="px-4 pb-6">
          <div className="flex justify-between items-center">
            <p className="text-[16px] font-semibold">
              Recent Issues
            </p>
            <FilterButton value={filter} onChange={setFilter} />
          </div>

          <div className="mt-5 space-y-4">
            {filteredNewsletters.map((n) => (
              <MobileInboxCard
                key={n.id}
                {...n}
                slug={n.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
