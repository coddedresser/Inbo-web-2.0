"use client";

import React, { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { Search ,ArrowLeft, Paperclip} from "lucide-react";

type Screen = "menu" | "support" | "feedback-send" | "feedback-bug";

const HIDE_SCROLLBAR_STYLE = `
  .scrollbar-hide::-webkit-scrollbar { display: none; }
`;

// =============== UI COMPONENTS ===============
interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onClose: () => void;
}

const Header = ({ title, showBack = false, onBack, onClose }: HeaderProps) => (
  <div className="flex items-center justify-between mb-3">
    <div className="w-6">
      {showBack && onBack && (
        <button onClick={onBack}>
          <ArrowLeft className="w-5 h-5 mt-2"/>
        </button>
      )}
    </div>
    <h3 className="text-[16px] font-medium">{title}</h3>
    <button onClick={onClose}>
      <img src="/icons/close-icon.png" alt="close" className="w-6 h-6" />
    </button>
  </div>
);

interface TextAreaProps {
  value: string;
  setValue: (v: string) => void;
  placeholder: string;
}

const TextArea = ({ value, setValue, placeholder }: TextAreaProps) => (
  <>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      maxLength={500}
      placeholder={placeholder}
      className="w-full h-[155px] p-4 rounded-xl bg-[#F3F4F6] border border-[#F3F4F6] text-sm text-gray-400 resize-none outline-none"
    />
    <div className="text-sm text-gray-400 mt-1">{value.length}/500</div>
  </>
);

interface SubmitBtnProps {
  onClick: () => void;
}

const SubmitBtn = ({ onClick }: SubmitBtnProps) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full bg-[#C46A54] text-white text-[16px] font-medium mt-4 ml-auto"
  >
    Submit
  </button>
);

interface PanelWrapperProps {
  children: ReactNode;
  panelRef: React.RefObject<HTMLDivElement | null>;
  screen: Screen;
}

const PanelWrapper = ({ children, panelRef, screen }: PanelWrapperProps) => (
  <>
    <div className="fixed inset-0 z-[998] pointer-events-none" />

    <div
      ref={panelRef}
      className="
        fixed bottom-28 right-16
        w-[320px] max-h-[50vh]
        p-4 rounded-2xl
        bg-white/95 backdrop-blur-[20px]
        shadow-[0_4px_24px_rgba(0,0,0,0.25)]
        border border-[#DBDFE4]
        flex flex-col overflow-hidden
        z-[999]
      "
    >
      {screen === "menu" && (
        <div
          className="
            absolute top-[-24px] left-[-28px] w-52 h-36
            bg-[radial-gradient(circle,rgba(196,106,84,0.55)_0%,rgba(255,255,255,0)_85%)]
            blur-2xl opacity-95 pointer-events-none
          "
        />
      )}

      <div
        className="
          overflow-y-auto overflow-x-hidden flex-1 pr-1 relative z-10 scrollbar-hide
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  </>
);

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-[14px] font-medium">{question}</span>
        <svg 
          width="16" 
          height="16" 
          stroke="black" 
          strokeWidth="1.5" 
          fill="none"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4 6L8 10L12 6" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="mt-2 pl-2 border-l-2 border-gray-300">
          <p className="text-[13px] text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

// =============== SCREEN COMPONENTS ===============
interface ScreenMenuProps {
  onClose: () => void;
  onGoToSupport: () => void;
  onGoToFeedbackSend: () => void;
}

const ScreenMenu = ({ onClose, onGoToSupport, onGoToFeedbackSend }: ScreenMenuProps) => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="flex items-start justify-between mb-4 relative z-10">
        <img src="/logos/help-inbo-logo.png" alt="logo" className="w-[46px] h-[46px]" />
        <button onClick={onClose}>
          <img src="/icons/close-icon.png" alt="close" className="w-6 h-6" />
        </button>
      </div>

      <h2 className="text-[18px] font-medium">Hey, Alex</h2>
      <p className="text-[18px] mb-4">How can we help?</p>

      <button
        onClick={onGoToSupport}
        className="w-full flex justify-between items-center p-4 rounded-xl border-2 border-black mb-4"
      >
        <div className="flex items-center gap-3">
          <img src="/icons/contact-support-icon.png" alt="help-center" className="w-5 h-5"/>
          <span className="text-[14px] font-medium">Contact Support Team</span>
        </div>
        <img src="/icons/open-window-icon.png" alt="external link" className="w-5 h-5" />
      </button>

      <p className="text-[12px] text-[#6F7680] mb-1">Other</p>

      <button
        onClick={() => window.open("/help-center", "_blank")}
        className="w-full flex items-center justify-between py-4 border-b border-[#D2D2D2]"
      >
        <div className="flex items-center gap-3">
          <img src="/icons/help-center-icon.png" alt="help-center" className="w-5 h-5"/>
          <span className="text-[14px]">Visit Help Center</span>
        </div>
        <img src="/icons/open-window-icon.png" alt="external link" className="w-5 h-5" />
      </button>

      <button
        onClick={onGoToFeedbackSend}
        className="w-full flex items-center justify-between py-4 border-b border-[#D2D2D2]"
      >
        <div className="flex items-center gap-3">
          <img src="/icons/feedback-bug-icon.png" alt="bug-icon" className="h-5 w-5" />
          <span className="text-[14px]">Feedback & Bug report</span>
        </div>
        <img src="/icons/open-window-icon.png" alt="external link" className="w-5 h-5" />
      </button>

      <div className="mt-4 bg-white/60 rounded-lg shadow p-3 border-4 border-[#D2D2D2]">
        <div className="flex items-center gap-2 bg-[#F2F2F2] px-3 py-2 rounded-lg">
          <Search className="h-5 w-5 text-gray-500" />
          <input placeholder="Search for help" className="flex-1 bg-transparent outline-none text-[14px]" />
        </div>

        <div className="mt-4 space-y-4 py-1 border-t border-[#D2D2D2]">
          <FAQItem  
            question="How do I subscribe to a newsletter using Inbo?"
            answer="To subscribe to a newsletter using Inbo:
            
1. Log into your Inbo dashboard 
2. Navigate to the 'Newsletters' section in the left sidebar
3. Click on 'Browse Newsletters' to see available options
4. Find the newsletter you want and click 'Subscribe'
5. Choose your subscription preferences (daily, weekly, or monthly)
6. Confirm your subscription

You'll receive a confirmation email and the newsletter will start arriving based on your selected frequency. You can manage or unsubscribe from newsletters anytime in your account settings under 'Subscriptions'."
          />
          
          
          <FAQItem 
            question="Can I use Inbo on mobile devices?"
            answer="Yes! Inbo has a fully responsive web application that works on all mobile devices. You can also download our mobile app from the App Store (iOS) or Google Play Store (Android) for the best mobile experience.

The mobile app includes all the core features of the web version with an optimized interface for smaller screens."
          />
        </div>
      </div>
    </div>
  );
};

interface ScreenSupportProps {
  supportText: string;
  setSupportText: (v: string) => void;
  onClose: () => void;
  onGoToMenu: () => void;
}

const ScreenSupport = ({ supportText, setSupportText, onClose, onGoToMenu }: ScreenSupportProps) => (
  <>
    <Header 
      title="Contact Support" 
      showBack 
      onBack={onGoToMenu}
      onClose={onClose}
    />
    <h3 className="text-[18px] font-medium mb-1">Ask a Question</h3>
    <p className="text-[14px] text-gray-400 mb-3">
      How can we help? Please share any relevant information.
    </p>
    <TextArea 
      value={supportText} 
      setValue={setSupportText} 
      placeholder="Describe your question..." 
    />
    <div className="flex items-center">
    <p className="text-sm text-gray-500 mt-2">
      You can also email us at <br /> <strong>support@inbo</strong>
    </p>
    <SubmitBtn onClick={onClose} />
    </div>
    
  </>
);

interface ScreenFeedbackSendProps {
  feedbackText: string;
  setFeedbackText: (v: string) => void;
  onClose: () => void;
  onGoToMenu: () => void;
  onGoToFeedbackBug: () => void;
}

const ScreenFeedbackSend = ({ 
  feedbackText, 
  setFeedbackText, 
  onClose, 
  onGoToMenu,
  onGoToFeedbackBug 
}: ScreenFeedbackSendProps) => (
  <>
    <Header 
      title="Feedback & Bug Report" 
      showBack 
      onBack={onGoToMenu}
      onClose={onClose}
    />
    <div className="flex gap-2 bg-[#F2F2F2] p-1 rounded-full mb-4">
      <button className="flex-1 py-2 bg-white rounded-full text-[16px] font-medium">
        Send Feedback
      </button>
      <button
        className="flex-1 py-2 rounded-full text-[16px] text-gray-400"
        onClick={onGoToFeedbackBug}
      >
        Report a Bug
      </button>
    </div>
    <h3 className="text-[18px] font-medium mb-1">Give Feedback</h3>
    <p className="text-[14px] text-gray-400 mb-3">We'd love to hear what you think.</p>
    <TextArea 
      value={feedbackText} 
      setValue={setFeedbackText} 
      placeholder="Describe your feedback..." 
    />
    <SubmitBtn onClick={onClose} />
  </>
);

interface ScreenFeedbackBugProps {
  bugText: string;
  setBugText: (v: string) => void;
  onClose: () => void;
  onGoToMenu: () => void;
  onGoToFeedbackSend: () => void;
}

const ScreenFeedbackBug = ({ 
  bugText, 
  setBugText, 
  onClose, 
  onGoToMenu,
  onGoToFeedbackSend 
}: ScreenFeedbackBugProps) => (
  <>
    <Header 
      title="Feedback & Bug Report" 
      showBack 
      onBack={onGoToMenu}
      onClose={onClose}
    />
    <div className="flex gap-2 bg-[#F2F2F2] p-1 rounded-full mb-4">
      <button
        className="flex-1 py-2 rounded-full text-[16px] text-gray-400"
        onClick={onGoToFeedbackSend}
      >
        Send Feedback
      </button>
      <button className="flex-1 py-2 bg-white rounded-full text-[16px] font-medium">
        Report a Bug
      </button>
    </div>
    <h3 className="text-[18px] font-medium mb-1">Something Not Working Right?</h3>
    <p className="text-[14px] text-gray-400 mb-3">Help us fix it. Describe what happened.</p>
    <TextArea 
      value={bugText} 
      setValue={setBugText} 
      placeholder="Describe your bug..." 
    />
    <div className="flex items-center gap-2 text-[16px] text-gray-700 mt-3">
      <Paperclip className="-rotate-45 w-5 h-5"/>  <strong>Add attachments</strong> (Optional)
    </div>
    <SubmitBtn onClick={onClose} />
  </>
);

// =============== MAIN COMPONENT ===============
export default function HelpWidget() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("menu");
  
  // Separate text states for each screen
  const [supportText, setSupportText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [bugText, setBugText] = useState("");
  
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [canCloseOutside, setCanCloseOutside] = useState(false);

  //
  // Inject scrollbar CSS once globally
  //
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = HIDE_SCROLLBAR_STYLE;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setScreen("menu");
    // Don't clear text states to preserve content
  }, []);

  const goToMenu = useCallback(() => {
    setScreen("menu");
  }, []);

  const goToSupport = useCallback(() => {
    setScreen("support");
  }, []);

  const goToFeedbackSend = useCallback(() => {
    setScreen("feedback-send");
  }, []);

  const goToFeedbackBug = useCallback(() => {
    setScreen("feedback-bug");
  }, []);

  //
  // Lock page scroll when widget is open
  //
  useEffect(() => {
    if (open) {
      // Save the current scroll position and width
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const body = document.body;
      
      // Prevent scrolling on the background page
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = `-${scrollX}px`;
      body.style.right = "0";
      
      // Restore scroll position when closing
      return () => {
        body.style.overflow = "";
        body.style.position = "";
        body.style.top = "";
        body.style.left = "";
        body.style.right = "";
        window.scrollTo(scrollX, scrollY);
      };
    }
  }, [open]);

  //
  // Delay outside click activation
  //
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setCanCloseOutside(true), 50);
    return () => clearTimeout(timer);
  }, [open]);

  //
  // Outside click to close
  //
  useEffect(() => {
    if (!open || !canCloseOutside) return;

    const handleClick = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) close();
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, canCloseOutside, close]);

  //
  // Render switcher
  //
  const renderScreen = () => {
    switch (screen) {
      case "menu":
        return (
          <ScreenMenu 
            onClose={close}
            onGoToSupport={goToSupport}
            onGoToFeedbackSend={goToFeedbackSend}
          />
        );
      case "support":
        return (
          <ScreenSupport 
            supportText={supportText}
            setSupportText={setSupportText}
            onClose={close}
            onGoToMenu={goToMenu}
          />
        );
      case "feedback-send":
        return (
          <ScreenFeedbackSend 
            feedbackText={feedbackText}
            setFeedbackText={setFeedbackText}
            onClose={close}
            onGoToMenu={goToMenu}
            onGoToFeedbackBug={goToFeedbackBug}
          />
        );
      case "feedback-bug":
        return (
          <ScreenFeedbackBug 
            bugText={bugText}
            setBugText={setBugText}
            onClose={close}
            onGoToMenu={goToMenu}
            onGoToFeedbackSend={goToFeedbackSend}
          />
        );
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-16 right-12 w-10 h-10 rounded-full bg-[#C46A54] text-white text-2xl shadow-lg z-[997] flex items-center justify-center"
      >
        <img src="/icons/help-modal-icon.png" alt="help" className="w-6 h-6" />
      </button>

      {/* Panel */}
      {open && (
        <PanelWrapper panelRef={panelRef} screen={screen}>
          {renderScreen()}
        </PanelWrapper>
      )}
    </>
  );
}