"use client";

import Image from "next/image";

export default function NewsletterCard({
  badgeText,
  badgeColor,
  badgeTextColor,
  author,
  title,
  description,
  date,
  time,
  tag,
  thumbnail,
}: any) {
  return (
    <div
      className="
        bg-white border border-[#E5E7EB] rounded-2xl p-4
        flex flex-col gap-4 shadow-sm mb-3
      "
    >
      {/* ---------------- TOP ROW: BADGE + AUTHOR + TIME ---------------- */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div
            className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: badgeColor }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: badgeTextColor }}
            >
              {badgeText}
            </span>
          </div>

          <span className="text-[13px] text-[#6F7680]">{author}</span>
        </div>

        {/* TIME (now aligned with badge + author) */}
        <span className="text-[13px] text-[#6F7680]">{time}</span>
      </div>

      {/* ---------------- MAIN CONTENT ROW: TEXT + IMAGE ---------------- */}
      <div className="flex justify-between items-start gap-4">
        
        {/* Left Side (Title + Description + Meta) */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h2 className="text-[18px] font-semibold text-[#0C1014] leading-snug">
            {title}
          </h2>

          {/* 2-Line Description */}
          <p className="text-[14px] text-[#6F7680] line-clamp-2">
            {description}
          </p>

          {/* DATE + TAG */}
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#6F7680]">{date}</span>
            <span className="px-3 py-1 bg-[#F3F4F6] rounded-full text-[13px]">
              {tag}
            </span>
          </div>
        </div>

        {/* Right Side Image */}
        <Image
          src={thumbnail}
          alt="thumbnail"
          width={110}
          height={70}
          className="rounded-xl object-cover shrink-0"
        />
      </div>
    </div>
  );
}
