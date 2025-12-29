"use client";

import { Star } from "lucide-react";

export default function EmptyFavourite() {
  return (
    <div className="flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">

        {/* Title */}
        <h3 className="text-[22px] font-semibold text-[#0C1014] mb-3">
          No Favourites Yet
        </h3>

        {/* Description */}
        <p className="text-[18px] text-[#6F7680] leading-[26px] max-w-[340px]">
          <span className="inline-flex items-center gap-1">
            Click the
            <span className="inline-flex items-center text-orange-300 justify-center w-6 h-6 relative top-[1px]">
              <Star fill="gold"/>
            </span>
            on any newsletter to save
          </span>
          <br />
          it here for easy access.
        </p>
      </div>
    </div>
  );
}
