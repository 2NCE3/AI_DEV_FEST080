"use client";

import React from "react";
import { NavigationPage } from "@/types";
import {
  ShieldAlert,
  LayoutGrid,
  Activity,
  ShieldCheck,
  Share2,
  Briefcase,
  Users,
  Bell,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  unreadAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  unreadAlertsCount,
}) => {
  const navItems: { id: NavigationPage; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <LayoutGrid size={18} /> },
    { id: "transactions", label: "Transaction Monitor", icon: <Activity size={18} /> },
    { id: "risk", label: "Risk Intelligence", icon: <ShieldAlert size={18} /> },
    { id: "network", label: "Fraud Network", icon: <Share2 size={18} /> },
    { id: "investigations", label: "Investigations", icon: <Briefcase size={18} /> },
    { id: "customers", label: "Customers", icon: <Users size={18} /> },
    { id: "alerts", label: "Alerts", icon: <Bell size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  ];

  return (
    <aside className="sidebar select-none">
      {/* Brand Header */}
      <div className="brand cursor-pointer" onClick={() => onNavigate("overview")}>
        <div className="brand-mark">
          <ShieldCheck size={24} />
        </div>
        <div>
          <div className="brand-name">
            <span>upay</span> Sentinel
          </div>
          <div className="brand-sub">AI FRAUD & SCAM INTELLIGENCE</div>
        </div>
      </div>

      {/* Nav Label */}
      <div className="nav-label">INTELLIGENCE SUITE</div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            currentPage === item.id ||
            (currentPage === "investigation" && item.id === "investigations");

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onNavigate(item.id)}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.id === "alerts" && unreadAlertsCount > 0 && (
                <span className="nav-count">{unreadAlertsCount}</span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Sidebar */}
      <div className="sidebar-bottom pt-4">
        {/* System Status Indicator */}
        <div className="engine-status-box">
          <span className="pulse" />
          <div>
            <b>AI Risk Engine Online</b>
            <small>XGBoost + Gemini Active</small>
          </div>
        </div>

        {/* Analyst Profile */}
        <div className="analyst-profile">
          <div className="avatar">AH</div>
          <div className="profile-info">
            <b>Arman Hossen</b>
            <small>Senior Fraud Analyst</small>
          </div>
          <button
            title="Settings"
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
