"use client";

import { useState } from "react";
import Link from "next/link";
import InboxCardMobile from "@/components/inbox/InboxCard";
import {
  ArrowLeft,
  Search,
  HelpCircle,
  ArrowUpDown,
  Trash2,
  Check,
  Circle,
} from "lucide-react";

type SortType = "latest" | "oldest";

type Newsletter = {
  id: string;
  badgeText: string;
  badgeColor: string;
  badgeTextColor: string;
  author: string;
  title: string;
  description: string;
  date: string;
  time: string;
  tag: string;
  thumbnail: string;
  slug: string;
  read: boolean;
};

export default function MobileDeleteSection() {
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isSelectionMode = selectedIds.length > 0;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(newsletters.map((n) => n.id));
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  /* ---------------- MOCK DATA ---------------- */
  const newsletters: Newsletter[] = [
    {
      id: "1",
      badgeText: "H",
      badgeColor: "#111827",
      badgeTextColor: "#FFFFFF",
      author: "The Hustler",
      title: "The woman who puts America to sleep",
      description: "",
      date: "Today",
      time: "2m",
      tag: "Business",
      thumbnail: "/thumb.jpg",
      slug: "woman-america-sleep",
      read: false,
    },
    {
      id: "2",
      badgeText: "BBG",
      badgeColor: "#F97316",
      badgeTextColor: "#FFFFFF",
      author: "ByteByteGo Newsletter",
      title:
        "How Disney Hotstar (now JioHotstar) Scaled Its Infra for 60 Million Concurrent Users.",
      description: "",
      date: "Today",
      time: "2m",
      tag: "Engineering",
      thumbnail: "/thumb.jpg",
      slug: "hotstar-scaling",
      read: true,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F5F6FA]">
      {/* ================= HEADER ================= */}
      <div className="h-[56px] px-4 flex items-center justify-between bg-[#F5F6FA]">
        {isSelectionMode ? (
          <>
            <button
              onClick={selectAll}
              className="text-[#C25C3A] font-medium"
            >
              Select All
            </button>

            <span className="font-semibold">
              {selectedIds.length} selected
            </span>

            <button
              onClick={clearSelection}
              className="text-[#C25C3A] font-medium"
            >
              Done
            </button>
          </>
        ) : (
          <>
            <Link href="/profile" aria-label="Go back to profile">
                <ArrowLeft size={22} className="mr-3" />
            </Link>

            <span className="text-lg font-semibold">Trash</span>

            <div className="flex items-center gap-4">
              <Search size={20} />
              <button onClick={() => setShowInfoSheet(true)}>
                <HelpCircle size={20} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* ================= PRIMARY ROUNDED SURFACE (IMAGE-2 STYLE) ================= */}
      <div
        className="
          mt-2
          bg-white
          min-h-[92vh]
          rounded-2xl
          border border-black/10
          shadow-[0_1px_3px_rgba(0,0,0,0.08)]
          overflow-hidden
        "
      >
        {/* ================= ACTION BUTTONS ================= */}
        {isSelectionMode && (
        <div className="px-4 py-3 border-b border-[#E5E7EB] bg-white">
            <div className="flex items-center gap-3">
            {/* DELETE */}
            <button
                onClick={() => setShowDeleteModal(true)}
                className="
                h-[44px]
                px-5
                rounded-full
                border border-[#EF4444]
                bg-[#FEF2F2]
                text-[#DC2626]
                font-semibold
                text-[15px]
                flex items-center gap-2
                active:scale-[0.97]
                "
            >
                Delete Permanently
                <Trash2 size={18} />
            </button>

            {/* RESTORE */}
            <button
                className="
                h-[44px]
                px-6
                rounded-full
                bg-[#F1F2F4]
                text-[#111827]
                font-semibold
                text-[15px]
                active:scale-[0.97]
                "
            >
                Restore
            </button>
            </div>
        </div>
        )}


        {/* ================= SORT ================= */}
        {!isSelectionMode && (
          <div className="px-4 py-3">
            <button
              onClick={() => setShowSortSheet(true)}
              className="
                px-4 py-2
                rounded-full
                bg-[#EFEFEF]
                text-sm
                flex items-center gap-2
                text-[#6B7280]
              "
            >
              <ArrowUpDown size={16} />
              Sort
            </button>
          </div>
        )}

        {/* ================= LIST ================= */}
        <div>
          {newsletters.map((item) => (
            <div
              key={item.id}
              className={
                selectedIds.includes(item.id)
                  ? "bg-[#F1F7FF]"
                  : ""
              }
            >
              <InboxCardMobile
                {...item}
                showCheckbox
                checked={selectedIds.includes(item.id)}
                onCheckChange={() => toggleSelect(item.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= INFO SHEET ================= */}
      {showInfoSheet && (
        <BottomSheet onClose={() => setShowInfoSheet(false)}>
          <div className="flex items-center gap-2">
            <HelpCircle size={32}/>
            <p className="text-base text-left font-xl font-semibold">
                Newsletters are automatically deleted after 30 days.
            </p>
          </div>
          
        </BottomSheet>
      )}

      {/* ================= SORT SHEET ================= */}
      {showSortSheet && (
        <BottomSheet onClose={() => setShowSortSheet(false)}>
          <button
            onClick={() => {
              setSortBy("latest");
              setShowSortSheet(false);
            }}
            className="w-full flex justify-between items-center py-4 text-[#C25C3A] font-medium"
          >
            Recently deleted (default)
            <Check size={18} />
          </button>

          <button
            onClick={() => {
              setSortBy("oldest");
              setShowSortSheet(false);
            }}
            className="w-full flex justify-between items-center py-4"
          >
            Oldest first
            <Circle size={18} className="text-gray-300" />
          </button>
        </BottomSheet>
      )}

      {/* ================= DELETE MODAL ================= */}
        {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div
            className="
                w-[92%]
                max-w-[380px]
                rounded-[28px]
                bg-[#F7F7F8]
                px-6 pt-6 pb-5
                shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            "
            >
            {/* TITLE */}
            <h3 className="text-[18px] font-semibold text-[#0C0D0E] mb-2 text-left">
                Are you sure to delete The women…?
            </h3>

            {/* DESCRIPTION */}
            <p className="text-[15px] text-[#6B7280] leading-[22px] mb-6 text-left">
                This newsletter will be deleted immediately from your inbox account.
                You can’t undo this action.
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3">
                {/* CANCEL */}
                <button
                onClick={() => setShowDeleteModal(false)}
                className="
                    flex-1
                    h-[44px]
                    rounded-full
                    bg-[#E5E7EB]
                    text-[#111827]
                    text-[16px]
                    font-semibold
                    active:scale-[0.97]
                "
                >
                Cancel
                </button>

                {/* DELETE */}
                <button
                onClick={() => {
                    setShowDeleteModal(false);
                    clearSelection();
                }}
                className="
                    flex-1
                    h-[44px]
                    rounded-full
                    bg-[#E5E7EB]
                    text-[#EF4444]
                    text-[16px]
                    font-semibold
                    active:scale-[0.97]
                "
                >
                Delete
                </button>
            </div>
            </div>
        </div>
        )}

    </div>
  );
}

/* ---------------- BOTTOM SHEET ---------------- */
function BottomSheet({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="
          absolute bottom-0 left-0 right-0
          bg-white rounded-t-2xl
          p-6 min-h-[30vh]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        {children}
      </div>
    </div>
  );
}
