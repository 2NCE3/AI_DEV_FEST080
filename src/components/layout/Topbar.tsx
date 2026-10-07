"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Bell,
  FileDown,
  Zap,
  Menu,
  X,
  Moon,
  Sun,
  Shield,
  Activity,
  Cpu,
  LogOut,
  User,
} from "lucide-react";
import { UserProfile } from "../auth/LoginPage";

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
  onOpenHelp: () => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
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
  onOpenHelp,
  currentUser,
  onLogout,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="topbar">
      {/* Mobile hamburger */}
      <button
        className="hamburger-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <Menu size={16} />
      </button>

      {/* Global Search Input */}
      <div className="global-search" role="search">
        <Search size={14} className="text-brand-subtle shrink-0" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search transactions, wallets, devices, cases…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search"
        />
        <kbd className="hidden sm:flex items-center text-[10px] text-brand-subtle bg-brand-surface border border-brand-border px-1.5 py-0.5 rounded font-mono leading-none select-none shrink-0">
          ⌘K
        </kbd>
      </div>

      {/* Operational Indicators & Actions */}
      <div className="top-actions">
        {/* Real-time Telemetry Status Badges */}
        <div className="telemetry-badge hidden md:flex" title="Risk Engine Pipeline Latency">
          <span className="status-dot animate-pulse" />
          <span className="font-mono text-emerald-400 font-semibold">&lt; 2ms</span>
          <span className="text-brand-subtle">&bull; DC1-Dhaka</span>
        </div>

        {/* Simulate Attack — Primary Testing CTA */}
        <button
          onClick={onOpenSimulation}
          className="btn btn-primary text-xs"
          aria-label="Open attack simulation workbench"
        >
          <Zap size={13} className="shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Simulate Scenario</span>
          <span className="sm:hidden">Sim</span>
        </button>

        {/* Audit Report Export */}
        <button
          onClick={onOpenReport}
          className="btn btn-secondary text-xs hidden lg:inline-flex"
          aria-label="Export audit report"
        >
          <FileDown size={13} aria-hidden="true" />
          <span>Audit Report</span>
        </button>

        {/* Time range selector */}
        <div className="telemetry-badge hidden xl:flex cursor-pointer" aria-label="Current time range">
          <span>Live &middot; 24h</span>
          <ChevronDown size={12} className="text-brand-subtle shrink-0" aria-hidden="true" />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="icon-btn"
          title={isDarkMode ? "Switch to Light Console" : "Switch to Dark Console"}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
        </button>

        {/* Help / Platform Info */}
        <button
          onClick={onOpenHelp}
          className="icon-btn"
          title="About upay Sentinel & Shortcuts (Press ?)"
          aria-label="Help and shortcuts"
        >
          <HelpCircle size={15} />
        </button>

        {/* Alerts Bell */}
        <button
          onClick={onNavigateAlerts}
          className={`icon-btn ${unreadCount > 0 ? "has-alert" : ""}`}
          title={`${unreadCount} Unread Alerts`}
          aria-label={`${unreadCount} unread alerts`}
        >
          <Bell size={15} />
        </button>

        {/* User Identity Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded bg-brand-elevated text-upay-gold border border-brand-borderStrong font-mono font-bold text-xs flex items-center justify-center shrink-0 select-none cursor-pointer hover:border-amber-400/50 transition-colors"
            title={`${currentUser?.name || "Arman Hossen"} (${currentUser?.role || "Lead Risk Analyst"})`}
            aria-label="User account menu"
            aria-expanded={showUserMenu}
          >
            {currentUser?.avatar || "AH"}
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 top-full mt-2 w-64 bg-brand-surface border border-brand-border rounded-xl shadow-modal p-3 z-50 text-left animate-scaleUp"
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-brand-border">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-upay-gold border border-amber-500/20 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {currentUser?.avatar || "AH"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-brand-text truncate">
                    {currentUser?.name || "Arman Hossen"}
                  </div>
                  <div className="text-[10px] text-brand-muted truncate font-mono">
                    {currentUser?.email || "arman.hossen@upay.com.bd"}
                  </div>
                </div>
              </div>

              <div className="py-2 text-[10px] space-y-1">
                <div className="text-brand-subtle flex justify-between">
                  <span>Role:</span>
                  <span className="font-semibold text-brand-text truncate max-w-[140px]">
                    {currentUser?.role || "Lead Risk Analyst"}
                  </span>
                </div>
                <div className="text-brand-subtle flex justify-between">
                  <span>Authorization:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {currentUser?.badge || "SOC TIER 3"}
                  </span>
                </div>
              </div>

              {onLogout && (
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full mt-1.5 pt-2 border-t border-brand-border flex items-center justify-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 py-1.5 rounded transition-colors"
                >
                  <LogOut size={13} />
                  <span>Sign Out of Console</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
