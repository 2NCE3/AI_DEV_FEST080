"use client";

import React, { useState } from "react";
import { NavigationPage } from "@/types";
import { useSentinel } from "@/context/SentinelContext";
import {
  Share2,
  MapPin,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldAlert,
  Lock,
} from "lucide-react";
import { BangladeshTransactionMap } from "./BangladeshTransactionMap";
import { BangladeshMuleGraph } from "./BangladeshMuleGraph";

interface FraudNetworkViewProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenCase: (caseId: string) => void;
  onNotify: (msg: string) => void;
}

export const FraudNetworkView: React.FC<FraudNetworkViewProps> = ({
  onNavigate,
  onOpenCase,
  onNotify,
}) => {
  const { language, t } = useSentinel();
  const [viewMode, setViewMode] = useState<"trail" | "map">("trail");
  const isBn = language === "bn";

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="eyebrow flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{isBn ? "গ্রাফ টপোলজি ও মিউল সিন্ডিকেট গোয়েন্দা তথ্য" : "GRAPH TOPOLOGY & SYNDICATE DISCOVERY"}</span>
          </div>
          <h1 className="page-title text-slate-900">
            {isBn ? "এমএফএস মানি ট্রেইল ও মিউল নেটওয়ার্ক" : "MFS Money Trail & Fraud Network"}
          </h1>
          <p className="page-subtitle text-slate-600">
            {isBn
              ? "ভুক্তভোগী অ্যাকাউন্ট থেকে চোরাই টাকা স্থানান্তরের পথ: ভুক্তভোগী ওয়ালেট → মিউল অ্যাকাউন্ট → অসাধু এজেন্ট ক্যাশ-আউট → হুন্ডি বা অবৈধ চ্যানেল।"
              : "Map the flow of fraudulent MFS funds: Victim Wallets → Intermediary Mule Conduits → Rogue Agent Points → Underground Liquidation."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Switcher: 2D Money Trail vs Geo Flow */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded p-0.5 text-xs">
            <button
              onClick={() => setViewMode("trail")}
              className={`px-3 py-1.5 rounded font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "trail"
                  ? "bg-white text-blue-600 border border-slate-200 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Share2 size={13} />
              <span>{isBn ? "২ডি মানি ট্রেইল চক্র" : "2D Money Trail"}</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-3 py-1.5 rounded font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "map"
                  ? "bg-white text-blue-600 border border-slate-200 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MapPin size={13} />
              <span>{isBn ? "বাংলাদেশ ভৌগোলিক প্রবাহ" : "Bangladesh Geo Flow"}</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate("investigations")}
            className="btn btn-primary text-xs flex items-center gap-1.5"
          >
            <Briefcase size={13} />
            <span>{t("openDossier")}</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === "trail" ? (
        <BangladeshMuleGraph onOpenCase={onOpenCase} onNotify={onNotify} />
      ) : (
        <BangladeshTransactionMap />
      )}
    </div>
  );
};
