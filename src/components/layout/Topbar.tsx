"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Bell,
  FileDown,
  Sparkles,
  Zap,
  Menu,
  X,
  Moon,
  Sun,
  Shield,
} from "lucide-react";

interface TopbarProps {
  onOpenSimulation: () => void;
  onOpenReport: () => void;
  unreadCount: number;
  onNavigateAlerts: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenSimulation,
  onOpenReport,
  unreadCount,
  onNavigateAlerts,
  searchQuery,
  setSearchQuery,
  onToggleSidebar,
  isDarkMode,
  onToggleTheme,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="topbar">
      {/* Mobile hamburger */}
      <button
        className="hamburger-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <Menu size={18} />
      </button>

      {/* Global Search Input */}
      <div className="global-search" role="search">
        <Search size={15} className="text-muted" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search transactions, customers, cases…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search"
        />
        <kbd className="hidden sm:flex items-center text-[10px] text-subtle bg-surfaceAlt border border-line px-1.5 py-0.5 rounded font-mono leading-none select-none flex-shrink-0">
          ⌘K
        </kbd>
      </div>

      {/* Action Controls */}
      <div className="top-actions">
        {/* Simulate Attack — Primary Brand CTA */}
        <button
          onClick={onOpenSimulation}
          className="btn btn-primary text-xs"
          aria-label="Open attack simulation"
        >
          <Zap size={14} className="animate-pulse" aria-hidden="true" />
          <span className="hidden sm:inline">Simulate Attack</span>
          <span className="sm:hidden">Sim</span>
        </button>

        {/* Audit Report */}
        <button
          onClick={onOpenReport}
          className="btn btn-secondary text-xs hidden sm:inline-flex"
          aria-label="Export audit report"
        >
          <FileDown size={14} aria-hidden="true" />
          <span>Audit Report</span>
        </button>

        {/* Date indicator */}
        <div className="date-control" aria-label="Current time range">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" aria-hidden="true" />
          <span>Live · 24h</span>
          <ChevronDown size={13} className="text-subtle flex-shrink-0" aria-hidden="true" />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="icon-btn"
          title={isDarkMode ? "Switch to Light Console" : "Switch to Cyber Dark Mode"}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
        </button>

        {/* Help */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="icon-btn"
          title="About upay Sentinel"
          aria-label="Help and about"
          aria-expanded={showHelp}
        >
          <HelpCircle size={16} />
        </button>

        {/* Alerts Bell */}
        <button
          onClick={onNavigateAlerts}
          className={`icon-btn ${unreadCount > 0 ? "has-alert" : ""}`}
          title={`${unreadCount} Unread Alert${unreadCount !== 1 ? "s" : ""}`}
          aria-label={`${unreadCount} unread alerts`}
        >
          <Bell size={16} />
        </button>

        {/* User Avatar */}
        <div
          className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 font-bold text-xs flex items-center justify-center flex-shrink-0 select-none shadow-sm cursor-pointer"
          title="Arman Hossen — Senior Fraud Analyst"
          aria-label="User menu"
          role="button"
          tabIndex={0}
        >
          AH
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="About upay Sentinel"
          onClick={(e) => e.target === e.currentTarget && setShowHelp(false)}
        >
          <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl border border-line">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/30 font-black">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-[16px] text-ink leading-tight flex items-center gap-1.5">
                    <span className="text-amber-500">upay</span> Sentinel
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    DIU CPC &times; upay AI Hackathon 2026 &middot; Track 01
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-surfaceAlt hover:text-ink transition-colors"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="mt-4 space-y-3.5 text-[13px] text-muted leading-relaxed">
              <p>
                <b className="text-ink">upay Sentinel</b> is an enterprise-grade AI Fraud
                &amp; Scam Intelligence platform built for Mobile Financial Services (MFS) in Bangladesh.
              </p>
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/25 space-y-2.5 text-ink">
                <div className="font-bold text-amber-500 text-xs uppercase tracking-wider font-mono">
                  Hackathon Core Deliverables
                </div>
                <div className="text-xs space-y-2">
                  <div><b className="text-ink">1. What happened?</b> Real-time deterministic + TensorFlow ML telemetry scoring.</div>
                  <div><b className="text-ink">2. Why is it risky?</b> Topological mule clustering, XAI SHAP explainability, and 3D spatial intelligence.</div>
                  <div><b className="text-ink">3. What to do next?</b> Google Gemini 2.5 Copilot synthesis providing audited action steps.</div>
                </div>
              </div>
              <p className="text-xs text-subtle">
                Tip: Click <b className="text-amber-500">&ldquo;Simulate Attack&rdquo;</b> to inject
                synthetic mule network spikes and evaluate detection in real time.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowHelp(false)}
                className="btn btn-primary text-xs"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
