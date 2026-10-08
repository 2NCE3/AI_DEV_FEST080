"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 animate-slideInRight select-none">
      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center shrink-0">
        <Check size={12} strokeWidth={2.5} />
      </span>
      <span className="text-xs font-medium text-slate-800">{message}</span>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-700 ml-2 transition-colors p-0.5"
        aria-label="Dismiss notification"
      >
        <X size={13} />
      </button>
    </div>
  );
};
