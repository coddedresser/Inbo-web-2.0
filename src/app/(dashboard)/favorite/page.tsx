"use client";

import { useState, useEffect } from "react";

import NewsletterCard from "@/components/inbox/InboxCard";
import FilterButton, {
  FilterValue,
  FILTER_LABELS,
} from "@/components/FilterButton";
import EmptyFavourite from "@/components/EmptyFavorite";
import MobileFavoriteSection from "./MobileFavoriteSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* --------------------- DUMMY DATA --------------------- */

function generateReadLater() {
  return Array.from({ length: 15 }).map((_, i) => ({
    badgeText: i % 2 === 0 ? "AI" : "BfM",
    badgeColor: i % 2 === 0 ? "#E0F2FE" : "#FEF3C7",
    badgeTextColor: i % 2 === 0 ? "#0369A1" : "#B45309",
    author: i % 2 === 0 ? "ByteByteGo Newsletter" : "Built for Mars",
    title: `Saved Article ${i + 1}: A Deep Exploration Into Software Systems`,
    description: "This description is intentionally long.",
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

export default function FavouritePage() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [items, setItems] = useState<any[]>([]);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  /* -------- FILTER STATE -------- */
  const [filter, setFilter] = useState<FilterValue>("unread");

  useEffect(() => {
    setItems(generateReadLater());
  }, []);

  /* -------- FILTERED ITEMS -------- */
  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "read") return item.read;
    return !item.read;
  });

  /* -------- MOBILE -------- */
  if (isMobile) {
    return <MobileFavoriteSection />;
  }

  const isEmpty = filteredItems.length === 0;
  const showMore = visible < filteredItems.length;

  const loadMore = () => {
    setVisible((prev) =>
      Math.min(prev + LOAD_MORE, filteredItems.length)
    );
  };

  /* ---------------- DESKTOP UI ---------------- */
  return (
    <div className="hidden min-h-[90%] md:flex w-full flex-col gap-8">
      {/* HEADER */}
      <div className="w-full h-[78px] bg-white border border-[#E5E7E8] flex items-center justify-between px-5 shadow-sm">
        <h2 className="text-[26px] font-bold text-[#0C1014]">
          Favorite
        </h2>

        {/* FILTER BUTTON */}
        <FilterButton value={filter} onChange={setFilter} />
      </div>

      {/* CONTENT */}
      <div className="w-full flex-1 flex px-6">
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center">
            <EmptyFavourite />
          </div>
        ) : (
          <div className="w-full flex flex-col mt-2">
            {filteredItems.slice(0, visible).map((item) => (
              <div key={item.slug} className="mb-3">
                <NewsletterCard {...item} onClick={() => {}} />
              </div>
            ))}

            {showMore && (
              <button
                onClick={loadMore}
                className="mx-auto mt-4 px-6 py-2 border border-gray-300 rounded-full font-medium hover:bg-gray-200 transition"
              >
                View more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
