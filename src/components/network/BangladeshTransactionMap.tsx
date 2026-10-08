"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  ArrowRight,
  ShieldAlert,
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  BarChart2,
  Wifi,
  X,
} from "lucide-react";
import { useSentinel } from "@/context/SentinelContext";

/* ──────────────────────────────────────────────────────────
   DATA MODEL
────────────────────────────────────────────────────────── */
export interface GeoHub {
  id: string;
  name: string;
  bnName: string;
  lat: number;
  lng: number;
  svgX: number; // normalised 0–1000 for fallback SVG
  svgY: number;
  role: string;
  bnRole: string;
  riskTier: "Critical" | "High" | "Normal";
  tps: number;
  activeTxns: number;
  totalVolume: number;
}

export interface TransactionFlow {
  id: string;
  fromId: string;
  toId: string;
  amount: number;
  sender: string;
  recipient: string;
  type: string;
  bnType: string;
  riskScore: number;
  riskLevel: "Critical" | "High" | "Normal";
  isSyndicate: boolean;
  time: string;
}

export const BANGLADESH_HUBS: GeoHub[] = [
  { id: "dhaka",      name: "Dhaka",       bnName: "ঢাকা",       lat: 23.8103, lng: 90.4125, svgX: 500, svgY: 310, role: "National MFS Primary Gateway",           bnRole: "জাতীয় এমএফএস প্রধান সেটেলমেন্ট সুইচ",  riskTier: "Critical", tps: 840, activeTxns: 1240, totalVolume: 14850000 },
  { id: "chattogram", name: "Chattogram",  bnName: "চট্টগ্রাম",  lat: 22.3569, lng: 91.7832, svgX: 640, svgY: 420, role: "Port Merchant Clearing & Cash-Out",        bnRole: "বাণিজ্যিক পোর্ট মার্চেন্ট ও ক্যাশ আউট", riskTier: "High",     tps: 320, activeTxns: 410,  totalVolume: 6200000  },
  { id: "sylhet",     name: "Sylhet",      bnName: "সিলেট",      lat: 24.8949, lng: 91.8687, svgX: 640, svgY: 180, role: "Inbound Remittance & Mule Watch",         bnRole: "প্রবাসী রেমিট্যান্স ও মিউল নজরদারি",   riskTier: "Critical", tps: 210, activeTxns: 290,  totalVolume: 4900000  },
  { id: "rajshahi",   name: "Rajshahi",    bnName: "রাজশাহী",    lat: 24.3745, lng: 88.6042, svgX: 240, svgY: 220, role: "North-West Transit Distribution",         bnRole: "উত্তর-পশ্চিম বাণিজ্যিক লেনদেন নোড",   riskTier: "Normal",   tps: 130, activeTxns: 180,  totalVolume: 2100000  },
  { id: "khulna",     name: "Khulna",      bnName: "খুলনা",      lat: 22.8456, lng: 89.5403, svgX: 330, svgY: 430, role: "South-West Industrial Merchant Node",     bnRole: "দক্ষিণ-পশ্চিম শিল্পাঞ্চল মার্চেন্ট নোড",riskTier: "Normal",   tps: 160, activeTxns: 220,  totalVolume: 2800000  },
  { id: "barishal",   name: "Barishal",    bnName: "বরিশাল",     lat: 22.7010, lng: 90.3535, svgX: 460, svgY: 470, role: "Southern Riverine Agent Network",         bnRole: "উপকূলীয় এমএফএস এজেন্ট নেটওয়ার্ক",   riskTier: "Normal",   tps: 95,  activeTxns: 140,  totalVolume: 1450000  },
  { id: "rangpur",    name: "Rangpur",     bnName: "রংপুর",      lat: 25.7439, lng: 89.2752, svgX: 280, svgY: 110, role: "Northern Frontier Velocity Corridor",     bnRole: "উত্তরাঞ্চলীয় সীমান্ত লেনদেন করিডোর",  riskTier: "High",     tps: 110, activeTxns: 160,  totalVolume: 1750000  },
  { id: "mymensingh", name: "Mymensingh",  bnName: "ময়মনসিংহ",  lat: 24.7471, lng: 90.4203, svgX: 490, svgY: 200, role: "Central Agricultural Trade Junction",     bnRole: "কৃষি ও বাজার ভিত্তিক লেনদেন জংশন",   riskTier: "Normal",   tps: 125, activeTxns: 175,  totalVolume: 1950000  },
  { id: "comilla",    name: "Cumilla",     bnName: "কুমিল্লা",   lat: 23.4607, lng: 91.1809, svgX: 570, svgY: 340, role: "Eastern Highway Agent Transit Hub",       bnRole: "পূর্বাঞ্চলীয় মহাসড়ক এজেন্ট ট্রানজিট", riskTier: "High",     tps: 140, activeTxns: 190,  totalVolume: 2300000  },
  { id: "coxsbazar",  name: "Cox's Bazar", bnName: "কক্সবাজার",  lat: 21.4272, lng: 92.0058, svgX: 680, svgY: 520, role: "Tourist & SIM Swap Watch Hub",           bnRole: "পর্যটন ও সিম সোয়াপ নজরদারি নোড",      riskTier: "Critical", tps: 85,  activeTxns: 115,  totalVolume: 1620000  },
  { id: "bogura",     name: "Bogura",      bnName: "বগুড়া",      lat: 24.8465, lng: 89.3720, svgX: 350, svgY: 185, role: "North Bengal Commercial Conduit",         bnRole: "উত্তরবঙ্গ বাণিজ্যিক সংযোগ করিডোর",    riskTier: "Normal",   tps: 105, activeTxns: 150,  totalVolume: 1800000  },
];

const FLOWS: TransactionFlow[] = [
  { id: "f1", fromId: "sylhet",     toId: "dhaka",      amount: 480000, sender: "U-4421", recipient: "U-0087", type: "Remittance",     bnType: "রেমিট্যান্স",  riskScore: 81, riskLevel: "Critical", isSyndicate: true,  time: "09:14" },
  { id: "f2", fromId: "dhaka",      toId: "chattogram", amount: 210000, sender: "U-1193", recipient: "U-2247", type: "Merchant Pay",   bnType: "মার্চেন্ট পে", riskScore: 55, riskLevel: "High",     isSyndicate: false, time: "09:11" },
  { id: "f3", fromId: "comilla",    toId: "dhaka",      amount: 95000,  sender: "U-8831", recipient: "U-0087", type: "Wallet Transfer",bnType: "ওয়ালেট ট্রান্সফার", riskScore: 72, riskLevel: "High",  isSyndicate: true,  time: "09:08" },
  { id: "f4", fromId: "rangpur",    toId: "dhaka",      amount: 62000,  sender: "U-3310", recipient: "U-1190", type: "Cash Out",       bnType: "ক্যাশ আউট",    riskScore: 48, riskLevel: "Normal",   isSyndicate: false, time: "09:05" },
  { id: "f5", fromId: "coxsbazar",  toId: "chattogram", amount: 340000, sender: "U-9921", recipient: "U-6640", type: "SIM Swap Probe", bnType: "সিম সোয়াপ",   riskScore: 88, riskLevel: "Critical", isSyndicate: true,  time: "09:03" },
  { id: "f6", fromId: "khulna",     toId: "dhaka",      amount: 77000,  sender: "U-5512", recipient: "U-1190", type: "Add Money",      bnType: "অ্যাড মানি",    riskScore: 32, riskLevel: "Normal",   isSyndicate: false, time: "09:00" },
];

/* ──────────────────────────────────────────────────────────
   COLOUR HELPERS
────────────────────────────────────────────────────────── */
const TIER_COLOR = {
  Critical: { dot: "#DC2626", ring: "#FEE2E2", flow: "#DC2626", text: "#DC2626" },
  High:     { dot: "#EA580C", ring: "#FFF7ED", flow: "#F59E0B", text: "#EA580C" },
  Normal:   { dot: "#059669", ring: "#ECFDF5", flow: "#0284C7", text: "#059669" },
};

/* ──────────────────────────────────────────────────────────
   GOOGLE MAP COMPONENT (loads only when API key present)
────────────────────────────────────────────────────────── */
const GoogleMapOverlay: React.FC<{
  selectedHub: GeoHub | null;
  onSelectHub: (h: GeoHub) => void;
  isBn: boolean;
}> = ({ selectedHub, onSelectHub, isBn }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !window.google?.maps) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 23.685, lng: 90.3563 },
      zoom: 7,
      mapId: "bd_sentinel_map",
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      restriction: {
        latLngBounds: { north: 26.8, south: 20.5, east: 93.0, west: 87.8 },
        strictBounds: false,
      },
      styles: [
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#dbeafe" }] },
        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#e2e8f0" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#cbd5e1" }] },
        { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#94a3b8", weight: "2" }] },
        { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#cbd5e1" }] },
      ],
    });
    mapInstanceRef.current = map;

    // Add advanced markers
    BANGLADESH_HUBS.forEach((hub) => {
      const colors = TIER_COLOR[hub.riskTier];
      const el = document.createElement("div");
      el.style.cssText = `
        width:36px;height:36px;border-radius:50%;
        background:${colors.ring};border:2.5px solid ${colors.dot};
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;transition:transform 0.15s;
        font-size:10px;font-weight:700;color:${colors.text};
        font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
      `;
      el.textContent = hub.tps > 200 ? "●" : "●";

      const inner = document.createElement("div");
      inner.style.cssText = `width:10px;height:10px;border-radius:50%;background:${colors.dot}`;
      el.appendChild(inner);

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: hub.lat, lng: hub.lng },
        content: el,
        title: hub.name,
      });

      el.addEventListener("click", () => onSelectHub(hub));
      el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.2)"; });
      el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });

      markersRef.current.push(marker);
    });

    setMapReady(true);
    return () => {
      markersRef.current.forEach((m) => { m.map = null; });
      markersRef.current = [];
    };
  }, [onSelectHub]);

  return (
    <div ref={mapRef} className="w-full h-full" style={{ minHeight: 380 }}>
      {!mapReady && (
        <div className="w-full h-full flex items-center justify-center bg-slate-50">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <RefreshCw size={14} className="animate-spin" />
            <span>{isBn ? "মানচিত্র লোড হচ্ছে..." : "Loading map…"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ──────────────────────────────────────────────────────────
   SVG FALLBACK MAP (no API key / SSR safe)
────────────────────────────────────────────────────────── */

// Bangladesh approximate border path (simplified for SVG 800×600 viewport)
const BD_BORDER = `M 235 105 L 200 115 L 178 142 L 172 168 L 185 185
  L 195 200 L 210 210 L 218 228 L 220 252 L 215 275
  L 210 298 L 218 318 L 225 340 L 235 358 L 248 375
  L 265 390 L 278 405 L 300 418 L 320 428 L 340 435
  L 362 442 L 385 450 L 405 465 L 420 478 L 440 488
  L 460 498 L 480 504 L 500 510 L 518 508 L 538 502
  L 555 490 L 572 475 L 588 460 L 598 448 L 608 436
  L 620 420 L 635 402 L 648 388 L 658 372 L 665 355
  L 668 338 L 665 322 L 660 308 L 658 290 L 652 272
  L 645 255 L 640 238 L 638 218 L 635 198 L 630 178
  L 622 162 L 612 148 L 600 140 L 585 132 L 570 126
  L 555 120 L 538 114 L 520 110 L 502 108 L 482 108
  L 462 108 L 442 108 L 422 106 L 402 104 L 382 103
  L 362 102 L 342 102 L 322 103 L 302 104 L 280 106
  L 260 107 Z`;

const SvgMap: React.FC<{
  hubs: GeoHub[];
  flows: TransactionFlow[];
  selectedHub: GeoHub | null;
  onSelectHub: (h: GeoHub) => void;
  activeFlowIdx: number;
  isBn: boolean;
}> = ({ hubs, flows, selectedHub, onSelectHub, activeFlowIdx, isBn }) => {
  const W = 800, H = 560;

  // Map lat/lng to SVG coords
  const project = (lat: number, lng: number) => {
    // Bangladesh bounding box approx: lat 20.5–26.8, lng 87.8–93.0
    const xNorm = (lng - 87.8) / (93.0 - 87.8);
    const yNorm = 1 - (lat - 20.5) / (26.8 - 20.5);
    return { x: 160 + xNorm * 530, y: 80 + yNorm * 430 };
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ maxHeight: 380 }}>
      <defs>
        {/* Flow animation gradients */}
        {flows.map((f, i) => {
          const from = hubs.find((h) => h.id === f.fromId)!;
          const to   = hubs.find((h) => h.id === f.toId)!;
          if (!from || !to) return null;
          const pFrom = project(from.lat, from.lng);
          const pTo   = project(to.lat, to.lng);
          const colors = TIER_COLOR[f.riskLevel];
          return (
            <linearGradient key={f.id} id={`lg-${f.id}`}
              x1={pFrom.x} y1={pFrom.y} x2={pTo.x} y2={pTo.y}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor={colors.flow} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colors.flow} stopOpacity="0.2" />
            </linearGradient>
          );
        })}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width={W} height={H} fill="#f8fafc" rx="10" />

      {/* Water body hints */}
      <ellipse cx={720} cy={420} rx={90} ry={60} fill="#dbeafe" opacity={0.5} />
      <ellipse cx={730} cy={300} rx={50} ry={30} fill="#dbeafe" opacity={0.4} />

      {/* Bangladesh border fill */}
      <path d={BD_BORDER} fill="#eff6ff" stroke="#94a3b8" strokeWidth="1.5" opacity="0.7" />

      {/* Flow arcs */}
      {flows.map((f, idx) => {
        const from = hubs.find((h) => h.id === f.fromId);
        const to   = hubs.find((h) => h.id === f.toId);
        if (!from || !to) return null;
        const pFrom = project(from.lat, from.lng);
        const pTo   = project(to.lat, to.lng);
        const isActive = idx === activeFlowIdx;
        const mx = (pFrom.x + pTo.x) / 2;
        const my = (pFrom.y + pTo.y) / 2 - 55;
        const colors = TIER_COLOR[f.riskLevel];
        return (
          <g key={f.id}>
            <path
              d={`M ${pFrom.x} ${pFrom.y} Q ${mx} ${my} ${pTo.x} ${pTo.y}`}
              fill="none"
              stroke={`url(#lg-${f.id})`}
              strokeWidth={isActive ? 2.5 : 1.5}
              strokeDasharray={isActive ? "none" : "4 4"}
              opacity={isActive ? 1 : 0.5}
            />
            {isActive && (
              <circle r="5" fill={colors.dot} filter="url(#glow)">
                <animateMotion dur="1.8s" repeatCount="indefinite">
                  <mpath href={`#flow-path-${idx}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        );
      })}
      {/* Hidden paths for animateMotion */}
      {flows.map((f, idx) => {
        const from = hubs.find((h) => h.id === f.fromId);
        const to   = hubs.find((h) => h.id === f.toId);
        if (!from || !to) return null;
        const pFrom = project(from.lat, from.lng);
        const pTo   = project(to.lat, to.lng);
        const mx = (pFrom.x + pTo.x) / 2;
        const my = (pFrom.y + pTo.y) / 2 - 55;
        return (
          <path key={`mp-${idx}`} id={`flow-path-${idx}`}
            d={`M ${pFrom.x} ${pFrom.y} Q ${mx} ${my} ${pTo.x} ${pTo.y}`}
            fill="none" stroke="none" />
        );
      })}

      {/* Hub nodes */}
      {hubs.map((hub) => {
        const p = project(hub.lat, hub.lng);
        const colors = TIER_COLOR[hub.riskTier];
        const isSelected = selectedHub?.id === hub.id;
        const r = hub.tps > 500 ? 14 : hub.tps > 200 ? 11 : 9;
        return (
          <g key={hub.id} style={{ cursor: "pointer" }} onClick={() => onSelectHub(hub)}>
            {isSelected && (
              <circle cx={p.x} cy={p.y} r={r + 8} fill={colors.ring}
                stroke={colors.dot} strokeWidth="1.5" opacity="0.8">
                <animate attributeName="r" values={`${r+6};${r+11};${r+6}`} dur="1.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p.x} cy={p.y} r={r} fill={colors.ring}
              stroke={colors.dot} strokeWidth="2" />
            <circle cx={p.x} cy={p.y} r={r * 0.45} fill={colors.dot} />
            <text x={p.x} y={p.y + r + 11} textAnchor="middle"
              fontSize="9" fontWeight="600" fill="#334155"
              style={{ pointerEvents: "none" }}>
              {isBn ? hub.bnName.split("")[0] + hub.bnName.split("")[1] : hub.name.split(" ")[0]}
            </text>
          </g>
        );
      })}

      {/* Compass rose */}
      <text x={W - 30} y={H - 20} fontSize="10" fill="#94a3b8" textAnchor="middle">N ↑</text>
    </svg>
  );
};

/* ──────────────────────────────────────────────────────────
   MAIN EXPORT
────────────────────────────────────────────────────────── */
export const BangladeshTransactionMap: React.FC = () => {
  const { language, t } = useSentinel();
  const isBn = language === "bn";

  const [selectedHub, setSelectedHub] = useState<GeoHub | null>(BANGLADESH_HUBS[0]);
  const [activeFlowIdx, setActiveFlowIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

  // Try to load Google Maps SDK
  useEffect(() => {
    if (!apiKey) return;
    if (window.google?.maps) { setGoogleMapsLoaded(true); setUseGoogleMaps(true); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => { setGoogleMapsLoaded(true); setUseGoogleMaps(true); };
    document.head.appendChild(script);
  }, [apiKey]);

  // Cycle animated flows
  useEffect(() => {
    const id = setInterval(() => {
      setActiveFlowIdx((i) => (i + 1) % FLOWS.length);
      setTick((t) => t + 1);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // Rotate selected hub every 6 s if none manually selected
  const activeFlow = FLOWS[activeFlowIdx];

  const criticalCount = BANGLADESH_HUBS.filter((h) => h.riskTier === "Critical").length;
  const highCount     = BANGLADESH_HUBS.filter((h) => h.riskTier === "High").length;

  return (
    <div className="card-base border border-slate-200 bg-white overflow-hidden">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-blue-50 border border-blue-200">
            <MapPin size={15} className="text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {isBn ? "বাংলাদেশ এমএফএস নেটওয়ার্ক হিটম্যাপ" : "Bangladesh MFS Network Heatmap"}
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Wifi size={9} />
                {isBn ? "লাইভ" : "LIVE"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isBn
                ? `${BANGLADESH_HUBS.length}টি এমএফএস হাব · ${criticalCount}টি সংকটজনক · ${highCount}টি উচ্চ ঝুঁকি`
                : `${BANGLADESH_HUBS.length} MFS hubs · ${criticalCount} critical · ${highCount} elevated risk`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Legend */}
          {(["Critical", "High", "Normal"] as const).map((tier) => (
            <span key={tier} className="flex items-center gap-1 text-[10px] font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: TIER_COLOR[tier].dot }} />
              {isBn ? tier === "Critical" ? "সংকট" : tier === "High" ? "উচ্চ" : "স্বাভাবিক" : tier}
            </span>
          ))}
          {apiKey && (
            <span className="text-[9px] font-mono text-slate-400">
              {useGoogleMaps ? "Google Maps" : "SVG Mode"}
            </span>
          )}
        </div>
      </div>

      {/* ── Body: Map + Sidebar ── */}
      <div className="flex flex-col lg:flex-row min-h-0">
        {/* Map Area */}
        <div className="flex-1 relative bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200"
          style={{ minHeight: 340 }}>
          {useGoogleMaps && googleMapsLoaded ? (
            <GoogleMapOverlay
              selectedHub={selectedHub}
              onSelectHub={setSelectedHub}
              isBn={isBn}
            />
          ) : (
            <SvgMap
              hubs={BANGLADESH_HUBS}
              flows={FLOWS}
              selectedHub={selectedHub}
              onSelectHub={setSelectedHub}
              activeFlowIdx={activeFlowIdx}
              isBn={isBn}
            />
          )}

          {/* Floating active flow badge */}
          <div className="absolute bottom-3 left-3 right-3 md:right-auto md:max-w-xs">
            <div className="bg-white border border-slate-200 rounded px-3 py-2 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                style={{ background: TIER_COLOR[activeFlow.riskLevel].dot }} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono font-bold text-slate-700">
                    {activeFlow.sender} → {activeFlow.recipient}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 rounded"
                    style={{
                      color: TIER_COLOR[activeFlow.riskLevel].text,
                      background: TIER_COLOR[activeFlow.riskLevel].ring,
                    }}>
                    ৳{(activeFlow.amount / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {isBn ? activeFlow.bnType : activeFlow.type} · Score: {activeFlow.riskScore}/100 · {activeFlow.time}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Hub Detail + Flow Log */}
        <div className="w-full lg:w-64 xl:w-72 flex flex-col overflow-hidden">
          {/* Selected Hub Detail */}
          {selectedHub ? (
            <div className="p-3 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: TIER_COLOR[selectedHub.riskTier].dot }} />
                  <span className="text-xs font-bold text-slate-900">
                    {isBn ? selectedHub.bnName : selectedHub.name}
                  </span>
                </div>
                <button onClick={() => setSelectedHub(null)} className="text-slate-400 hover:text-slate-600">
                  <X size={13} />
                </button>
              </div>
              <p className="text-[10.5px] text-slate-500 leading-snug mb-2.5">
                {isBn ? selectedHub.bnRole : selectedHub.role}
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: isBn ? "টিপিএস" : "TPS",   value: selectedHub.tps.toLocaleString() },
                  { label: isBn ? "সক্রিয়" : "Active", value: selectedHub.activeTxns.toLocaleString() },
                  { label: isBn ? "ভলিউম" : "Volume",  value: `৳${(selectedHub.totalVolume / 1000000).toFixed(1)}M` },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-50 border border-slate-200 rounded p-1.5 text-center">
                    <div className="text-[11px] font-mono font-bold text-slate-800">{m.value}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                {selectedHub.riskTier === "Critical" && <ShieldAlert size={11} className="text-red-600" />}
                {selectedHub.riskTier === "High" && <AlertTriangle size={11} className="text-amber-600" />}
                {selectedHub.riskTier === "Normal" && <CheckCircle2 size={11} className="text-emerald-600" />}
                <span className="text-[10px] font-semibold"
                  style={{ color: TIER_COLOR[selectedHub.riskTier].text }}>
                  {isBn
                    ? selectedHub.riskTier === "Critical" ? "সংকটজনক ঝুঁকি"
                    : selectedHub.riskTier === "High" ? "উচ্চ ঝুঁকি" : "স্বাভাবিক"
                    : selectedHub.riskTier + " Risk Tier"}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3 border-b border-slate-200 flex-shrink-0 flex items-center gap-2 text-slate-400">
              <MapPin size={12} />
              <span className="text-[11px]">{isBn ? "হাবে ক্লিক করুন" : "Click a hub to inspect"}</span>
            </div>
          )}

          {/* Live Flow Log */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
              <Activity size={11} className="text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                {isBn ? "লাইভ ফ্লো লগ" : "Live Flow Log"}
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {FLOWS.map((f, idx) => {
                const fromHub = BANGLADESH_HUBS.find((h) => h.id === f.fromId);
                const toHub   = BANGLADESH_HUBS.find((h) => h.id === f.toId);
                const isActive = idx === activeFlowIdx;
                const colors = TIER_COLOR[f.riskLevel];
                return (
                  <div key={f.id}
                    className="px-3 py-2 transition-colors"
                    style={{ background: isActive ? colors.ring : undefined }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5"
                          style={{ background: colors.dot }} />
                        <span className="text-[10px] font-mono font-semibold text-slate-700 truncate">
                          {isBn ? fromHub?.bnName?.slice(0,4) : fromHub?.name?.split(" ")[0]}
                          {" "}→{" "}
                          {isBn ? toHub?.bnName?.slice(0,4) : toHub?.name?.split(" ")[0]}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold flex-shrink-0"
                        style={{ color: colors.text }}>
                        {f.riskScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[9.5px] text-slate-500 truncate">
                        ৳{(f.amount / 1000).toFixed(0)}K · {isBn ? f.bnType : f.type}
                      </span>
                      {f.isSyndicate && (
                        <span className="text-[9px] font-bold text-rose-600 ml-1 flex-shrink-0">SYND</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="border-t border-slate-200 px-3 py-2.5 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BarChart2 size={11} className="text-blue-600" />
              <span className="text-[10px] text-slate-500 font-medium">
                {isBn ? "মোট ভলিউম" : "Total Volume"}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-800">
              ৳{(BANGLADESH_HUBS.reduce((a, h) => a + h.totalVolume, 0) / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      {/* ── Hub Grid ── */}
      <div className="border-t border-slate-200 px-4 py-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2">
          {BANGLADESH_HUBS.map((hub) => {
            const colors = TIER_COLOR[hub.riskTier];
            const isSelected = selectedHub?.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(isSelected ? null : hub)}
                className="p-2 rounded text-left transition-all border"
                style={{
                  background: isSelected ? colors.ring : "#F8FAFC",
                  borderColor: isSelected ? colors.dot : "#E2E8F0",
                }}>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: colors.dot }} />
                  <span className="text-[9.5px] font-bold text-slate-800 truncate">
                    {isBn ? hub.bnName.slice(0, 5) : hub.name.split(" ")[0]}
                  </span>
                </div>
                <div className="text-[9px] font-mono text-slate-500">{hub.tps} tps</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
