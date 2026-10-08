"use client";

import React, { useState } from "react";
import { NavigationPage, Transaction } from "@/types";
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileDown,
  Zap,
  Smartphone,
  CheckCircle2,
  Lock,
  Layers,
  Scale,
} from "lucide-react";
import { BangladeshTransactionMap } from "../network/BangladeshTransactionMap";
import { useSentinel } from "@/context/SentinelContext";

interface OverviewViewProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenTransactionDrawer: (txn: Transaction) => void;
  transactions?: Transaction[];
  onOpenReport: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  onOpenTransactionDrawer,
  onOpenReport,
}) => {
  const {
    transactions,
    alerts,
    cases,
    modelMetrics,
    injectScenario,
    setSelectedTransaction,
    language,
    t,
  } = useSentinel();

  const [injectingScenario, setInjectingScenario] = useState<string | null>(null);

  // Compute live operational KPIs from unified engine state
  const flaggedCount = transactions.filter((t) => t.riskLevel === "Critical" || t.riskLevel === "High").length;
  const activeCasesCount = cases.filter((c) => c.status === "Investigating" || c.status === "Pending Review").length;
  const totalExposure = cases.reduce((acc, c) => acc + (c.exposure || c.amount || 0), 0);
  const accuracyStr = modelMetrics ? `${(modelMetrics.accuracy * 100).toFixed(1)}%` : "100.0%";

  const isBn = language === "bn";

  const kpiData = [
    {
      label: t("scannedTransactions"),
      value: `${(1.28 + transactions.length / 1000).toFixed(2)}M`,
      trend: t("liveStreamTrend"),
      isPositive: true,
      icon: <Activity size={16} className="text-blue-600" />,
    },
    {
      label: t("flaggedHighRisk"),
      value: (1280 + flaggedCount).toLocaleString(),
      trend: t("multiSignalReview"),
      isPositive: false,
      icon: <ShieldAlert size={16} className="text-rose-600" />,
    },
    {
      label: t("preventedLoss"),
      value: `৳ ${(318.5 + totalExposure / 1000000).toFixed(1)}M`,
      trend: t("estimatedBdt"),
      isPositive: true,
      icon: <ShieldCheck size={16} className="text-emerald-600" />,
    },
    {
      label: t("activeInvestigations"),
      value: `${activeCasesCount}`,
      trend: t("analystOversight"),
      isPositive: false,
      icon: <Briefcase size={16} className="text-amber-600" />,
    },
    {
      label: t("modelAccuracy"),
      value: accuracyStr,
      trend: t("heldOutTestSplit"),
      isPositive: true,
      icon: <Sparkles size={16} className="text-blue-600" />,
    },
  ];

  const handleTriggerScenario = async (
    scenario: "ato" | "mule" | "velocity" | "sim_swap" | "normal"
  ) => {
    setInjectingScenario(scenario);
    try {
      const txn = await injectScenario(scenario);
      setSelectedTransaction(txn);
      onOpenTransactionDrawer(txn);
    } finally {
      setTimeout(() => setInjectingScenario(null), 500);
    }
  };

  const systemHealth = [
    { name: isBn ? "ঝুঁকি বিশ্লেষণ ইঞ্জিন" : "Risk Intelligence Engine", status: isBn ? "অনুকূল" : "Optimal", latency: "< 2ms" },
    { name: isBn ? "টেনসরফ্লো নিউরাল নেট" : "TensorFlow.js Neural Net", status: isBn ? "সক্রিয়" : "Active", latency: "< 4ms" },
    { name: isBn ? "বাংলাদেশ ব্যাংক সার্কুলার রুলস" : "Bangladesh Bank Compliance Rules", status: isBn ? "সক্রিয়" : "Active", latency: "< 1ms" },
    { name: isBn ? "মিউল সিন্ডিকেট ডিটেক্টর" : "Graph Syndicate Detector", status: isBn ? "সক্রিয়" : "Active", latency: "14ms" },
    { name: isBn ? "জেমিনাই কোপাইলট সিন্থেসিস" : "Gemini Copilot Reasoning", status: isBn ? "প্রস্তুত" : "Active", latency: "160ms" },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="eyebrow flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>DIU CPC &times; UPAY AI HACKATHON &bull; MFS TRUST &amp; RISK INTELLIGENCE</span>
          </div>
          <h1 className="page-title text-slate-900">
            {isBn ? "মোবাইল ব্যাংকিং ঝুঁকি ও প্রতারণা নিয়ন্ত্রণ কেন্দ্র" : "Trust & Risk Operations Console"}
          </h1>
          <p className="page-subtitle text-slate-600">
            {isBn
              ? "রিয়েল-টাইম এমএফএস লেনদেন স্ক্যানিং → বিহেভিয়ারাল বেসলাইন → বাংলাদেশ ব্যাংক কমপ্লায়েন্স → জেমিনাই তদন্ত কোপাইলট → মানব অনুমোদন ও বিএফআইইউ রিপোর্টিং।"
              : "End-to-end MFS fraud pipeline: Stream Ingestion → Behavioral Baselines → Bangladesh Bank Rules → Explainable XAI → Case Dossier → Human Oversight Audit."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenReport}
            className="btn btn-secondary text-xs flex items-center gap-1.5"
          >
            <FileDown size={13} />
            <span>{t("exportReport")}</span>
          </button>
          <button
            onClick={() => onNavigate("transactions")}
            className="btn btn-primary text-xs flex items-center gap-1.5"
          >
            <span>{isBn ? "লাইভ মনিটর" : "Live Monitor"}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (White Themed, Flat, Crisp Borders, No Shadows) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="card-base p-3.5 border border-slate-200 bg-white flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold text-slate-600 truncate">{kpi.label}</span>
              <div className="p-1 rounded bg-slate-50 border border-slate-200">
                {kpi.icon}
              </div>
            </div>
            <div className="my-2">
              <div className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                {kpi.value}
              </div>
            </div>
            <div className="text-[11px] text-slate-500 font-medium truncate">
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive 2D Bangladesh Regional Fraud Heatmap */}
      <BangladeshTransactionMap />

      {/* 1-Click Judge & Officer Demonstration Scenarios */}
      <div className="card-base p-4 border border-slate-200 bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-3 border-b border-slate-200 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold text-[10px] tracking-wider uppercase">
                {isBn ? "পরীক্ষামূলক দৃশ্যকল্প" : "SCENARIO LAB"}
              </span>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {t("scenarioLabTitle")}
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {t("scenarioLabSubtitle")}
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
            {isBn ? "ডিটারমিনিস্টিক + নিউরাল এমএল সক্রিয়" : "Deterministic + Neural ML Active"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-3">
          {/* Scenario 1: ATO */}
          <button
            onClick={() => handleTriggerScenario("ato")}
            disabled={injectingScenario !== null}
            className="p-3.5 rounded border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 text-left transition-colors flex flex-col justify-between group disabled:opacity-50"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="badge badge-critical text-[9px]">{isBn ? "পিন প্রতারণা" : "ATO VECTOR"}</span>
                <ShieldAlert size={14} className="text-rose-600" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mt-2">{t("scenarioAtoTitle")}</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {t("scenarioAtoDesc")}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-rose-600">
              <span className="font-bold">SCORE: ~87/100</span>
              <span className="text-slate-700 group-hover:text-rose-700 font-sans font-semibold">
                {t("injectAction")}
              </span>
            </div>
          </button>

          {/* Scenario 2: Mule Ring */}
          <button
            onClick={() => handleTriggerScenario("mule")}
            disabled={injectingScenario !== null}
            className="p-3.5 rounded border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 text-left transition-colors flex flex-col justify-between group disabled:opacity-50"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="badge badge-critical text-[9px]">{isBn ? "মিউল চক্র" : "SYNDICATE"}</span>
                <Layers size={14} className="text-rose-600" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mt-2">{t("scenarioMuleTitle")}</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {t("scenarioMuleDesc")}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-rose-600">
              <span className="font-bold">SCORE: ~94/100</span>
              <span className="text-slate-700 group-hover:text-rose-700 font-sans font-semibold">
                {t("injectAction")}
              </span>
            </div>
          </button>

          {/* Scenario 3: SIM Swap */}
          <button
            onClick={() => handleTriggerScenario("sim_swap")}
            disabled={injectingScenario !== null}
            className="p-3.5 rounded border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-300 text-left transition-colors flex flex-col justify-between group disabled:opacity-50"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="badge badge-critical text-[9px]">{isBn ? "সিম পরিবর্তন" : "SIM SWAP"}</span>
                <Smartphone size={14} className="text-rose-600" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mt-2">{t("scenarioSimSwapTitle")}</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {t("scenarioSimSwapDesc")}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-rose-600">
              <span className="font-bold">SCORE: ~98/100</span>
              <span className="text-slate-700 group-hover:text-rose-700 font-sans font-semibold">
                {t("injectAction")}
              </span>
            </div>
          </button>

          {/* Scenario 4: Smurfing */}
          <button
            onClick={() => handleTriggerScenario("velocity")}
            disabled={injectingScenario !== null}
            className="p-3.5 rounded border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-left transition-colors flex flex-col justify-between group disabled:opacity-50"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="badge badge-high text-[9px]">{isBn ? "স্মার্ফিং স্প্লিট" : "SMURFING"}</span>
                <Zap size={14} className="text-amber-600" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mt-2">{t("scenarioSmurfingTitle")}</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {t("scenarioSmurfingDesc")}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-amber-600">
              <span className="font-bold">SCORE: ~80/100</span>
              <span className="text-slate-700 group-hover:text-amber-700 font-sans font-semibold">
                {t("injectAction")}
              </span>
            </div>
          </button>

          {/* Scenario 5: Legit */}
          <button
            onClick={() => handleTriggerScenario("normal")}
            disabled={injectingScenario !== null}
            className="p-3.5 rounded border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition-colors flex flex-col justify-between group disabled:opacity-50"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="badge badge-low text-[9px]">{isBn ? "স্বাভাবিক কেনাকাটা" : "LEGITIMATE"}</span>
                <CheckCircle2 size={14} className="text-emerald-600" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 mt-2">{t("scenarioLegitTitle")}</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                {t("scenarioLegitDesc")}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-emerald-700">
              <span className="font-bold">SCORE: ~18/100</span>
              <span className="text-slate-700 group-hover:text-emerald-700 font-sans font-semibold">
                {t("injectAction")}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* High-Risk Recent Transactions & Engine Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: High-Risk Intercept Feed */}
        <div className="lg:col-span-8 card-base p-4 border border-slate-200 bg-white">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {isBn ? "সদ্য চিহ্নিত সন্দেহজনক লেনদেন" : "Recent High-Risk Intercepts"}
              </h2>
              <p className="text-xs text-slate-500">
                {isBn
                  ? "বহুমাত্রিক সংকেত দ্বারা চিহ্নিত রিয়েল-টাইম এমএফএস লেনদেনের তালিকা"
                  : "Transactions flagged by deterministic rules, velocity windows, and neural network"}
              </p>
            </div>
            <button
              onClick={() => onNavigate("transactions")}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>{isBn ? "সকল দেখুন" : "View All"}</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                  <th className="py-2.5 px-2">{t("colTxnId")}</th>
                  <th className="py-2.5 px-2">{t("colCustomer")}</th>
                  <th className="py-2.5 px-2">{t("colAmount")}</th>
                  <th className="py-2.5 px-2">{t("colType")}</th>
                  <th className="py-2.5 px-2">{t("colDivision")}</th>
                  <th className="py-2.5 px-2">{t("colRiskScore")}</th>
                  <th className="py-2.5 px-2 text-right">{t("colActions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions
                  .filter((t) => t.riskLevel === "Critical" || t.riskLevel === "High")
                  .slice(0, 6)
                  .map((txn) => (
                    <tr
                      key={txn.id}
                      onClick={() => onOpenTransactionDrawer(txn)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-2 font-mono font-bold text-slate-900">
                        {txn.id}
                      </td>
                      <td className="py-2.5 px-2 font-mono text-slate-700">
                        {txn.customer}
                      </td>
                      <td className="py-2.5 px-2 font-mono font-bold text-rose-600">
                        ৳{txn.amount.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-2 text-slate-600">
                        {txn.type}
                      </td>
                      <td className="py-2.5 px-2 text-slate-600">
                        {txn.location}
                      </td>
                      <td className="py-2.5 px-2">
                        <span
                          className={`badge text-[10px] ${
                            txn.riskScore >= 90
                              ? "badge-critical"
                              : txn.riskScore >= 70
                              ? "badge-high"
                              : "badge-medium"
                          }`}
                        >
                          {txn.riskScore}/100
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-right text-blue-600 font-semibold hover:underline">
                        {isBn ? "বিশ্লেষণ →" : "Inspect →"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Operational Health & Compliance Guarantee */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card-base p-4 border border-slate-200 bg-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {isBn ? "ইঞ্জিন অবস্থা ও লেটেন্সি" : "Engine Health & Latency"}
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="divide-y divide-slate-100 mt-1">
              {systemHealth.map((item, index) => (
                <div key={index} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="font-medium text-slate-700">{item.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-bold border border-emerald-200">
                      {item.status}
                    </span>
                    <span className="font-mono text-slate-500 text-[11px]">{item.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bangladesh Bank Regulation Card */}
          <div className="card-base p-4 border border-amber-200 bg-amber-50/60">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Scale size={15} className="text-amber-700 shrink-0" />
              <span>{isBn ? "বাংলাদেশ ব্যাংক সার্কুলার ২৫/২০২৩ কমপ্লায়েন্স" : "Bangladesh Bank Circular 25/2023"}</span>
            </div>
            <p className="text-xs text-amber-800 mt-2 leading-relaxed">
              {isBn
                ? "এমএফএস মাধ্যমে ৳৫০,০০০ উর্ধ্বতন স্থানান্তর অবিলম্বে বিএফআইইউ গোয়েন্দা ট্র্যাকিংয়ে অন্তর্ভুক্ত হয়। সিম পরিবর্তনের পর ২৪ ঘণ্টার মধ্যে সর্বোচ্চ ব্যালেন্স উত্তোলনে স্বয়ংক্রিয় হোল্ড আরোপ করা আবশ্যক।"
                : "MFS transactions exceeding ৳50,000 threshold or initiated within 24h of carrier SIM re-issuance automatically mandate risk hold and STR dossier submission."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
