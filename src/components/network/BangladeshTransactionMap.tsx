"use client";

import React, { useState, useEffect } from "react";
import { NavigationPage } from "@/types";
import {
  MapPin,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Zap,
  Activity,
  Radio,
  Layers,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface GeoHub {
  id: string;
  name: string;
  bnName: string;
  x: number;
  y: number;
  role: string;
  riskTier: "Critical" | "High" | "Normal";
  tps: number;
  activeTxns: number;
  totalVolume: number;
}

interface TransactionFlow {
  id: string;
  fromId: string;
  toId: string;
  amount: number;
  sender: string;
  recipient: string;
  type: string;
  riskScore: number;
  riskLevel: "Critical" | "High" | "Normal";
  isSyndicate: boolean;
  time: string;
}

const BANGLADESH_HUBS: GeoHub[] = [
  { id: "dhaka", name: "Dhaka Central", bnName: "ঢাকা", x: 470, y: 270, role: "National MFS Primary Gateway & Settlement Switch", riskTier: "Critical", tps: 840, activeTxns: 1240, totalVolume: 14850000 },
  { id: "chattogram", name: "Chattogram Hub", bnName: "চট্টগ্রাম", x: 620, y: 360, role: "Port Merchant Clearing & High-Value Cash-Out", riskTier: "High", tps: 320, activeTxns: 410, totalVolume: 6200000 },
  { id: "sylhet", name: "Sylhet Corridor", bnName: "সিলেট", x: 630, y: 160, role: "International Inbound Remittance & Smurfing Watch", riskTier: "Critical", tps: 210, activeTxns: 290, totalVolume: 4900000 },
  { id: "rajshahi", name: "Rajshahi Gateway", bnName: "রাজশাহী", x: 260, y: 190, role: "North-West Cross-Border Distribution Node", riskTier: "Normal", tps: 130, activeTxns: 180, totalVolume: 2100000 },
  { id: "khulna", name: "Khulna Node", bnName: "খুলনা", x: 340, y: 380, role: "South-West Industrial Merchant Transit Point", riskTier: "Normal", tps: 160, activeTxns: 220, totalVolume: 2800000 },
  { id: "barishal", name: "Barishal Delta", bnName: "বরিশাল", x: 440, y: 410, role: "Southern Riverine MFS Agent Network", riskTier: "Normal", tps: 95, activeTxns: 140, totalVolume: 1450000 },
  { id: "rangpur", name: "Rangpur North", bnName: "রংপুর", x: 280, y: 100, role: "Northern Frontier Velocity Conduit", riskTier: "High", tps: 110, activeTxns: 160, totalVolume: 1750000 },
  { id: "mymensingh", name: "Mymensingh Hub", bnName: "ময়মনসিংহ", x: 460, y: 170, role: "Central Agricultural Trade Junction", riskTier: "Normal", tps: 125, activeTxns: 175, totalVolume: 1950000 },
  { id: "comilla", name: "Cumilla Corridor", bnName: "কুমিল্লা", x: 540, y: 290, role: "Eastern Highway Agent Transit Hub", riskTier: "High", tps: 140, activeTxns: 190, totalVolume: 2300000 },
  { id: "coxsbazar", name: "Cox's Bazar", bnName: "কক্সবাজার", x: 680, y: 450, role: "Border Transit & High-Anomalous SIM Swap Hub", riskTier: "Critical", tps: 85, activeTxns: 115, totalVolume: 1620000 },
  { id: "bogura", name: "Bogura Node", bnName: "বগুড়া", x: 350, y: 170, role: "North Bengal Commercial Transit Conduit", riskTier: "Normal", tps: 105, activeTxns: 150, totalVolume: 1800000 },
];

const INITIAL_FLOWS: TransactionFlow[] = [
  { id: "FL-101", fromId: "dhaka", toId: "sylhet", amount: 48500, sender: "U-1042", recipient: "U-8831", type: "Mule Structuring", riskScore: 94, riskLevel: "Critical", isSyndicate: true, time: "Just now" },
  { id: "FL-102", fromId: "chattogram", toId: "dhaka", amount: 98000, sender: "U-7721", recipient: "U-1042", type: "SIM Swap Drain", riskScore: 98, riskLevel: "Critical", isSyndicate: true, time: "1m ago" },
  { id: "FL-103", fromId: "dhaka", toId: "rajshahi", amount: 24000, sender: "U-3321", recipient: "U-4412", type: "Velocity Burst", riskScore: 78, riskLevel: "High", isSyndicate: false, time: "2m ago" },
  { id: "FL-104", fromId: "sylhet", toId: "comilla", amount: 15000, sender: "U-8831", recipient: "U-9921", type: "Smurfing Hop", riskScore: 86, riskLevel: "High", isSyndicate: true, time: "3m ago" },
  { id: "FL-105", fromId: "khulna", toId: "dhaka", amount: 35000, sender: "U-5512", recipient: "U-2211", type: "Agent Cash-out", riskScore: 42, riskLevel: "Normal", isSyndicate: false, time: "4m ago" },
  { id: "FL-106", fromId: "rangpur", toId: "bogura", amount: 19500, sender: "U-6619", recipient: "U-3512", type: "Merchant Pay", riskScore: 28, riskLevel: "Normal", isSyndicate: false, time: "5m ago" },
  { id: "FL-107", fromId: "coxsbazar", toId: "chattogram", amount: 42000, sender: "U-9182", recipient: "U-7721", type: "Nocturnal Mule Transfer", riskScore: 91, riskLevel: "Critical", isSyndicate: true, time: "6m ago" },
  { id: "FL-108", fromId: "dhaka", toId: "barishal", amount: 12000, sender: "U-1192", recipient: "U-6120", type: "Wallet Transfer", riskScore: 22, riskLevel: "Normal", isSyndicate: false, time: "7m ago" },
];

interface BangladeshTransactionMapProps {
  onSelectNode?: (hub: GeoHub) => void;
  onOpenCase?: (caseId: string) => void;
}

export const BangladeshTransactionMap: React.FC<BangladeshTransactionMapProps> = ({
  onSelectNode,
  onOpenCase,
}) => {
  const [selectedHub, setSelectedHub] = useState<GeoHub>(BANGLADESH_HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState<GeoHub | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [filterRisk, setFilterRisk] = useState<"all" | "critical" | "syndicate">("all");
  const [activeFlowIndex, setActiveFlowIndex] = useState<number>(0);

  // Auto-cycle through active transaction flows for demonstration
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlowIndex((prev) => (prev + 1) % INITIAL_FLOWS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeFlow = INITIAL_FLOWS[activeFlowIndex];

  const filteredFlows = INITIAL_FLOWS.filter((flow) => {
    if (filterRisk === "critical") return flow.riskLevel === "Critical";
    if (filterRisk === "syndicate") return flow.isSyndicate;
    return true;
  });

  return (
    <div className="relative w-full h-full min-h-[520px] bg-brand-surface rounded-xl overflow-hidden border border-brand-border flex flex-col justify-between select-none">
      {/* Top Overlay: Flow Status Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-brand-surface/90 border border-brand-border p-1.5 px-3 rounded-lg backdrop-blur-md shadow-card pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-brand-text">
            Bangladesh Domestic MFS Telemetry Map
          </span>
          <span className="text-[10px] font-mono text-upay-gold px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/20">
            LIVE 11 HUBS
          </span>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1 bg-brand-surface/90 border border-brand-border p-1 rounded-lg backdrop-blur-md pointer-events-auto text-xs">
          <button
            onClick={() => setFilterRisk("all")}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              filterRisk === "all" ? "bg-brand-elevated text-brand-text font-bold" : "text-brand-muted hover:text-brand-text"
            }`}
          >
            All Transfers
          </button>
          <button
            onClick={() => setFilterRisk("critical")}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              filterRisk === "critical" ? "bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30" : "text-brand-muted hover:text-brand-text"
            }`}
          >
            Critical Anomalies
          </button>
          <button
            onClick={() => setFilterRisk("syndicate")}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              filterRisk === "syndicate" ? "bg-amber-500/20 text-upay-gold font-bold border border-amber-500/30" : "text-brand-muted hover:text-brand-text"
            }`}
          >
            Cluster #17 Conduit
          </button>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full h-[520px] bg-[#080D14] flex items-center justify-center overflow-hidden">
        {/* Subtle geographic grid lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#252D37_1px,transparent_1px)] [background-size:24px_24px]" />

        <svg
          viewBox="0 0 920 540"
          className="w-full h-full max-w-[920px] max-h-[540px]"
        >
          <defs>
            {/* Glowing filter */}
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Bangladesh Boundary Silhouette (Clean stylized contour) */}
          <path
            d="M 280,75 L 340,65 L 420,80 L 480,95 L 530,120 L 590,110 L 670,120 L 685,180 L 640,240 L 620,290 L 660,330 L 710,400 L 700,470 L 640,430 L 580,390 L 540,410 L 490,445 L 440,455 L 390,440 L 330,420 L 290,370 L 250,300 L 220,240 L 230,170 L 250,110 Z"
            fill="#0F1622"
            stroke="#1F2A38"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Major Division Border Guidelines */}
          <path
            d="M 370,140 Q 420,220 470,270 T 570,360"
            fill="none"
            stroke="#192330"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <path
            d="M 470,270 L 340,380 M 470,270 L 630,160 M 470,270 L 260,190"
            fill="none"
            stroke="#192330"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          {/* Bay of Bengal label */}
          <text
            x="480"
            y="500"
            fill="#233245"
            fontSize="12"
            fontFamily="monospace"
            letterSpacing="6"
            textAnchor="middle"
            fontWeight="bold"
          >
            BAY OF BENGAL
          </text>

          {/* Active Transaction Arcs (Curved pathways) */}
          <g>
            {filteredFlows.map((flow) => {
              const src = BANGLADESH_HUBS.find((h) => h.id === flow.fromId);
              const dst = BANGLADESH_HUBS.find((h) => h.id === flow.toId);
              if (!src || !dst) return null;

              const isHighlighted = flow.id === activeFlow.id;
              // Curved midpoint
              const mx = (src.x + dst.x) / 2 + (src.y > dst.y ? -25 : 25);
              const my = (src.y + dst.y) / 2 - 30;
              const pathD = `M ${src.x},${src.y} Q ${mx},${my} ${dst.x},${dst.y}`;

              const strokeColor =
                flow.riskLevel === "Critical"
                  ? "#EF4444"
                  : flow.riskLevel === "High"
                  ? "#F97316"
                  : "#10B981";

              return (
                <g key={flow.id}>
                  {/* Base Track */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isHighlighted ? 2.5 : 1.2}
                    strokeOpacity={isHighlighted ? 0.9 : 0.35}
                    strokeDasharray={isHighlighted ? undefined : "4 3"}
                    filter={isHighlighted && flow.riskLevel === "Critical" ? "url(#glow-red)" : undefined}
                  />

                  {/* Flow Direction Indicator & Label */}
                  {isHighlighted && (
                    <g>
                      <circle
                        cx={mx}
                        cy={my}
                        r="3.5"
                        fill={strokeColor}
                        filter="url(#glow-red)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <rect
                        x={mx - 48}
                        y={my - 18}
                        width="96"
                        height="14"
                        rx="3"
                        fill="#0B0F14"
                        stroke={strokeColor}
                        strokeWidth="1"
                        opacity="0.9"
                      />
                      <text
                        x={mx}
                        y={my - 8}
                        fill="#F4F7FA"
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        ৳{flow.amount.toLocaleString()} &middot; {flow.riskScore}/100
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* Bangladesh Division Hub Markers */}
          {BANGLADESH_HUBS.map((hub) => {
            const isSelected = selectedHub.id === hub.id;
            const isHovered = hoveredHub?.id === hub.id;
            const isSrc = activeFlow.fromId === hub.id;
            const isDst = activeFlow.toId === hub.id;

            const markerColor =
              hub.riskTier === "Critical"
                ? "#EF4444"
                : hub.riskTier === "High"
                ? "#F59E0B"
                : "#10B981";

            return (
              <g
                key={hub.id}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedHub(hub);
                  onSelectNode?.(hub);
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredHub(hub);
                  setHoverPos({ x: hub.x, y: hub.y });
                }}
                onMouseLeave={() => {
                  setHoveredHub(null);
                  setHoverPos(null);
                }}
              >
                {/* Outer animated ping ring for active hubs */}
                {(isSrc || isDst || isSelected) && (
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={isSelected ? 18 : 14}
                    fill="none"
                    stroke={markerColor}
                    strokeWidth="1.5"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="r"
                      values="10;24;10"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0;0.8"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Core City Marker Dot */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isSelected ? 7 : isHovered ? 6 : 5}
                  fill={markerColor}
                  stroke="#0B0F14"
                  strokeWidth="2"
                  filter={hub.riskTier === "Critical" ? "url(#glow-red)" : "url(#glow-gold)"}
                />

                {/* City Name Label */}
                <text
                  x={hub.x}
                  y={hub.y + 14}
                  fill={isSelected ? "#F59E0B" : "#F4F7FA"}
                  fontSize={isSelected ? "11" : "10"}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.9)" }}
                >
                  {hub.name.replace(" Central", "").replace(" Hub", "").replace(" Corridor", "").replace(" Gateway", "").replace(" Node", "").replace(" Delta", "").replace(" North", "")}
                </text>

                {/* Bengali Sub-label */}
                <text
                  x={hub.x}
                  y={hub.y + 24}
                  fill="#9AA6B2"
                  fontSize="8.5"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                >
                  {hub.bnName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Stable Non-blinking Tooltip anchored above hovered hub */}
        {hoveredHub && hoverPos && (
          <div
            className="absolute z-30 pointer-events-none bg-brand-surface/95 border border-brand-border p-2.5 rounded-lg shadow-modal text-brand-text text-xs min-w-[190px] -translate-x-1/2 -translate-y-full mb-3"
            style={{
              left: `${(hoverPos.x / 920) * 100}%`,
              top: `${(hoverPos.y / 540) * 100}%`,
            }}
          >
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-brand-border">
              <b className="font-semibold text-brand-text flex items-center gap-1">
                <MapPin size={12} className="text-upay-gold" />
                {hoveredHub.name}
              </b>
              <span className={`text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                hoveredHub.riskTier === "Critical"
                  ? "bg-rose-500/15 text-rose-400"
                  : hoveredHub.riskTier === "High"
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-emerald-500/15 text-emerald-400"
              }`}>
                {hoveredHub.riskTier}
              </span>
            </div>
            <p className="text-[10.5px] text-brand-muted leading-tight mb-2">
              {hoveredHub.role}
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              <div className="p-1 rounded bg-brand-elevated">
                <span className="text-brand-subtle block">LIVE TPS</span>
                <b className="text-brand-text">{hoveredHub.tps} txns/s</b>
              </div>
              <div className="p-1 rounded bg-brand-elevated">
                <span className="text-brand-subtle block">ACTIVE VOLUME</span>
                <b className="text-upay-gold">৳{(hoveredHub.totalVolume / 1000000).toFixed(1)}M</b>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Information Dock: Active In-Transit Transaction Dossier */}
      <div className="p-3 bg-brand-surface border-t border-brand-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        {/* Active Flow Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-brand-elevated text-rose-500 border border-brand-border flex items-center justify-center shrink-0">
            <Radio size={16} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-brand-text">
                IN-TRANSIT TRANSACTION #{activeFlow.id}
              </span>
              <span className={`px-1.5 py-0.2 rounded text-[9.5px] font-mono font-bold ${
                activeFlow.riskLevel === "Critical"
                  ? "bg-rose-500/15 text-rose-400 border border-rose-500/25"
                  : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
              }`}>
                SCORE {activeFlow.riskScore}/100
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-brand-muted mt-0.5">
              <span className="capitalize font-semibold text-brand-text">
                {activeFlow.fromId}
              </span>
              <ArrowRight size={11} className="text-upay-gold" />
              <span className="capitalize font-semibold text-brand-text">
                {activeFlow.toId}
              </span>
              <span>&bull;</span>
              <b className="text-upay-gold font-mono">৳{activeFlow.amount.toLocaleString()} BDT</b>
              <span>&bull;</span>
              <span className="text-brand-subtle">{activeFlow.type}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenCase?.("INV-1042")}
            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <ShieldAlert size={12} />
            <span>Intercept Corridor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
