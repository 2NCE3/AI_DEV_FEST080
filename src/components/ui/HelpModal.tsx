"use client";

import React, { useEffect } from "react";
import { Shield, X, Command, Zap, FileDown, Moon, Sun, Search, Radio, Cpu, HelpCircle } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSimulation?: () => void;
  onOpenReport?: () => void;
  onToggleTheme?: () => void;
  isDarkMode?: boolean;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  isOpen,
  onClose,
  onOpenSimulation,
  onOpenReport,
  onToggleTheme,
  isDarkMode = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-brand-surface border border-brand-border rounded-xl shadow-modal max-w-xl w-full p-6 text-brand-text max-h-[90vh] overflow-y-auto animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-elevated text-upay-gold flex items-center justify-center shrink-0 border border-brand-borderStrong">
              <Shield size={20} />
            </div>
            <div>
              <h2 id="help-modal-title" className="font-bold text-base text-brand-text leading-tight flex items-center gap-1.5">
                <span className="text-upay-gold">upay</span> Sentinel Platform Guide
              </h2>
              <p className="text-xs text-brand-muted mt-0.5">
                DIU CPC &times; upay AI Hackathon 2026 &middot; Track 01: Trust &amp; Risk Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:bg-brand-elevated hover:text-brand-text transition-colors"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-4 space-y-4 text-xs text-brand-muted leading-relaxed">
          <p>
            <b className="text-brand-text font-semibold">upay Sentinel</b> is an enterprise-grade AI Fraud &amp; Scam Intelligence platform engineered for Bangladesh&apos;s Mobile Financial Services (MFS) ecosystem, providing end-to-end risk detection in under 2ms.
          </p>

          {/* Core Lifecycle Box */}
          <div className="p-3.5 bg-brand-elevated rounded-lg border border-brand-border space-y-2.5">
            <div className="font-bold text-upay-gold text-[10.5px] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Cpu size={13} />
              The 3 Core Hackathon Questions
            </div>
            <div className="space-y-2 text-[11.5px]">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                <div>
                  <b className="text-brand-text">What happened?</b>
                  <p className="text-brand-muted mt-0.5">Real-time deterministic rule engine + TensorFlow deep neural network scoring transactions at 1,400+ TPS.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-amber-500/15 text-amber-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                <div>
                  <b className="text-brand-text">Why is it risky?</b>
                  <p className="text-brand-muted mt-0.5">Multi-factor anomaly extraction, TreeSHAP feature attribution, SIM swap cooling violation, and 3D geospatial IP &amp; money-mule clustering.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-purple-500/15 text-purple-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                <div>
                  <b className="text-brand-text">What should the analyst do next?</b>
                  <p className="text-brand-muted mt-0.5">Gemini 2.5 Risk Copilot generates grounded analyst recommendations with human-in-the-loop action safeguards (Freeze Wallet, Step-Up OTP, SAR Filing).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Reference */}
          <div>
            <div className="font-bold text-brand-text text-[11px] uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
              <Command size={12} className="text-upay-gold" />
              Keyboard Shortcuts &amp; Hotkeys
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11.5px]">
              <div className="flex items-center justify-between p-2 rounded bg-brand-elevated border border-brand-border">
                <span className="text-brand-muted">Open / Close Help</span>
                <kbd className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text font-mono text-[10px] font-bold">?</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-brand-elevated border border-brand-border">
                <span className="text-brand-muted">Global Search</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text font-mono text-[10px] font-bold">⌘K</kbd>
                  <span className="text-brand-subtle">or</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text font-mono text-[10px] font-bold">/</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-brand-elevated border border-brand-border">
                <span className="text-brand-muted">Toggle Theme</span>
                <kbd className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text font-mono text-[10px] font-bold">T</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-brand-elevated border border-brand-border">
                <span className="text-brand-muted">Simulate Attack</span>
                <kbd className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text font-mono text-[10px] font-bold">S</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-brand-elevated border border-brand-border">
                <span className="text-brand-muted">Audit Report</span>
                <kbd className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text font-mono text-[10px] font-bold">R</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-brand-elevated border border-brand-border">
                <span className="text-brand-muted">Close Active Modal</span>
                <kbd className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-text font-mono text-[10px] font-bold">Esc</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3"
              >
                {isDarkMode ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} />}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>
            )}
            {onOpenSimulation && (
              <button
                onClick={() => { onClose(); onOpenSimulation(); }}
                className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3"
              >
                <Zap size={13} className="text-amber-400" />
                <span>Simulate Attack</span>
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="btn-primary text-xs py-1.5 px-4"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
