"use client";

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { X, Play, Pause, Square, Mic2, FastForward, Rewind } from 'lucide-react';
import { useTTS } from '@/hooks/useTTS';

// Bind modal to appElement for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '24px',
    padding: '0',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    maxWidth: '90vw',
    width: '400px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999,
  },
};

interface TTSPlayerModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  content: string; // Text to read
}

export default function TTSPlayerModal({ isOpen, onRequestClose, title, content }: TTSPlayerModalProps) {
  const {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    rate,
    setRate,
    voice,
    voices,
    setVoice,
    isSupported,
  } = useTTS();

  const [hasStarted, setHasStarted] = useState(false);

  // Start reading when modal opens if not already playing
  useEffect(() => {
    if (isOpen && content && !isPlaying && !isPaused && !hasStarted) {
      speak(content);
      setHasStarted(true);
    }
  }, [isOpen, content, isPlaying, isPaused, hasStarted, speak]);

  // Stop when modal closes
  useEffect(() => {
    if (!isOpen) {
      stop();
      setHasStarted(false);
    }
  }, [isOpen, stop]);

  if (!isSupported) {
    return null; // Or show error toast
  }

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak(content);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Text to Speech Player"
    >
      <div className="bg-white p-6 rounded-[24px] shadow-2xl flex flex-col gap-6 w-full relative">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#C46A54]">
            <Mic2 size={20} />
            <span className="font-semibold text-sm uppercase tracking-wide">Listening Mode</span>
          </div>
          <button onClick={onRequestClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-[#0C1014] line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Text-to-Speech</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6 items-center">
          
          {/* Main Buttons */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setRate(Math.max(0.5, rate - 0.25))}
              className="text-gray-400 hover:text-gray-600 transition"
              title="Slower"
            >
              <Rewind size={24} />
            </button>

            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-[#C46A54] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition active:scale-95"
            >
              {isPlaying ? (
                <Pause size={32} fill="currentColor" />
              ) : (
                <Play size={32} fill="currentColor" className="ml-1" />
              )}
            </button>

            <button
              onClick={() => setRate(Math.min(2.0, rate + 0.25))}
              className="text-gray-400 hover:text-gray-600 transition"
              title="Faster"
            >
              <FastForward size={24} />
            </button>
          </div>

          {/* Settings Row */}
          <div className="w-full flex justify-between items-center px-2">
            {/* Speed Display */}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <span className="text-xs font-medium text-gray-600">Speed: {rate}x</span>
            </div>

            {/* Voice Select */}
            <select
              className="bg-gray-100 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full border-none outline-none max-w-[150px] truncate"
              value={voice?.name || ''}
              onChange={(e) => {
                const selected = voices.find(v => v.name === e.target.value);
                if (selected) setVoice(selected);
              }}
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name.slice(0, 20)}{v.name.length > 20 ? '...' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </Modal>
  );
}
