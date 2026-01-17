"use client";

import Image from "next/image";
import clsx from "clsx";
import { ButtonHTMLAttributes, useState } from "react";
import { toast } from "sonner";
import discoverService from "@/services/discover";

type SubscribeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  newsletterId?: string;
  onSubscribeSuccess?: () => void;
};

export default function SubscribeButton({
  label = "Subscribe",
  newsletterId,
  onSubscribeSuccess,
  className,
  ...props
}: SubscribeButtonProps) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!newsletterId) {
      toast.error("Newsletter ID is missing");
      return;
    }

    if (isSubscribed) {
      // Already subscribed - unsubscribe
      try {
        setIsSubscribing(true);
        await discoverService.unsubscribeFromNewsletter(newsletterId);
        setIsSubscribed(false);
        toast.success("Unsubscribed successfully");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to unsubscribe");
      } finally {
        setIsSubscribing(false);
      }
      return;
    }

    try {
      setIsSubscribing(true);
      await discoverService.subscribeToNewsletter(newsletterId);
      setIsSubscribed(true);
      toast.success("Subscribed successfully! 🎉");
      onSubscribeSuccess?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={isSubscribing}
      className={clsx(
        `
        cursor-pointer
        group
        inline-flex items-center justify-center gap-2
        rounded-full
        font-medium
        whitespace-nowrap
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed

        /* Responsive sizing */
        h-8 px-3 text-xs
        sm:h-9 sm:px-4 sm:text-sm
        md:h-10 md:px-5 md:text-base
      `,
        isSubscribed
          ? "bg-[#F2F3F5] text-[#0C1014] hover:bg-[#E5E7EB]"
          : "bg-[#0C1014] text-white hover:bg-[#F2F3F5] hover:text-[#0C1014]",
        className
      )}
    >
      <span>{isSubscribing ? "..." : isSubscribed ? "Subscribed" : label}</span>

      {!isSubscribed && (
        <span className="flex items-center relative">
          {/* Light icon */}
          <Image
            src="/icons/subscribe-icon-light.png"
            alt=""
            width={16}
            height={16}
            draggable={false}
            className="
              block group-hover:hidden
              w-3 h-3
              sm:w-4 sm:h-4
              md:w-5 md:h-5
            "
          />

          {/* Dark icon */}
          <Image
            src="/icons/subscribe-icon-dark.png"
            alt=""
            width={16}
            height={16}
            draggable={false}
            className="
              hidden group-hover:block
              w-3 h-3
              sm:w-4 sm:h-4
              md:w-5 md:h-5
            "
          />
        </span>
      )}
    </button>
  );
}
