"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Bell,
  PlayCircle,
  FileDown,
  Sparkles,
  Zap,
} from "lucide-react";

interface TopbarProps {
  onOpenSimulation: () => void;
  onOpenReport: () => void;
  unreadCount: number;
  onNavigateAlerts: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenSimulation,
  onOpenReport,
  unreadCount,
  onNavigateAlerts,
  searchQuery,
  setSearchQuery,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="topbar select-none">
      {/* Search Input */}
      <div className="global-search">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search transactions, customers (e.g. U-1042), devices, or cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <kbd className="text-[10px] text-gray-400 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Action Controls */}
      <div className="top-actions">
        {/* Live Attack Simulator Button - Hackathon highlight */}
        <button
          onClick={onOpenSimulation}
          className="btn btn-primary text-xs flex items-center gap-1.5 shadow-sm bg-gradient-to-r from-[#0e9f67] to-[#087c50]"
        >
          <Zap size={14} className="animate-pulse" />
          <span>Simulate Attack / Fraud</span>
        </button>

        {/* Audit Report Button */}
        <button
          onClick={onOpenReport}
          className="btn btn-secondary text-xs flex items-center gap-1.5"
        >
          <FileDown size={14} />
          <span>Audit Report</span>
        </button>

        {/* Date Selector */}
        <div className="date-control">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live · Last 24 Hours</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>

        {/* Help / Hackathon Overview */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="icon-btn"
          title="About upay Sentinel & AI Hackathon"
        >
          <HelpCircle size={17} />
        </button>

        {/* Alerts Bell */}
        <button
          onClick={onNavigateAlerts}
          className={`icon-btn ${unreadCount > 0 ? "has-alert" : ""}`}
          title={`${unreadCount} Unread Alerts`}
        >
          <Bell size={17} />
        </button>

        {/* User Avatar */}
        <div
          className="w-9 h-9 rounded-full bg-[#e8f7f0] text-[#087c50] font-bold text-xs flex items-center justify-center border border-[#c6e9d8]"
          title="Logged in as Fraud Operations Analyst"
        >
          AH
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">
                    upay Sentinel Overview
                  </h3>
                  <p className="text-xs text-gray-500">
                    DIU CPC × upay AI Hackathon 2026 · Track 01: Trust & Risk
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-gray-600 leading-relaxed">
              <p>
                <b>upay Sentinel</b> is an enterprise-grade AI Fraud & Scam
                Intelligence platform built specifically for Mobile Financial
                Services (MFS).
              </p>
              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 space-y-1.5 text-emerald-950">
                <div className="font-semibold text-emerald-900">
                  Target Hackathon Answers:
                </div>
                <div>
                  <b>1. What happened?</b> Real-time transaction scoring &
                  chronological event reconstruction.
                </div>
                <div>
                  <b>2. Why is it risky?</b> Multi-factor behavioral anomaly
                  detection + money-mule graph analysis.
                </div>
                <div>
                  <b>3. What should upay do next?</b> Gemini-powered actionable
                  case synthesis with human-in-the-loop safeguards.
                </div>
              </div>
              <div className="text-[11px] text-gray-500">
                Tip: Click <b>“Simulate Attack / Fraud”</b> to inject real-time
                mule network spikes and test the AI detection live!
              </div>
            </div>

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
