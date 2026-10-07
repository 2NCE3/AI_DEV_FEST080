"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, Activity, CheckCircle2, ArrowRight, Sparkles, Building, ChevronRight } from "lucide-react";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  badge: string;
}

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
  isDarkMode?: boolean;
}

const PRESET_ACCOUNTS: UserProfile[] = [
  {
    name: "Arman Hossen",
    email: "arman.hossen@upay.com.bd",
    avatar: "AH",
    role: "Lead Risk Analyst (SOC Tier 3)",
    badge: "PRIMARY ANALYST",
  },
  {
    name: "Siam Ahmed",
    email: "siam.ahmed@upay.com.bd",
    avatar: "SA",
    role: "AML & BFIU Compliance Officer",
    badge: "COMPLIANCE LEAD",
  },
  {
    name: "AI DEV FEST Judge",
    email: "judge.eval@diu-cpc.org",
    avatar: "JD",
    role: "Hackathon Evaluation Auditor",
    badge: "EXECUTIVE OBSERVER",
  },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, isDarkMode = true }) => {
  const [selectedAccount, setSelectedAccount] = useState<UserProfile>(PRESET_ACCOUNTS[0]);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [customEmail, setCustomEmail] = useState<string>("");
  const [showAccountChooser, setShowAccountChooser] = useState<boolean>(false);

  const handleSignIn = (profile: UserProfile) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(profile);
    }, 700);
  };

  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    const namePart = customEmail.split("@")[0].replace(".", " ");
    const initials = namePart
      .split(" ")
      .map((p) => p[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2) || "U";
    
    handleSignIn({
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      email: customEmail,
      avatar: initials,
      role: "Authorized Financial Investigator",
      badge: "GOOGLE SSO",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-brand-bg relative overflow-hidden font-sans select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl shadow-modal overflow-hidden animate-scaleUp">
        {/* Top Header Banner */}
        <div className="p-6 pb-4 border-b border-brand-border text-center relative bg-brand-elevated/40">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-upay-gold text-[10.5px] font-mono font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            AI DEV FEST 2026 &middot; DIU CPC &times; upay
          </div>

          <div className="flex items-center justify-center gap-2.5 mb-1.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-brand-text tracking-tight flex items-center gap-1">
                <span className="text-upay-gold">upay</span> Sentinel
              </h1>
              <p className="text-[11px] text-brand-muted font-medium">
                AI Fraud &amp; Scam Intelligence Platform
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-sm font-bold text-brand-text">
              Operations Center Authentication
            </h2>
            <p className="text-xs text-brand-muted">
              Sign in with your authorized institutional Google account to access real-time telemetry and risk models.
            </p>
          </div>

          {/* Primary Google Sign-In Button */}
          <button
            onClick={() => handleSignIn(selectedAccount)}
            disabled={isAuthenticating}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-brand-borderStrong bg-brand-elevated hover:bg-brand-surface hover:border-brand-text/30 text-brand-text font-semibold text-xs transition-all shadow-card hover:shadow-panel group disabled:opacity-60"
          >
            {isAuthenticating ? (
              <div className="flex items-center gap-2 text-upay-gold">
                <div className="w-4 h-4 border-2 border-upay-gold border-t-transparent rounded-full animate-spin" />
                <span>Authenticating with Google SSO...</span>
              </div>
            ) : (
              <>
                {/* Official Google G Logo SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue as {selectedAccount.name}</span>
                <ArrowRight size={13} className="text-brand-subtle group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>

          {/* Quick Account Switcher Selector */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-brand-muted uppercase tracking-wider text-[10px]">
                Select Google Profile:
              </span>
              <button
                type="button"
                onClick={() => setShowAccountChooser((v) => !v)}
                className="text-upay-gold hover:underline text-[11px]"
              >
                {showAccountChooser ? "Hide Accounts" : "Switch Account"}
              </button>
            </div>

            {/* Account List */}
            <div className="space-y-1.5">
              {PRESET_ACCOUNTS.map((acc) => {
                const isSelected = selectedAccount.email === acc.email;
                return (
                  <div
                    key={acc.email}
                    onClick={() => {
                      setSelectedAccount(acc);
                      setShowAccountChooser(false);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-brand-elevated border-upay-gold/60 shadow-sm"
                        : "bg-brand-surface border-brand-border hover:bg-brand-elevated/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        isSelected ? "bg-upay-gold text-slate-950" : "bg-brand-elevated text-brand-text border border-brand-border"
                      }`}>
                        {acc.avatar}
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-semibold text-brand-text leading-tight flex items-center gap-1.5">
                          {acc.name}
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-brand-surface text-brand-subtle border border-brand-border">
                            {acc.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-brand-muted">{acc.email}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 size={15} className="text-upay-gold shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manual Google Account Entry */}
          {showAccountChooser && (
            <form onSubmit={handleCustomSignIn} className="p-3 bg-brand-elevated rounded-xl border border-brand-border space-y-2 animate-fadeIn">
              <label className="text-[11px] font-semibold text-brand-muted block">
                Or sign in with any institutional Google address:
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="analyst@domain.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="flex-1 bg-brand-surface border border-brand-border rounded-lg px-2.5 py-1.5 text-xs text-brand-text outline-none focus:border-upay-gold"
                />
                <button
                  type="submit"
                  disabled={!customEmail}
                  className="btn-primary text-xs py-1.5 px-3 rounded-lg disabled:opacity-50"
                >
                  Log In
                </button>
              </div>
            </form>
          )}

          {/* Security & Regulatory Badges */}
          <div className="pt-3 border-t border-brand-border grid grid-cols-2 gap-2 text-[10px] font-mono text-brand-subtle">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
              <span>BFIU AML/CFT Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity size={12} className="text-emerald-400 shrink-0" />
              <span>&lt; 2ms Detection Loop</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-brand-elevated/80 border-t border-brand-border text-center text-[10px] text-brand-subtle">
          Protected by upay Sentinel Zero-Trust Architecture &middot; Dhaka Node 01
        </div>
      </div>
    </div>
  );
};
