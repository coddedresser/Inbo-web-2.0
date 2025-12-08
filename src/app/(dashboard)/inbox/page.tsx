"use client";

import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useState,useEffect } from "react";
import EmptyInbox from "@/components/EmptyInbox";
import CountBubble from "@/components/CountBubble";
import NewsletterCard from "@/components/InboxCard";
import FilterButton from "@/components/FilterButton";
import RefreshButton from "@/components/RefreshButton";
import TabSwitcher from "@/components/TabSwitcher";

/* --------------------- DUMMY NEWSLETTER GENERATOR --------------------- */

function generate24Hours() {
  return Array.from({ length: 15 }).map((_, i) => ({
    badgeText: i % 2 === 0 ? "AI" : "BfM",
    badgeColor: i % 2 === 0 ? "#E0F2FE" : "#FEF3C7",
    badgeTextColor: i % 2 === 0 ? "#0369A1" : "#B45309",
    author: i % 2 === 0 ? "ByteByteGo Newsletter" : "Built for Mars",
    title: `24h Article Title ${i + 1}`,
    description:
      "This is a demo description for the inbox card. It helps test the view more interaction...",
    date: "Oct 3rd",
    time: "2 mins",
    tag: i % 2 === 0 ? "Software" : "Design",
    thumbnail: "/logos/forbes-sample.png",
    read: Math.random() > 0.5, // randomize read state
  }));
}

function generate7Days() {
  return Array.from({ length: 15 }).map((_, i) => ({
    badgeText: i % 2 === 0 ? "AI" : "BfM",
    badgeColor: i % 2 === 0 ? "#E0F2FE" : "#FEF3C7",
    badgeTextColor: i % 2 === 0 ? "#0369A1" : "#B45309",
    author: i % 2 === 0 ? "ByteByteGo Newsletter" : "Built for Mars",
    title: `Past Week Article ${i + 1}`,
    description:
      "This article summary is here to test the extended pagination button behavior...",
    date: "Sept 28",
    time: "3 mins",
    tag: i % 2 === 0 ? "Tech" : "UX",
    thumbnail: "/logos/sample-img.png",
    read: Math.random() > 0.5,
  }));
}

/* --------------------- PAGINATION CONSTANTS --------------------- */
const INITIAL_VISIBLE = 2;
const FIRST_EXPAND_TO = 10;
const LOAD_MORE = 5;

/* ---------------------------------------------------------------- */

export default function InboxPage() {
  const [tab, setTab] = useState<"unread" | "read" | "all">("unread");

  // Newsletter state (re-fetchable)
  const [last24Hours, setLast24Hours] = useState<any[]>([]);
  const [last7Days, setLast7Days] = useState<any[]>([]);

  useEffect(() => {
    setLast24Hours(generate24Hours());
    setLast7Days(generate7Days());
  }, []);


  const [visible24, setVisible24] = useState(INITIAL_VISIBLE);
  const [visible7, setVisible7] = useState(INITIAL_VISIBLE);

  /* ---------------- FILTERING LOGIC ---------------- */
  const filterByTab = (items: any[]) => {
    if (tab === "unread") return items.filter((x) => !x.read);
    if (tab === "read") return items.filter((x) => x.read);
    return items;
  };

  const filtered24 = filterByTab(last24Hours);
  const filtered7 = filterByTab(last7Days);

  const unreadCount = [...last24Hours, ...last7Days].filter((i) => !i.read).length;

  /* ---------------- REFRESH FEATURE ---------------- */
  const refreshInbox = () => {
    // Simulate re-fetch (API can replace this later)
    setLast24Hours(generate24Hours());
    setLast7Days(generate7Days());

    // Reset pagination on refresh
    setVisible24(INITIAL_VISIBLE);
    setVisible7(INITIAL_VISIBLE);
  };

  /* ---- Pagination Logic ---- */
  const loadMore24 = () => {
    setVisible24((prev) => {
      if (prev === INITIAL_VISIBLE) {
        return Math.min(FIRST_EXPAND_TO, filtered24.length);
      }
      return Math.min(prev + LOAD_MORE, filtered24.length);
    });
  };

  const loadMore7 = () => {
    setVisible7((prev) => {
      if (prev === INITIAL_VISIBLE) {
        return Math.min(FIRST_EXPAND_TO, filtered7.length);
      }
      return Math.min(prev + LOAD_MORE, filtered7.length);
    });
  };

  const showMore24 = visible24 < filtered24.length;
  const showMore7 = visible7 < filtered7.length;

  return (
    <div className="w-full flex flex-col gap-8">

      {/* HEADER */}
      <div className="w-full">
        <div
          className="
            w-full h-[78px] bg-white
            border border-[#E5E7E8]
            flex items-center justify-between
            px-5 shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <h2 className="text-[26px] font-bold text-[#0C1014]">Your Reads</h2>

            {/* REFRESH BUTTON */}
            <RefreshButton onClick={refreshInbox} />
          </div>

          <div className="flex items-center gap-3 px-4 shrink-0">
            <FilterButton onClick={() => console.log("Filter opened")} />

            <TabSwitcher
              tab={tab}
              setTab={setTab}
              unreadCount={unreadCount}
            />

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full flex flex-col gap-10 mt-6 px-6">

        {/* LAST 24 HOURS */}
        {filtered24.length > 0 && (
          <section>
            <h3 className="text-[18px] font-semibold text-[#6F7680] mb-4">
              Last 24 hours
            </h3>

            {filtered24.slice(0, visible24).map((item, i) => (
              <NewsletterCard key={i} {...item} />
            ))}

            {showMore24 && <CenterButton onClick={loadMore24} />}
          </section>
        )}

        {/* LAST 7 DAYS */}
        {filtered7.length > 0 && (
          <section>
            <h3 className="text-[18px] font-semibold text-[#6F7680] mb-4">
              Last 7 days
            </h3>

            {filtered7.slice(0, visible7).map((item, i) => (
              <NewsletterCard key={i} {...item} />
            ))}

            {showMore7 && <CenterButton onClick={loadMore7} />}
          </section>
        )}

        {/* Show empty state if no items */}
        {<EmptyInbox />}
      </div>
    </div>
  );
}

/* ---------------- "View more" BUTTON ---------------- */
function CenterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        mx-auto mt-4 block
        px-6 py-2
        border border-gray-300
        rounded-full
        text-black font-medium
        hover:bg-white
        transition
      "
    >
      View more
    </button>
  );
}


