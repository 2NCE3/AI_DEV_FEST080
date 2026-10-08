"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, Activity, CheckCircle2, ArrowRight, Sparkles, Building, Globe } from "lucide-react";

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

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedAccount, setSelectedAccount] = useState<UserProfile>(PRESET_ACCOUNTS[0]);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [customEmail, setCustomEmail] = useState<string>("");
  const [lang, setLang] = useState<"en" | "bn">("en");

  const isBn = lang === "bn";

  const handleSignIn = (profile: UserProfile) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(profile);
    }, 500);
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
      badge: "MFS SSO",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 font-sans select-none">
      {/* Language Switcher Top Right */}
      <div className="fixed top-4 right-4">
        <button
          onClick={() => setLang(lang === "en" ? "bn" : "en")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
        >
          <Globe size={13} className="text-blue-600" />
          <span>{lang === "en" ? "বাংলা মোড" : "English Mode"}</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-7 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 text-white font-extrabold text-xl mx-auto">
            u
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            upay <span className="text-blue-600">Sentinel</span>
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {isBn
              ? "বাংলাদেশ মোবাইল ফাইন্যান্সিয়াল সার্ভিসেস (MFS) জালিয়াতি প্রতিরোধ ও ঝুঁকি নিয়ন্ত্রণ প্ল্যাটফর্ম"
              : "AI-Powered MFS Fraud Intelligence Platform for Modern Digital Financial Services"}
          </p>
        </div>

        {/* 1-Click Fast Authenticate Roles */}
        <div className="space-y-2.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            {isBn ? "অনুমোদিত কর্মকর্তা নির্বাচন করুন" : "Select Authorized Role"}
          </div>

          <div className="space-y-2">
            {PRESET_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                onClick={() => setSelectedAccount(acc)}
                className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                  selectedAccount.email === acc.email
                    ? "border-blue-600 bg-blue-50/60"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center font-mono">
                    {acc.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{acc.name}</div>
                    <div className="text-[11px] text-slate-500">{acc.role}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                  {acc.badge}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleSignIn(selectedAccount)}
            disabled={isAuthenticating}
            className="w-full btn btn-primary text-xs py-2.5 mt-2 flex items-center justify-center gap-2"
          >
            {isAuthenticating ? (
              <span>{isBn ? "যাচাই করা হচ্ছে..." : "Verifying Credentials..."}</span>
            ) : (
              <>
                <span>
                  {isBn
                    ? `${selectedAccount.name} হিসেবে প্রবেশ করুন`
                    : `Enter Console as ${selectedAccount.name}`}
                </span>
                <ArrowRight size={13} />
              </>
            )}
          </button>
        </div>

        {/* Custom Email Form */}
        <div className="pt-4 border-t border-slate-200">
          <form onSubmit={handleCustomSignIn} className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-600 block">
              {isBn ? "বিকল্প কর্পোরেট ইমেইল লগইন" : "Or Custom Analyst Email"}
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="analyst@upay.com.bd"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="field flex-1 text-xs"
              />
              <button type="submit" className="btn btn-secondary text-xs">
                {isBn ? "প্রবেশ" : "Sign In"}
              </button>
            </div>
          </form>
        </div>

        {/* Security / Bangladesh Bank Accreditation */}
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
          <span>
            {isBn
              ? "বাংলাদেশ ব্যাংক BFIU সার্কুলার ২৫/২০২৩ কমপ্লায়েন্ট নিরাপদ গেটওয়ে"
              : "Compliant with Bangladesh Bank BFIU Circular 25/2023"}
          </span>
        </div>
      </div>
    </div>
  );
};
