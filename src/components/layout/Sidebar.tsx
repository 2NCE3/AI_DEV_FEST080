"use client";

import React from "react";
import { NavigationPage } from "@/types";
import {
  ShieldCheck,
  LayoutGrid,
  Activity,
  ShieldAlert,
  Share2,
  Briefcase,
  Users,
  Bell,
  BarChart3,
  Settings,
  X,
  Moon,
  Sun,
  HelpCircle,
  Cpu,
} from "lucide-react";

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  unreadAlertsCount: number;
  isOpen?: boolean;
  onClose?: () => void;
  onSettingsClick?: () => void;
  onTourClick?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  unreadAlertsCount,
  isOpen = false,
  onClose,
  onSettingsClick,
  onTourClick,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const navItems: { id: NavigationPage; label: string; icon: React.ReactNode }[] = [
    { id: "overview",       label: "Overview",            icon: <LayoutGrid  size={17} /> },
    { id: "transactions",   label: "Transaction Monitor", icon: <Activity    size={17} /> },
    { id: "risk",           label: "Risk Intelligence",   icon: <ShieldAlert size={17} /> },
    { id: "network",        label: "Fraud Network",       icon: <Share2      size={17} /> },
    { id: "investigations", label: "Investigations",      icon: <Briefcase   size={17} /> },
    { id: "customers",      label: "Customers",           icon: <Users       size={17} /> },
    { id: "alerts",         label: "Alerts",              icon: <Bell        size={17} /> },
    { id: "analytics",      label: "Analytics",           icon: <BarChart3   size={17} /> },
  ];

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    onClose?.();
  };

  return (
    <>
      {/* Mobile scrim */}
      <div
        className={`sidebar-scrim ${isOpen ? "open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar select-none ${isOpen ? "open" : ""}`} aria-label="Main navigation">
        {/* Brand Header */}
        <div
          className="brand"
          onClick={() => handleNav("overview")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNav("overview")}
        >
          <div className="brand-mark">
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="brand-name">
              <span>upay</span> Sentinel
            </div>
            <div className="brand-sub">Fraud Defense Cloud</div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.(); }}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav Label */}
        <div className="nav-label">Intelligence Suite</div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5" role="navigation">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id ||
              (currentPage === "investigation" && item.id === "investigations");

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => handleNav(item.id)}
                onKeyDown={(e) => e.key === "Enter" && handleNav(item.id)}
                className={`nav-item nav-${item.id} ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="shrink-0" aria-hidden="true">{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.id === "alerts" && unreadAlertsCount > 0 && (
                  <span className="nav-count" aria-label={`${unreadAlertsCount} unread`}>
                    {unreadAlertsCount}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom pt-3">
          {/* Engine Status */}
          <div className="engine-status-box">
            <span className="pulse" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <b>Sentinel Neural AI</b>
                <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-1 py-0.2 rounded">
                  96.4%
                </span>
              </div>
              <small>DIU CPC &times; upay Node 01</small>
            </div>
          </div>

          {/* Analyst Profile */}
          <div className="analyst-profile">
            <div className="avatar" aria-hidden="true">AH</div>
            <div className="profile-info">
              <b>Arman Hossen</b>
              <small>Senior Fraud Analyst</small>
            </div>
            <div className="flex items-center gap-1">
              <button
                title={isDarkMode ? "Switch to Light Console" : "Switch to Cyber Dark Mode"}
                onClick={onToggleTheme}
                className="text-slate-400 hover:text-amber-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button
                title="Start App Tour"
                onClick={onTourClick}
                className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                aria-label="Start Tour"
              >
                <HelpCircle size={15} />
              </button>
              <button
                title="System Settings"
                onClick={onSettingsClick}
                className="btn-settings text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                aria-label="Settings"
              >
                <Settings size={15} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
