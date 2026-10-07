"use client";

import React, { useState } from "react";
import { InvestigationCase, NavigationPage, Transaction } from "@/types";
import { evidenceTimelineINV1042 } from "@/lib/data";
import { SentinelAssistant } from "./SentinelAssistant";
import { useSentinel } from "@/context/SentinelContext";
import {
  ChevronRight,
  ShieldAlert,
  Users,
  Activity,
  Share2,
  DollarSign,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  History,
  Lock,
  PauseCircle,
} from "lucide-react";

interface InvestigationDetailViewProps {
  caseData?: InvestigationCase;
  onNavigate: (page: NavigationPage) => void;
  onNotify: (msg: string) => void;
}

export const InvestigationDetailView: React.FC<InvestigationDetailViewProps> = ({
  caseData,
  onNavigate,
  onNotify,
}) => {
  const { executeAnalystAction, auditEvents } = useSentinel();
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "audit">("overview");

  const activeCase = caseData || {
    id: "INV-1042",
    riskLevel: "Critical",
    customer: "U-1042",
    amount: 48500,
    reason: "Mule network & Account Takeover",
    analyst: "Arman Hossen",
    status: "Investigating",
    updated: "2 min ago",
    createdTime: "Today at 02:18 AM",
    exposure: 184000,
    transactionsCount: 27,
    networkConnections: 12,
    riskScore: 94,
    summary:
      "Customer U-1042 performed an unusually large transfer of ৳48,500 from a newly registered device DEV-8821 at 02:13 AM. The recipient U-8831 is connected to previously flagged transaction cluster #17.",
    recommendation:
      "Freeze pending outgoing transfers to U-8831, initiate immediate biometric/OTP step-up verification on U-1042 primary device.",
    confidence: 96,
  };

  const caseId = activeCase.id;
  const customer = activeCase.customer;
  const riskScore = activeCase.riskScore;
  const exposure = activeCase.exposure || activeCase.amount * 1.5;

  // Filter audit events relevant to this case
  const caseAuditEvents = auditEvents.filter(
    (e) => e.relatedId === caseId || e.relatedId?.includes(customer) || e.details.includes(customer)
  );

  const handleAction = (
    action: "HOLD" | "STEP_UP" | "RELEASE" | "ESCALATE" | "MARK_SAFE",
    label: string
  ) => {
    executeAnalystAction(caseId, action);
    onNotify(`Action executed: ${label}. Immutable audit event logged.`);
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="case-breadcrumb">
        <span onClick={() => onNavigate("investigations")} className="cursor-pointer hover:underline">
          Investigations
        </span>
        <ChevronRight size={13} />
        <b>{caseId}</b>
      </div>

      {/* Case Header */}
      <div className="page-header">
        <div>
          <div className="eyebrow">CASE DOSSIER &bull; AUDIT VERIFIED</div>
          <h1 className="page-title">Investigation {caseId}</h1>
          <p className="page-subtitle">
            Created {activeCase.createdTime} &middot; Last updated {activeCase.updated} by {activeCase.analyst}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className={`badge text-xs px-2.5 py-1 ${
              activeCase.riskLevel === "Critical"
                ? "badge-critical"
                : activeCase.riskLevel === "High"
                ? "badge-high"
                : "badge-medium"
            }`}
          >
            {activeCase.riskLevel.toUpperCase()}
          </span>
          <span className="case-status text-xs">
            <i className={activeCase.status === "Resolved" ? "bg-emerald-500" : "bg-amber-500"} />
            <span>Status: {activeCase.status}</span>
          </span>
        </div>
      </div>

      {/* Top 5-Item KPI Exposure Grid */}
      <div className="card-base case-summary">
        <div>
          <div className="summary-icon">
            <Users size={18} />
          </div>
          <span>Customer Wallet</span>
          <b
            onClick={() => onNavigate("customers")}
            className="text-emerald-800 hover:underline cursor-pointer"
          >
            {customer}
          </b>
        </div>

        <div>
          <div className="summary-icon si1">
            <ShieldAlert size={18} />
          </div>
          <span>Risk Score</span>
          <b className="text-rose-600">{riskScore} / 100</b>
        </div>

        <div>
          <div className="summary-icon">
            <Activity size={18} />
          </div>
          <span>Transactions</span>
          <b className="text-ink">{activeCase.transactionsCount}</b>
        </div>

        <div>
          <div className="summary-icon">
            <Share2 size={18} />
          </div>
          <span>Syndicate Links</span>
          <b
            onClick={() => onNavigate("network")}
            className="text-emerald-800 hover:underline cursor-pointer"
          >
            {activeCase.networkConnections} Nodes
          </b>
        </div>

        <div>
          <div className="summary-icon si2">
            <DollarSign size={18} />
          </div>
          <span>Capital at Risk</span>
          <b className="text-rose-600 font-mono">৳{exposure.toLocaleString()}</b>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center gap-2 border-b border-line pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "overview"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-muted hover:text-ink"
          }`}
        >
          Evidence Overview
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "timeline"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-muted hover:text-ink"
          }`}
        >
          Incident Telemetry Timeline
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === "audit"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-muted hover:text-ink"
          }`}
        >
          <History size={13} />
          <span>Audit Trail ({caseAuditEvents.length})</span>
        </button>
      </div>

      {/* Main 2-Column Dossier Workspace */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column: Dossier Details / Audit Tab */}
        <div className="col-span-7 space-y-4">
          {activeTab === "overview" && (
            <>
              {/* Executive Summary Card */}
              <div className="card-base p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <div className="eyebrow">EXECUTIVE SUMMARY</div>
                  <span className="text-xs text-subtle font-mono">Reason: {activeCase.reason}</span>
                </div>
                <p className="text-xs text-ink leading-relaxed">{activeCase.summary}</p>
              </div>

              {/* Multi-Signal Breakdown Card */}
              <div className="card-base p-5 space-y-3">
                <div className="eyebrow pb-2 border-b border-line">STRUCTURED RISK EVIDENCE</div>
                <div className="space-y-3">
                  {[
                    {
                      signal: "Transaction Amount Spike",
                      desc: "Amount is 4.8× above the customer's 30-day baseline median of ৳6,800.",
                      score: 92,
                      deviated: true,
                    },
                    {
                      signal: "Hardware Device Fingerprint",
                      desc: "Device DEV-8821 first observed 12 minutes prior to transfer. Zero historical link to wallet.",
                      score: 78,
                      deviated: true,
                    },
                    {
                      signal: "Topological Mule Network Proximity",
                      desc: "Recipient wallet U-8831 is an intermediary conduit linked to Mule Syndicate Cluster #17.",
                      score: 91,
                      deviated: true,
                    },
                    {
                      signal: "Nocturnal Dormant Hours",
                      desc: "Executed at 02:13 AM. User has zero historic transactions between 11:30 PM and 7:00 AM.",
                      score: 74,
                      deviated: true,
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-line bg-surface/50 flex items-start justify-between gap-3"
                    >
                      <div>
                        <b className="text-xs text-ink block">{s.signal}</b>
                        <p className="text-[11px] text-muted mt-0.5 leading-snug">{s.desc}</p>
                      </div>
                      <span className="badge badge-critical text-[10px] shrink-0 font-mono">
                        {s.score}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "timeline" && (
            <div className="card-base p-5">
              <div className="eyebrow pb-3 border-b border-line">CHRONOLOGICAL INCIDENT TELEMETRY</div>
              <div className="space-y-3.5 mt-3">
                {evidenceTimelineINV1042.map((ev, i) => (
                  <div key={i} className="flex items-start gap-3 relative pb-2">
                    <span className="text-[10px] text-subtle font-mono w-14 shrink-0 pt-0.5">
                      {ev.time}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                        ev.isCritical ? "bg-rose-600 ring-2 ring-rose-200" : "bg-emerald-500"
                      }`}
                    />
                    <div className="text-xs flex-1">
                      <b className={ev.isCritical ? "text-rose-900 dark:text-rose-300" : "text-ink"}>
                        {ev.title}
                      </b>
                      <p className="text-muted mt-0.5">{ev.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <div className="card-base p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div>
                  <div className="eyebrow">IMMUTABLE SESSION AUDIT TRAIL</div>
                  <h3 className="text-xs font-bold text-ink">Compliance &amp; Human Decision Log</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Tamper-Evident Session Log
                </span>
              </div>

              {caseAuditEvents.length === 0 ? (
                <p className="text-xs text-muted py-6 text-center">
                  No explicit analyst interventions logged yet for this case. Use the action bar below to log decisions.
                </p>
              ) : (
                <div className="divide-y divide-line">
                  {caseAuditEvents.map((event) => (
                    <div key={event.id} className="py-2.5 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-ink font-mono">{event.actor}</span>
                        <span className="text-subtle font-mono text-[10px]">{event.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted leading-snug">{event.details}</p>
                      <span className="text-[9.5px] font-mono text-subtle block">
                        ID: {event.id} &middot; Type: {event.eventType}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Recommended Intervention Banner */}
          <div className="card-base p-4 flex items-center justify-between gap-4 border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="eyebrow text-amber-500">RECOMMENDED INTERVENTION</div>
                <h4 className="text-xs font-bold text-ink">
                  Recipient Settlement Hold &amp; Biometric Step-Up
                </h4>
                <p className="text-xs text-muted">
                  {activeCase.recommendation}
                </p>
              </div>
            </div>
            <span className="confidence-pill text-xs font-bold shrink-0">
              {activeCase.confidence}% Confidence
            </span>
          </div>
        </div>

        {/* Right Column: Sentinel AI Investigation Assistant */}
        <div className="col-span-5">
          <SentinelAssistant
            caseId={caseId}
            customer={customer}
            onNotify={onNotify}
          />
        </div>
      </div>

      {/* Persistent Bottom Action Bar with Human Oversight Safeguards */}
      <div className="action-bar select-none fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-line px-6 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2 text-xs text-muted">
          <ShieldAlert size={16} className="text-amber-500 shrink-0" />
          <span>
            <b>Human Oversight Required:</b> High-impact account sanctions require analyst confirmation. Autonomous financial blocks prohibited.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAction("MARK_SAFE", "Marked as False Positive / Safe")}
            className="btn btn-secondary text-xs"
          >
            Mark False Positive
          </button>
          <button
            onClick={() => handleAction("STEP_UP", "Biometric step-up challenge dispatched")}
            className="btn btn-secondary text-xs"
          >
            Request Biometric 2FA
          </button>
          <button
            onClick={() => handleAction("HOLD", "Settlement hold placed on recipient")}
            className="btn text-xs bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 flex items-center gap-1.5"
          >
            <PauseCircle size={14} />
            <span>Hold Settlement</span>
          </button>
          <button
            onClick={() => handleAction("ESCALATE", "Escalated to AML Committee & Legal")}
            className="btn btn-danger text-xs flex items-center gap-1.5"
          >
            <AlertTriangle size={14} />
            <span>Escalate Case</span>
          </button>
          <button
            onClick={() => handleAction("RELEASE", "Case closed and resolved")}
            className="btn btn-primary text-xs flex items-center gap-1.5"
          >
            <CheckCircle2 size={14} />
            <span>Close Case</span>
          </button>
        </div>
      </div>
    </div>
  );
};
