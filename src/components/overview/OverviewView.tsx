"use client";

import React from "react";
import { NavigationPage, Transaction, RiskLevel } from "@/types";
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Share2,
  CheckCircle2,
  FileDown,
  Zap,
  Globe,
} from "lucide-react";
import { SentinelGlobe3D } from "./SentinelGlobe3D";

interface OverviewViewProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenTransactionDrawer: (txn: Transaction) => void;
  transactions: Transaction[];
  onOpenReport: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  onOpenTransactionDrawer,
  transactions,
  onOpenReport,
}) => {
  const kpiData = [
    {
      label: "Transactions Monitored",
      value: "1.28M",
      trend: "+8.4% today",
      isPositive: true,
      icon: <Activity size={18} className="text-amber-500" />,
      bg: "bg-amber-500/10 border border-amber-500/20",
    },
    {
      label: "High Risk Transactions",
      value: "1,284",
      trend: "↓ 12.6%",
      isPositive: true,
      icon: <ShieldAlert size={18} className="text-rose-500" />,
      bg: "bg-rose-500/10 border border-rose-500/20",
    },
    {
      label: "Prevented Loss",
      value: "৳ 318.7M",
      trend: "Estimated BDT",
      isPositive: null,
      icon: <ShieldCheck size={18} className="text-emerald-500" />,
      bg: "bg-emerald-500/10 border border-emerald-500/20",
    },
    {
      label: "Active Investigations",
      value: "47",
      trend: "12 require attention",
      isPositive: false,
      icon: <Briefcase size={18} className="text-sky-500" />,
      bg: "bg-sky-500/10 border border-sky-500/20",
    },
    {
      label: "AI Detection Accuracy",
      value: "96.4%",
      trend: "Validation set v4.8",
      isPositive: true,
      icon: <Sparkles size={18} className="text-amber-400" />,
      bg: "bg-amber-400/10 border border-amber-400/20",
    },
  ];

  const recentAlerts = [
    {
      risk: "Critical" as RiskLevel,
      amount: "৳ 48,500",
      reason: "New device + unusual nocturnal location",
      score: 94,
      txnId: "TXN-8F42",
      time: "2 min ago",
      targetTxn: transactions.find((t) => t.id === "TXN-8F42") || transactions[0],
    },
    {
      risk: "High" as RiskLevel,
      amount: "৳ 32,000",
      reason: "Abnormal transaction velocity & USSD reset",
      score: 87,
      txnId: "TXN-92KD",
      time: "8 min ago",
      targetTxn: transactions.find((t) => t.id === "TXN-92KD") || transactions[1],
    },
    {
      risk: "High" as RiskLevel,
      amount: "৳ 76,200",
      reason: "Rapid layering & recipient network link",
      score: 89,
      txnId: "TXN-37LM",
      time: "14 min ago",
      targetTxn: transactions.find((t) => t.id === "TXN-37LM") || transactions[2],
    },
  ];

  const systemHealth = [
    { name: "Gemini 2.5 Flash API", status: "Optimal", latency: "142ms" },
    { name: "TensorFlow.js Browser Neural Engine", status: "Active", latency: "< 5ms" },
    { name: "Rule Engine (Deterministic)", status: "Active", latency: "< 1ms" },
    { name: "Graph ML Syndicate Detector", status: "Active", latency: "38ms" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="eyebrow flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            DIU CPC &times; UPAY AI HACKATHON 2026 &middot; SENTINEL CORE
          </div>
          <h1 className="page-title text-ink flex items-center gap-2">
            Fraud &amp; Scam Intelligence Console
          </h1>
          <p className="page-subtitle text-muted">
            Autonomous threat detection, explainable AI diagnostics, and topological syndicate mitigation in real time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onOpenReport} className="btn btn-secondary text-xs flex items-center gap-2">
            <FileDown size={15} />
            <span>Export Report</span>
          </button>
          <button
            onClick={() => onNavigate("transactions")}
            className="btn btn-primary text-xs flex items-center gap-2"
          >
            <span>Live Monitor</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Hero 3D WebGL Sentinel Geospatial Defense Grid */}
      <SentinelGlobe3D />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {kpiData.map((kpi, index) => (
          <div key={index} className="card-base p-4.5 hover:shadow-md transition-all border border-line">
            <div className="flex items-center justify-between text-xs text-muted font-medium">
              <span>{kpi.label}</span>
              <div className={`w-8 h-8 rounded-xl ${kpi.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                {kpi.icon}
              </div>
            </div>
            <div className="text-2xl font-black text-ink mt-2.5 tracking-tight font-mono">
              {kpi.value}
            </div>
            <div className="text-[11px] mt-1.5 flex items-center gap-1 font-medium">
              {kpi.isPositive === true && (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp size={12} /> {kpi.trend}
                </span>
              )}
              {kpi.isPositive === false && (
                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                  <TrendingDown size={12} /> {kpi.trend}
                </span>
              )}
              {kpi.isPositive === null && (
                <span className="text-subtle">{kpi.trend}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Live Risk Activity and Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Live Risk Chart */}
        <div className="col-span-full lg:col-span-8 card-base p-5 border border-line">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div>
              <h2 className="text-sm font-bold text-ink">Live Risk Activity Telemetry</h2>
              <p className="text-xs text-muted">
                Transaction telemetry and anomaly spikes processed in real time
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-muted">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Normal Volume
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Suspicious Surge
              </span>
            </div>
          </div>

          {/* SVG Sparkline Chart */}
          <div className="mt-4 relative h-48">
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-subtle font-mono">
              <span>60k</span>
              <span>40k</span>
              <span>20k</span>
              <span>0</span>
            </div>

            <div className="ml-8 h-full flex flex-col">
              <svg className="w-full flex-1 overflow-visible" viewBox="0 0 720 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="normalArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[20, 65, 115, 160].map((y) => (
                  <line key={y} x1="0" x2="720" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />
                ))}

                {/* Normal Volume Area Fill */}
                <path
                  d="M0 135 C45 125 75 90 120 100 S180 120 220 85 S290 70 340 95 S400 115 450 75 S510 45 560 65 S620 100 660 60 S700 50 720 30 L720 170 L0 170 Z"
                  fill="url(#normalArea)"
                />

                {/* Normal Volume Line */}
                <path
                  d="M0 135 C45 125 75 90 120 100 S180 120 220 85 S290 70 340 95 S400 115 450 75 S510 45 560 65 S620 100 660 60 S700 50 720 30"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Suspicious Line */}
                <path
                  d="M0 165 C60 160 90 150 140 155 S210 160 250 140 S320 155 365 145 S440 150 490 132 S570 150 630 130 S690 142 720 120"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="1.8"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                />

                {/* Critical Dots */}
                {[
                  { x: 250, y: 140, label: "TXN-8F42" },
                  { x: 490, y: 132, label: "TXN-92KD" },
                  { x: 630, y: 130, label: "TXN-37LM" },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="5.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                    <circle cx={pt.x} cy={pt.y} r="10" fill="#f43f5e" fillOpacity="0.25" className="animate-ping" />
                  </g>
                ))}
              </svg>

              {/* X Axis Time Labels */}
              <div className="flex justify-between text-[10px] text-subtle font-mono pt-2 border-t border-line">
                <span>12:00 AM</span>
                <span>04:00 AM</span>
                <span>08:00 AM</span>
                <span>12:00 PM</span>
                <span>04:00 PM</span>
                <span>08:00 PM</span>
                <span className="text-amber-500 font-bold">Now (Live)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Distribution Donut */}
        <div className="col-span-full lg:col-span-4 card-base p-5 flex flex-col justify-between border border-line">
          <div>
            <h2 className="text-sm font-bold text-ink">Risk Distribution</h2>
            <p className="text-xs text-muted">MFS portfolio categorization (24h)</p>
          </div>

          <div className="flex items-center gap-6 py-2">
            {/* Donut Chart */}
            <div className="w-32 h-32 rounded-full border-8 border-amber-500/20 relative flex items-center justify-center shrink-0">
              <div className="text-center">
                <span className="text-lg font-black text-ink leading-tight font-mono block">
                  1.28M
                </span>
                <span className="text-[10px] text-muted">Total Txns</span>
              </div>
            </div>

            {/* Breakdown Legend */}
            <div className="flex-1 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Low Risk
                </span>
                <b className="font-semibold text-ink font-mono">82.4%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Medium Risk
                </span>
                <b className="font-semibold text-ink font-mono">12.8%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  High Risk
                </span>
                <b className="font-semibold text-ink font-mono">3.7%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Critical
                </span>
                <b className="font-semibold text-ink font-mono">1.1%</b>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 font-medium">
            <span>Automated Quarantine Triggered:</span>
            <span className="font-bold font-mono">142 Wallets</span>
          </div>
        </div>
      </div>

      {/* Bottom 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        {/* Col 1: Recent Critical Alerts */}
        <div className="col-span-full md:col-span-1 xl:col-span-5 card-base p-5 border border-line">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h2 className="text-sm font-bold text-ink">Recent Critical Alerts</h2>
            <button
              onClick={() => onNavigate("alerts")}
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="divide-y divide-line">
            {recentAlerts.map((alert) => (
              <div key={alert.txnId} className="py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl border border-rose-500/30 text-rose-500 bg-rose-500/10 flex items-center justify-center font-bold font-mono text-xs shrink-0">
                  {alert.score}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`badge ${
                        alert.risk === "Critical" ? "badge-critical" : "badge-high"
                      }`}
                    >
                      {alert.risk}
                    </span>
                    <span className="text-xs font-bold text-ink font-mono">{alert.amount}</span>
                  </div>
                  <p className="text-xs text-muted truncate mt-0.5">{alert.reason}</p>
                  <p className="text-[10px] text-subtle font-mono mt-0.5">
                    {alert.txnId} &middot; {alert.time}
                  </p>
                </div>
                <button
                  onClick={() => onOpenTransactionDrawer(alert.targetTxn)}
                  className="btn btn-ghost text-xs shrink-0 px-2"
                >
                  Investigate
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: AI Insights */}
        <div className="col-span-full md:col-span-1 xl:col-span-4 card-base p-5 flex flex-col justify-between border border-line">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h2 className="text-sm font-bold text-ink">AI Intelligence Insights</h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-lg">
                <Sparkles size={11} /> SENTINEL AI
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {/* Insight 1 */}
              <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Share2 size={15} />
                  </div>
                  <div className="text-xs text-muted">
                    <p className="leading-snug">
                      AI detected an emerging <b className="text-ink">mule-wallet cluster</b> involving{" "}
                      <b className="text-ink">17 accounts</b> and <b className="text-ink">43 transactions</b> totaling ৳ 2.8M.
                    </p>
                    <button
                      onClick={() => onNavigate("network")}
                      className="mt-2 text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                    >
                      <span>View Fraud Network</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="p-3.5 rounded-xl bg-sky-500/5 border border-sky-500/20">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Activity size={15} />
                  </div>
                  <div className="text-xs text-muted">
                    <p className="leading-snug">
                      Nocturnal high-value transfers (01:00 AM – 04:00 AM) increased{" "}
                      <b className="text-ink">23%</b> above normal baseline. 8 account takeover vectors identified.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-subtle border-t border-line flex items-center justify-between">
            <span>Model: Ensemble ML + Gemini RAG</span>
            <span className="text-emerald-500 font-semibold">Active</span>
          </div>
        </div>

        {/* Col 3: System Health */}
        <div className="col-span-full md:col-span-full xl:col-span-3 card-base p-5 flex flex-col justify-between border border-line">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h2 className="text-sm font-bold text-ink">System Health</h2>
              <span className="badge badge-low flex items-center gap-1">
                <CheckCircle2 size={11} /> 100% UP
              </span>
            </div>

            <div className="divide-y divide-line mt-2">
              {systemHealth.map((item) => (
                <div key={item.name} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <span className="text-ink font-medium block truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-subtle font-mono">Latency: {item.latency}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-xs" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-line flex items-center justify-between text-[11px] text-subtle">
            <span>Last sync</span>
            <span className="font-semibold text-ink">8 seconds ago</span>
          </div>
        </div>
      </div>

      {/* Synthetic Data Disclaimer */}
      <div className="text-center text-[11px] text-subtle py-1">
        Synthetic demonstration data for DIU CPC &times; upay AI Hackathon 2026 &middot; Privacy-by-design compliant (No real customer PII)
      </div>
    </div>
  );
};
