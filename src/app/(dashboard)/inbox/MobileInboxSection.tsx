"use client";

import { useState, useRef } from "react";
import MobileHeader from "@/components/layout/MobileHeader";
import EmptyList from "@/components/inbox/EmptyList";
import InboxCardMobile from "@/components/inbox/InboxCard";
import {
  FilterValue,
  FILTER_LABELS,
} from "@/components/FilterButton";
import { ChevronDown, ListFilter } from "lucide-react";
import EmptyInbox from "@/components/inbox/EmptyInbox";
import BottomNav from "@/components/layout/BottomNav";

const INITIAL_VISIBLE = 2;
const LOAD_MORE = 5;

// Long dummy title (4–5 lines)
const longTitle =
  "Breaking insights: Exploring the latest trends and deep-dive analysis shaping today’s digital landscape, uncovering powerful ideas and strategies redefining how creators, founders, and innovators build momentum in a rapidly evolving world.";

export default function MobileInboxSection({
  tab,
  setTab,
  filtered24,
  filtered7,
  unreadCount,
}: any) {
  const [visible24, setVisible24] = useState(INITIAL_VISIBLE);
  const [visible7, setVisible7] = useState(INITIAL_VISIBLE);

  // ✅ scroll container ref
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* -------- FILTER STATE -------- */
  const [filter, setFilter] = useState<FilterValue>("unread");
  const [filterOpen, setFilterOpen] = useState(false);

  /* -------- APPLY FILTER -------- */
  const applyFilter = (items: any[]) => {
    if (filter === "all") return items;
    if (filter === "read") return items.filter(i => i.read);
    return items.filter(i => !i.read);
  };

  const filtered24Final = applyFilter(filtered24);
  const filtered7Final = applyFilter(filtered7);

  const showMore24 = visible24 < filtered24Final.length;
  const showMore7 = visible7 < filtered7Final.length;

  const is24Empty = filtered24Final.length === 0;
  const is7Empty = filtered7Final.length === 0;

  const showEmptyList = is24Empty !== is7Empty;

  /* -------- SHOW MORE (NO JUMP) -------- */
  const handleShowMore24 = () => {
    const container = scrollRef.current;
    if (!container) {
      setVisible24(v => v + LOAD_MORE);
      return;
    }

    const prevScrollHeight = container.scrollHeight;
    const prevScrollTop = container.scrollTop;

    setVisible24(v => v + LOAD_MORE);

    requestAnimationFrame(() => {
      const newScrollHeight = container.scrollHeight;
      const heightDiff = newScrollHeight - prevScrollHeight;

      container.scrollTop = prevScrollTop + heightDiff;
    });
  };

  return (
    <div className="w-full md:hidden flex flex-col bg-[#F5F6FA] min-h-screen">
      {/* MOBILE HEADER */}
      <MobileHeader title="Your Reads" onMenuClick={() => {}} />

      {/* MAIN CONTENT */}
      <div
        ref={scrollRef}
        className="flex flex-col bg-white pt-4 rounded-t-3xl flex-1 pb-20 overflow-y-auto"
      >
        {/* FILTER TRIGGER */}
        <div className="flex justify-end px-4">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#F6F7F8] border border-[#DFE2E6] rounded-full text-sm font-medium"
          >
            <ListFilter className="w-4 h-4" />
            {FILTER_LABELS[filter]}
          </button>
        </div>

        {/* BOTH EMPTY */}
        {is24Empty && is7Empty && (
          <div className="flex-1 flex items-center justify-center">
            <EmptyInbox />
          </div>
        )}

        {/* LAST 24 HOURS */}
        {!is24Empty && (
          <section>
            <h3 className="text-[15px] font-semibold text-gray-600 mb-3 px-4">
              Last 24 hours
            </h3>

            {filtered24Final
              .slice(0, visible24)
              .map((item: any, i: number) => (
                <InboxCardMobile key={i} {...item} title={longTitle} />
              ))}

            {showMore24 && (
              <button
                onClick={handleShowMore24}
                className="w-full flex items-center justify-center py-3 mt-2 text-[#D95A33] font-medium text-[15px]"
              >
                Show more <ChevronDown className="ml-1" />
              </button>
            )}
          </section>
        )}

        {/* LAST 7 DAYS */}
        {!is7Empty && (
          <section className="pb-3 mt-4">
            <h3 className="text-[15px] font-semibold text-gray-600 px-4 mb-3">
              Last 7 days
            </h3>

            {filtered7Final
              .slice(0, visible7)
              .map((item: any, i: number) => (
                <InboxCardMobile key={i} {...item} title={longTitle} />
              ))}

            {showMore7 && (
              <button
                onClick={() => setVisible7(v => v + LOAD_MORE)}
                className="w-full flex items-center justify-center py-3 mt-2 text-[#D95A33] font-medium text-[15px]"
              >
                Show more <ChevronDown className="ml-1" />
              </button>
            )}
          </section>
        )}

        {showEmptyList && (
          <div className="mt-6">
            <EmptyList />
          </div>
        )}
      </div>
      {/* 👇 FIXED MOBILE BOTTOM NAV */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <BottomNav />
      </div>

      {/* FILTER BOTTOM SHEET */}
      {filterOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFilterOpen(false)}
          />

          <div className="absolute bottom-0 w-full rounded-t-2xl bg-white p-6">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-300" />

            {(Object.keys(FILTER_LABELS) as FilterValue[]).map(key => (
              <button
                key={key}
                onClick={() => {
                  setFilter(key);
                  setFilterOpen(false);
                }}
                className="flex w-full items-center justify-between py-4 text-lg"
              >
                <span>{FILTER_LABELS[key]}</span>

                <span
                  className={`h-6 w-6 rounded-full border flex items-center justify-center ${
                    filter === key
                      ? "border-[#C95C3A]"
                      : "border-gray-300"
                  }`}
                >
                  {filter === key && (
                    <span className="h-3.5 w-3.5 rounded-full bg-[#C95C3A]" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
