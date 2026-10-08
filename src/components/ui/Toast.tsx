"use client";

import React, { useEffect, useState, useRef } from "react";
import { CheckCircle2, AlertTriangle, ShieldAlert, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  durationMs?: number; // default 10000ms (10s)
}

export const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  durationMs = 10000,
}) => {
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(durationMs);

  useEffect(() => {
    if (!message) {
      setIsFading(false);
      setProgress(100);
      return;
    }

    setIsFading(false);
    setProgress(100);
    remainingTimeRef.current = durationMs;
    startTimeRef.current = Date.now();

    // Trigger progress shrink
    const progressInterval = setInterval(() => {
      if (isPaused) return;
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.max(0, 100 - (elapsed / durationMs) * 100);
      setProgress(pct);
    }, 50);

    // Fade away 600ms before close
    fadeTimerRef.current = setTimeout(() => {
      setIsFading(true);
    }, Math.max(0, durationMs - 600));

    // Full close at 10s
    timerRef.current = setTimeout(() => {
      onClose();
    }, durationMs);

    return () => {
      clearInterval(progressInterval);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [message, durationMs, onClose, isPaused]);

  if (!message) return null;

  // Determine icon & tone
  const isCritical = /sanction|blocked|critical|freeze|attack|fraud/i.test(message);
  const isWarning = /warning|elevated|high|risk|investigating/i.test(message);

  const handleManualClose = () => {
    setIsFading(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        startTimeRef.current = Date.now() - ((100 - progress) / 100) * durationMs;
      }}
      className={`fixed bottom-5 right-5 z-50 flex flex-col rounded-lg bg-white border border-slate-200 shadow-none text-slate-800 select-none overflow-hidden max-w-sm transition-all duration-500 ease-out ${
        isFading
          ? "opacity-0 translate-y-3 scale-95 pointer-events-none"
          : "opacity-100 translate-y-0 scale-100 animate-slideInRight"
      }`}
      style={{
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="flex items-start gap-3 px-3.5 py-3">
        {/* Icon */}
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
            isCritical
              ? "bg-rose-50 text-rose-600 border-rose-200"
              : isWarning
              ? "bg-amber-50 text-amber-600 border-amber-200"
              : "bg-emerald-50 text-emerald-600 border-emerald-200"
          }`}
        >
          {isCritical ? (
            <ShieldAlert size={13} strokeWidth={2.2} />
          ) : isWarning ? (
            <AlertTriangle size={13} strokeWidth={2.2} />
          ) : (
            <CheckCircle2 size={13} strokeWidth={2.2} />
          )}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {isCritical ? "Security Alert" : isWarning ? "Notice" : "Console Event"}
            </span>
            <span className="text-[9px] font-mono text-slate-400">10s</span>
          </div>
          <p className="text-xs font-medium text-slate-800 leading-snug mt-0.5 break-words">
            {message}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleManualClose}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded hover:bg-slate-100 shrink-0"
          aria-label="Dismiss notification"
        >
          <X size={13} />
        </button>
      </div>

      {/* 10-Second Countdown Progress Bar */}
      <div className="w-full bg-slate-100 h-0.5 overflow-hidden">
        <div
          className={`h-full transition-all ease-linear ${
            isCritical ? "bg-rose-500" : isWarning ? "bg-amber-500" : "bg-emerald-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
