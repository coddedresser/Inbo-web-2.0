"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { SEOHead } from "@/components/seo/SEOHead";
import Image from "next/image";
import { ArrowLeft, Bookmark, Share2, ExternalLink, MoreHorizontal, Headphones } from "lucide-react";
import TTSPlayerModal from "@/components/TTSPlayerModal";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
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
    tools: { id: string; label: string; icon: any }[];
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

function ToolButton({ children, onClick }: { children: any; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-9 w-9 rounded-full flex items-center justify-center bg-white border border-[#E5E7EB] hover:bg-gray-50"
    >
      {children}
    </button>
  );
}

export default function ReadingPage(props: PageProps) {
  const { slug } = use(props.params);
  const router = useRouter();

  const [ttsOpen, setTtsOpen] = useState(false);

  const data =
    DEMO[slug] ??
    {
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
      tools: [
        { id: "save", label: "Save", icon: <Bookmark size={18} /> },
        { id: "share", label: "Share", icon: <Share2 size={18} /> },
        { id: "open", label: "Open", icon: <ExternalLink size={18} /> },
        { id: "more", label: "More", icon: <MoreHorizontal size={18} /> },
      ],
    };

  return (
    <>
      <SEOHead title={data.title} description="Reading view" />

      <div className="min-h-screen w-full bg-white text-[#0C1014]">
        <header className="sticky top-0 z-20 bg-white border-b border-[#EEEFF2]">
          <div className="mx-auto max-w-3xl px-4 h-[64px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="h-9 w-9 rounded-full flex items-center justify-center border border-[#E5E7EB] bg-white"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="flex items-center gap-3">
                <Image
                  src={data.avatar || "/logos/help-inbo-logo.png"}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold">{data.author}</span>
                  <span className="text-[12px] text-[#6F7680]">
                    {data.published} • {data.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ToolButton onClick={() => setTtsOpen(true)}>
                <Headphones size={18} />
              </ToolButton>
              {data.tools.map((t) => (
                <ToolButton key={t.id}>{t.icon}</ToolButton>
              ))}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-[28px] font-bold leading-snug">{data.title}</h1>

          {data.hero && (
            <div className="mt-4 rounded-2xl overflow-hidden border border-[#EEEFF2]">
              <Image
                src={data.hero}
                alt="hero"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <article className="prose prose-lg max-w-none mt-6">
            {data.content.map((p, i) => (
              <p key={i} className="text-[#2A3139] text-[16px] leading-[28px]">
                {p}
              </p>
            ))}
          </article>
        </main>
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
