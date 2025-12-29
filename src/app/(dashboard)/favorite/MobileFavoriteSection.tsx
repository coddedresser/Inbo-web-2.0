"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpDown,
  ListFilter,
  LucideStar,
} from "lucide-react";
import EmptyFavourite from "@/components/EmptyFavorite";
import NewsletterCard from "@/components/inbox/InboxCard";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type Publication = {
  id: string;
  name: string;
  logo: string;
  unread: number;
  read: number;
};

type FilterValue = "unread" | "read" | "all";
type SortValue = "recent" | "oldest";

const FILTER_LABELS: Record<FilterValue, string> = {
  unread: "Unread",
  read: "Read",
  all: "All",
};

const SORT_LABELS: Record<SortValue, string> = {
  recent: "Recently Added",
  oldest: "Oldest First",
};

/* ---------------- DUMMY DATA ---------------- */

const publications: Publication[] = [
  {
    id: "hustlers",
    name: "The Hustlers",
    logo: "/icons/ixsn.png",
    unread: 4,
    read: 5,
  },
];

const mobileNewsletters = [
  {
    badgeText: "AI",
    badgeColor: "#E0F2FE",
    badgeTextColor: "#0369A1",
    author: "The Hustler",
    title: "The woman who puts America to sleep",
    time: "2m",
    thumbnail: "/images/sample-1.png",
    read: false,
    slug: "newsletter-1",
  },
  {
    badgeText: "Tech",
    badgeColor: "#E0F2FE",
    badgeTextColor: "#0369A1",
    author: "ByteByteGo Newsletter",
    title:
      "How Disney Hotstar (now JioHotstar) Scaled Its Infra for 60 Million Concurrent Users.",
    time: "2m",
    thumbnail: "/images/sample-2.png",
    read: true,
    slug: "newsletter-2",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function MobileFavoriteSection() {
  const router = useRouter();

  const [activePublication, setActivePublication] =
    useState<Publication | null>(null);

  const [filter, setFilter] = useState<FilterValue>("unread");
  const [sort, setSort] = useState<SortValue>("recent");

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  /* ---------- SCREEN 2 DATA ---------- */

  const filteredNewsletters = mobileNewsletters.filter((item) => {
    if (filter === "all") return true;
    if (filter === "read") return item.read;
    return !item.read;
  });

  /* ======================================================
     📱 SCREEN 2 — PUBLICATION DETAIL
  ====================================================== */

  if (activePublication) {
    return (
      <div className="md:hidden min-h-screen bg-[#F7F7F7]">
        {/* HEADER */}
        <div className="h-[64px] flex items-center px-4">
          <button onClick={() => setActivePublication(null)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center text-[20px] font-semibold">
            Favourite
          </h1>
          <div className="w-5 h-5" />
        </div>

        {/* PUBLICATION HEADER */}
        <div className="flex items-center gap-4 px-4 pb-4">
          <Image
            src={activePublication.logo}
            alt={activePublication.name}
            width={56}
            height={56}
            className="rounded-xl"
          />

          <div className="flex-1">
            <p className="text-[20px] font-semibold">
              {activePublication.name}
            </p>
            <p className="text-sm text-gray-500">
              {activePublication.unread} Unread,{" "}
              {activePublication.read} Read
            </p>
          </div>

          <span className="text-yellow-400 text-3xl">
            <LucideStar size={32} fill="currentColor" />
          </span>
        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-t-2xl min-h-[85vh]">
          {/* FILTERS */}
          <div className="flex gap-3 px-4 pt-4">
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
            >
              <ListFilter className="w-4 h-4" />
              {FILTER_LABELS[filter]}
            </button>

            <button
              onClick={() => setSortOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
          </div>

          {/* NEWSLETTERS */}
          <div className="mt-2">
            {filteredNewsletters.map((item) => (
              <NewsletterCard key={item.slug} {...item} />
            ))}
          </div>
        </div>

        {/* FILTER SHEET */}
        {filterOpen && (
          <BottomSheet onClose={() => setFilterOpen(false)}>
            {(Object.keys(FILTER_LABELS) as FilterValue[]).map(
              (key) => (
                <SheetOption
                  key={key}
                  label={FILTER_LABELS[key]}
                  active={filter === key}
                  onClick={() => {
                    setFilter(key);
                    setFilterOpen(false);
                  }}
                />
              )
            )}
          </BottomSheet>
        )}

        {/* SORT SHEET */}
        {sortOpen && (
          <BottomSheet onClose={() => setSortOpen(false)}>
            {(Object.keys(SORT_LABELS) as SortValue[]).map(
              (key) => (
                <SheetOption
                  key={key}
                  label={SORT_LABELS[key]}
                  active={sort === key}
                  onClick={() => {
                    setSort(key);
                    setSortOpen(false);
                  }}
                />
              )
            )}
          </BottomSheet>
        )}
      </div>
    );
  }

  /* ======================================================
     📱 SCREEN 1 — FAVORITE PUBLICATIONS
  ====================================================== */

  const sortedPublications =
    sort === "recent"
      ? publications
      : [...publications].reverse();

  return (
    <div className="md:hidden min-h-screen bg-[#F7F7F7]">
      {/* HEADER */}
      <div className="h-[64px] flex items-center p-4 py-2">
        <button onClick={() => router.push("/profile")}>
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="flex-1 text-center text-[20px] font-semibold">
          Favourite
        </h1>
        <div className="w-5 h-5" />
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-t-2xl min-h-[93vh] px-4 flex">
        {!sortedPublications.length ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyFavourite />
          </div>
        ) : (
          <div className="w-full pt-4">
            {/* TOP ROW */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-md text-gray-500">
                <span className="text-black">
                  {sortedPublications.length}
                </span>{" "}
                Publication
              </span>

              <button
                onClick={() => setSortOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
              >
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </button>
            </div>

            {/* LIST */}
            {sortedPublications.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePublication(item)}
                className="flex items-center gap-3 py-4 border-b w-full text-left"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-xl"
                />

                <div className="flex-1">
                  <p className="text-[18px] font-semibold">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.unread} Unread, {item.read} Read
                  </p>
                </div>

                <span className="text-yellow-400 text-2xl">
                  <LucideStar fill="currentColor" size={24} />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SORT SHEET (SCREEN 1) */}
      {sortOpen && (
        <BottomSheet onClose={() => setSortOpen(false)}>
          {(Object.keys(SORT_LABELS) as SortValue[]).map(
            (key) => (
              <SheetOption
                key={key}
                label={SORT_LABELS[key]}
                active={sort === key}
                onClick={() => {
                  setSort(key);
                  setSortOpen(false);
                }}
              />
            )
          )}
        </BottomSheet>
      )}
    </div>
  );
}

/* ---------------- SHARED UI ---------------- */

function BottomSheet({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="absolute bottom-0 w-full rounded-t-2xl bg-white p-6">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-300" />
        {children}
      </div>
    </div>
  );
}

function SheetOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between py-4 text-lg"
    >
      <span>{label}</span>
      <span
        className={`h-6 w-6 rounded-full border flex items-center justify-center ${
          active ? "border-[#C95C3A]" : "border-gray-300"
        }`}
      >
        {active && (
          <span className="h-3.5 w-3.5 rounded-full bg-[#C95C3A]" />
        )}
      </span>
    </button>
  );
}
