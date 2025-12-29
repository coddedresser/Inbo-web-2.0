"use client";

export default function EmptyReadLater() {
  return (
    <div className="flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        {/* Decorative dot */}
        <div className="w-16 h-16 rounded-full bg-[#C46A54] mb-6" />

        {/* Title */}
        <h3 className="text-[22px] font-semibold text-[#0C1014] mb-3">
          No Read Later Yet
        </h3>

        {/* Description */}
        <p className="text-[18px] text-[#6F7680] leading-[26px] max-w-[320px]">
          <span className="inline-flex items-center gap-1">
            Click on the
            <span className="inline-flex items-center justify-center w-6 h-6 relative top-[1px]">
              <img
                src="/icons/read-later-icon.png"
                alt="read later"
                className="block w-5 h-5"
              />
            </span>
          </span>
          <br />
          on a newsletter to keep it close.
        </p>
      </div>
    </div>
  );
}
