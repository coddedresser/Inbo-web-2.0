"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { SEOHead } from "@/components/seo/SEOHead";
import Image from "next/image";
import {
  Bookmark,
  Share2,
  ExternalLink,
  MoreHorizontal,
  Headphones,
  Maximize,
  Minimize,
  Type,
  Pencil,
  Link as LinkIcon,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import TTSPlayerModal from "@/components/TTSPlayerModal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const DEMO: Record<
  string,
  {
    title: string;
    author: string;
    avatar?: string;
    published: string;
    readTime: string;
    hero?: string;
    content: string[];
    tools: { id: string; label: string; icon: React.ReactNode }[];
  }
> = {
  "24h-1": {
    title:
      "Exploring modern system design: patterns, constraints, and trade-offs shaping today’s platforms",
    author: "ByteByteGo Newsletter",
    avatar: "/logos/help-inbo-logo.png",
    published: "Oct 3rd",
    readTime: "2 mins",
    hero: "/logos/sample-img.png",
    content: [
      "This demo article is rendered with placeholder content. The final implementation will fetch real newsletter HTML from the backend API.",
      "The reading surface keeps a focused, full-screen experience with minimal chrome. Actions appear in the header as icon buttons placed exactly where the design expects them.",
      "Typography uses Tailwind tokens from the app, ensuring consistent sizing and spacing across devices.",
    ],
    tools: [
      { id: "save", label: "Save", icon: <Bookmark size={18} /> },
      { id: "share", label: "Share", icon: <Share2 size={18} /> },
      { id: "open", label: "Open", icon: <ExternalLink size={18} /> },
      { id: "more", label: "More", icon: <MoreHorizontal size={18} /> },
    ],
  },
};

function IconButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-9 w-9 rounded-full flex items-center justify-center
      bg-white/80 backdrop-blur-xl border border-gray-200
      hover:bg-white transition"
    >
      {children}
    </button>
  );
}

export default function ReadingPage(props: PageProps) {
  const { slug } = use(props.params);
  const router = useRouter();

  const [ttsOpen, setTtsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);

  const data =
    DEMO[slug] ?? {
      title: "Demo newsletter",
      author: "Demo Publisher",
      avatar: "/logos/help-inbo-logo.png",
      published: "Today",
      readTime: "3 mins",
      hero: "/logos/sample-img.png",
      content: [
        "Placeholder article. Connect the API to render real content.",
        "Use this route as a base to hydrate with server-provided HTML.",
      ],
      tools: [],
    };

  const containerWidth = isFullscreen ? "max-w-5xl" : "max-w-3xl";

  return (
    <>
      <SEOHead title={data.title} description="Reading view" />

      <div className="min-h-screen bg-white text-[#0C1014] relative">
        {/* LEFT BLUR PANEL (OUTSIDE) */}
        {!isReadingMode && (
          <div className="fixed left-0 top-0 h-full w-16 bg-white/40 backdrop-blur-xl z-10 pointer-events-none" />
        )}

        <div className="relative z-20">
          {/* HEADER */}
          {!isReadingMode && (
            <header className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-gray-200">
              <div
                className={`mx-auto h-[64px] px-4 flex items-center justify-between ${containerWidth}`}
              >
                {/* LEFT SLOT (ALIGNS WITH SCROLL CONTROLS) */}
                <div className="w-14 flex justify-start">
                  <IconButton onClick={() => setIsFullscreen((v) => !v)}>
                    {isFullscreen ? (
                      <Minimize size={18} />
                    ) : (
                      <Maximize size={18} />
                    )}
                  </IconButton>
                </div>

                {/* CENTER */}
                <div className="flex items-center gap-2">
                  <IconButton onClick={() => setTtsOpen(true)}>
                    <Headphones size={18} />
                  </IconButton>

                  <IconButton onClick={() => setIsReadingMode(true)}>
                    <Type size={18} />
                  </IconButton>

                  {data.tools.map((t) => (
                    <IconButton key={t.id}>{t.icon}</IconButton>
                  ))}
                </div>

                {/* RIGHT */}
                <IconButton onClick={() => router.back()}>
                  <X size={18} />
                </IconButton>
              </div>
            </header>
          )}

          {/* MAIN */}
          <main
            className={`mx-auto px-4 py-10 relative ${containerWidth}`}
          >
            {/* SCROLL CONTROLS */}
            {!isReadingMode && (
              <div className="absolute -left-14 top-2 flex flex-col gap-2">
                <IconButton
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <ArrowUp size={16} />
                </IconButton>

                <IconButton
                  onClick={() =>
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                >
                  <ArrowDown size={16} />
                </IconButton>
              </div>
            )}

            <h1 className="text-[32px] font-bold leading-tight">
              {data.title}
            </h1>

            {data.hero && !isReadingMode && (
              <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200">
                <Image
                  src={data.hero}
                  alt="hero"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            )}

            <article className="prose prose-lg max-w-none mt-8">
              {data.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>
          </main>
        </div>

        {/* READING MODE TOOLBAR */}
        {isReadingMode && (
          <div
            className="fixed left-4 top-1/2 -translate-y-1/2 z-40
            bg-white/80 backdrop-blur-xl border border-gray-200
            rounded-2xl shadow-lg flex flex-col overflow-hidden"
          >
            <button className="p-3 hover:bg-gray-100">
              <Type size={18} />
            </button>
            <button className="p-3 hover:bg-gray-100">
              <Pencil size={18} />
            </button>
            <button className="p-3 hover:bg-gray-100">
              <Bookmark size={18} />
            </button>
            <button className="p-3 hover:bg-gray-100">
              <LinkIcon size={18} />
            </button>
            <button
              onClick={() => setIsReadingMode(false)}
              className="p-3 border-t hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      <TTSPlayerModal
        isOpen={ttsOpen}
        onRequestClose={() => setTtsOpen(false)}
        title={data.title}
        content={data.content.join(" ")}
      />
    </>
  );
}
