"use client";

import React, { useState } from "react";
import { NavigationPage, NetworkNode, NetworkEdge } from "@/types";
import { networkNodes, networkEdges } from "@/lib/data";
import {
  Share2,
  Sparkles,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Briefcase,
  AlertTriangle,
  Layers,
  Smartphone,
  Store,
  User,
  Box,
} from "lucide-react";
import { FraudNetwork3D } from "./FraudNetwork3D";

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
  const [selectedNodeId, setSelectedNodeId] = useState<string>("U-1042");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");

  const selectedNode = networkNodes.find((n) => n.id === selectedNodeId) || networkNodes[0];

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNodeId(node.id);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="eyebrow flex items-center gap-1.5 text-amber-500">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            GRAPH NEURAL NETWORK &amp; TOPOLOGY ANALYSIS
          </div>
          <h1 className="page-title text-ink">Fraud Network Intelligence</h1>
          <p className="page-subtitle text-muted">
            Uncover coordinated money-mule rings, shared device rings, and rapid fund layering across accounts in 3D spatial space.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* 2D vs 3D View Switcher */}
          <div className="flex items-center bg-surface border border-line rounded-xl p-1 text-xs shadow-sm">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "3d"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Sparkles size={13} />
              <span>3D Spatial View</span>
            </button>
            <button
              onClick={() => setViewMode("2d")}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "2d"
                  ? "bg-slate-800 text-white dark:bg-slate-700"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Layers size={13} />
              <span>2D Graph</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-surface border border-line rounded-lg p-1 text-xs">
            <button
              onClick={() => setFilterType("all")}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                filterType === "all" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold" : "text-muted"
              }`}
            >
              All Nodes
            </button>
            <button
              onClick={() => setFilterType("mule")}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                filterType === "mule" ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold" : "text-muted"
              }`}
            >
              Mule Syndicate Only
            </button>
            <button
              onClick={() => setFilterType("device")}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                filterType === "device" ? "bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold" : "text-muted"
              }`}
            >
              Device Rings
            </button>
          </div>

          <button
            onClick={() => onNavigate("investigations")}
            className="btn btn-primary text-xs flex items-center gap-2"
          >
            <Briefcase size={14} />
            <span>Create Investigation</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas + Cluster Panel */}
      <div className="grid grid-cols-12 gap-4">
        {/* Network Canvas Card */}
        <div className="col-span-12 lg:col-span-8 card-base network-card relative overflow-hidden flex flex-col justify-between border border-line">
          {viewMode === "3d" ? (
            <FraudNetwork3D
              selectedNodeId={selectedNodeId}
              onSelectNode={handleNodeClick}
              onOpenCase={onOpenCase}
              filterType={filterType}
            />
          ) : (
            <div className="network-canvas absolute inset-0">
              {/* Toolbar Top Left */}
              <div className="network-toolbar">
                <div
                  className="tool"
                  onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </div>
                <div
                  className="tool"
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </div>
                <div
                  className="tool"
                  onClick={() => setZoomLevel(1)}
                  title="Reset View"
                >
                  <Maximize2 size={14} />
                </div>
              </div>

              {/* Legend Top Right */}
              <div className="graph-legend shadow-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> Customer
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#64748b]" /> Recipient
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" /> Device
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" /> Suspicious Node
                </span>
              </div>

              {/* SVG Graph Drawing */}
              <svg
                viewBox="0 0 920 520"
                className="w-full h-full"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center", transition: "transform 0.2s ease" }}
              >
                {/* Edges */}
                <g className="edges">
                  {networkEdges.map((edge, idx) => {
                    const sNode = networkNodes.find((n) => n.id === edge.source);
                    const tNode = networkNodes.find((n) => n.id === edge.target);
                    if (!sNode || !tNode) return null;

                    return (
                      <g key={idx}>
                        <line
                          x1={sNode.x}
                          y1={sNode.y}
                          x2={tNode.x}
                          y2={tNode.y}
                          className={edge.isHot ? "hot-edge" : undefined}
                        />
                        {edge.amount && (
                          <text
                            x={(sNode.x + tNode.x) / 2}
                            y={(sNode.y + tNode.y) / 2 - 5}
                            fill="#879b93"
                            fontSize="9"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            ৳{edge.amount.toLocaleString()}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* Nodes */}
                {networkNodes.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const nodeClass = `graph-node ${node.type} ${
                    node.risk === "Critical" ? "danger" : node.risk === "High" ? "warn" : ""
                  } ${isSelected ? "selected" : ""}`;

                  return (
                    <g
                      key={node.id}
                      className={nodeClass}
                      transform={`translate(${node.x} ${node.y})`}
                      onClick={() => handleNodeClick(node)}
                      style={{ cursor: "pointer" }}
                    >
                      <circle r={isSelected ? 28 : node.clusterId === 17 ? 24 : 20}>
                        <title>{node.label} - Risk: {node.risk}</title>
                      </circle>
                      <text textAnchor="middle" y="4">
                        {node.type === "device" ? "DEV" : node.type === "merchant" ? "M" : "U"}
                        <title>{node.label} - Risk: {node.risk}</title>
                      </text>
                      <text className="node-label" textAnchor="middle" y={isSelected ? 42 : 36}>
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom Live Hint */}
              <div className="network-hint">
                <span className="pulse" />
                <span>Interactive Graph &middot; Click any entity to inspect node telemetry</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Cluster Intelligence Panel */}
        <div className="col-span-12 lg:col-span-4 card-base cluster-panel flex flex-col justify-between border border-line p-5">
          <div>
            {/* Header */}
            <div className="cluster-head flex items-start gap-3 mb-4">
              <div className="cluster-icon w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
                <Share2 size={20} />
              </div>
              <div>
                <div className="eyebrow text-amber-500">AI-DETECTED SYNDICATE</div>
                <h3 className="section-title text-base font-bold text-ink">Suspicious Cluster #17</h3>
              </div>
            </div>

            {/* Stats Metrics */}
            <div className="cluster-stats grid grid-cols-2 gap-3 mb-4">
              <div className="bg-surfaceAlt p-2.5 rounded-xl border border-line">
                <span className="text-[10px] text-muted uppercase font-bold">TOTAL WALLETS</span>
                <b className="text-base font-bold text-ink font-mono">17 Wallets</b>
              </div>
              <div className="bg-surfaceAlt p-2.5 rounded-xl border border-line">
                <span className="text-[10px] text-muted uppercase font-bold">IDENTIFIED DEV</span>
                <b className="text-base font-bold text-ink font-mono">4 Shared</b>
              </div>
              <div className="bg-surfaceAlt p-2.5 rounded-xl border border-line">
                <span className="text-[10px] text-muted uppercase font-bold">ESTIMATED VOL</span>
                <b className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono">৳ 2.84M BDT</b>
              </div>
              <div className="bg-surfaceAlt p-2.5 rounded-xl border border-line">
                <span className="text-[10px] text-muted uppercase font-bold">SYNDICATE RISK</span>
                <b className="text-base font-bold text-rose-600 dark:text-rose-400 font-mono">92/100</b>
              </div>
            </div>

            {/* AI Graph Assessment */}
            <div className="assessment p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-4">
              <div className="flex gap-2.5">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs text-muted">
                  <span className="font-bold text-ink block mb-1">GRAPH TOPOLOGY ALERT</span>
                  Hub-and-spoke layering architecture identified. Originating funds routed through burner wallets into single liquidation merchant node (M-0081).
                  <small className="block mt-2 font-mono text-amber-600 dark:text-amber-400 font-bold">
                    &bull; Graph Centrality Degree: 8.4 (Critical)
                  </small>
                </div>
              </div>
            </div>

            {/* Selected Node Details */}
            {selectedNode && (
              <div className="p-3.5 rounded-xl bg-surfaceAlt border border-line">
                <div className="text-xs font-bold text-ink mb-1 flex items-center justify-between">
                  <span>Selected: <span className="font-mono text-amber-500">{selectedNode.id}</span></span>
                  <span className="badge badge-high">{selectedNode.risk}</span>
                </div>
                <div className="text-[11px] text-muted space-y-0.5">
                  <div>Type: <b className="text-ink capitalize">{selectedNode.type}</b></div>
                  <div>Details: {selectedNode.details || "Telemetry packet inspected by GNN model"}</div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate("investigations")}
            className="btn btn-primary w-full text-xs mt-4 flex items-center justify-center gap-2"
          >
            <span>Create Case for Cluster #17</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Network Timeline Mini Card */}
      <div className="card-base timeline-mini p-4 flex items-center gap-6 border border-line">
        <div className="w-52 shrink-0">
          <h4 className="text-xs font-bold text-ink">Network Hourly Velocity</h4>
          <span className="text-[11px] text-subtle">Transactions across cluster entities</span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="timeline-bars h-12 flex items-end gap-1">
            {[28, 45, 33, 68, 42, 84, 55, 92, 70, 38, 48, 64, 51, 30, 25, 62, 79, 95, 88, 40].map(
              (h, i) => (
                <i
                  key={i}
                  style={{ height: `${h}%` }}
                  className={h > 80 ? "hot bg-rose-500" : "bg-amber-400/80"}
                  title={`Hour ${i}: ${h} transactions`}
                />
              )
            )}
          </div>
          <div className="flex justify-between text-[10px] text-subtle font-mono pt-1">
            <span>12:00 AM</span>
            <span>06:00 AM</span>
            <span>12:00 PM</span>
            <span>06:00 PM</span>
            <span className="text-amber-500 font-bold">Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};
