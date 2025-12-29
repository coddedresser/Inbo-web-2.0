"use client";

import { useState, useEffect } from "react";
import NewsletterCard from "@/components/inbox/InboxCard";
import FilterButton from "@/components/FilterButton";
import EmptyFavourite from "@/components/EmptyFavorite";

/* --------------------- DUMMY DATA --------------------- */

function generateReadLater() {
  return Array.from({ length:15 }).map((_, i) => ({
    badgeText: i % 2 === 0 ? "AI" : "BfM",
    badgeColor: i % 2 === 0 ? "#E0F2FE" : "#FEF3C7",
    badgeTextColor: i % 2 === 0 ? "#0369A1" : "#B45309",
    author: i % 2 === 0 ? "ByteByteGo Newsletter" : "Built for Mars",
    title:
      `Saved Article ${i + 1}: ` +
      "A Deep Exploration Into Modern Software Systems and Design Thinking",
    description:
      "This description is intentionally long to test truncation and layout behavior.",
    date: "Oct 3rd",
    time: "2 mins",
    tag: i % 2 === 0 ? "Software" : "Design",
    thumbnail: "/logos/forbes-sample.png",
    read: Math.random() > 0.5,
    slug: `favourite-${i + 1}`,
  }));
}

/* --------------------- PAGINATION --------------------- */

const INITIAL_VISIBLE = 5;
const LOAD_MORE = 5;

/* ----------------------------------------------------- */

export default function CollectionsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    setItems(generateReadLater());
  }, []);

  const isEmpty = items.length === 0;
  const showMore = visible < items.length;

  const loadMore = () => {
    setVisible((prev) => Math.min(prev + LOAD_MORE, items.length));
  };

  return (
    <div className="hidden min-h-[90%] md:flex w-full flex-col gap-8">
      {/* HEADER */}
      <div className="w-full h-[78px] bg-white border border-[#E5E7E8] flex items-center justify-between px-5 shadow-sm">
        <h2 className="text-[26px] font-bold text-[#0C1014]">
          Favorite
        </h2>
        {/* <FilterButton onClick={() => console.log("Filter opened")} /> */}
      </div>

      {/* CONTENT */}
      <div className="w-full flex-1 flex px-6">
        {isEmpty ? (
          /* EMPTY STATE (CENTERED) */
          <div className="flex flex-1 items-center justify-center">
            <EmptyFavourite />
          </div>
        ) : (
          /* LIST */
          <div className="w-full flex flex-col mt-2">
            {items.slice(0, visible).map((item) => (
              <div key={item.slug} className="mb-3">
                <NewsletterCard {...item} onClick={() => {}} />
              </div>
            ))}

            {showMore && <CenterButton onClick={loadMore} />}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- VIEW MORE BUTTON ---------------- */

function CenterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mx-auto mt-4 px-6 py-2 border border-gray-300 rounded-full text-black font-medium hover:bg-gray-50 transition"
    >
      View more
    </button>
  );
}
