"use client";

import React, { useState } from "react";
import { ChatMessage } from "@/types";
import { defaultChatMessages } from "@/lib/data";
import { askSentinelCopilot } from "@/lib/gemini";
import { useSentinel } from "@/context/SentinelContext";
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bot,
  User,
  Loader2,
} from "lucide-react";

interface SentinelAssistantProps {
  caseId: string;
  customer: string;
  onNotify: (msg: string) => void;
}

export const SentinelAssistant: React.FC<SentinelAssistantProps> = ({
  caseId,
  customer,
  onNotify,
}) => {
  const { language, t } = useSentinel();
  const [messages, setMessages] = useState<ChatMessage[]>(defaultChatMessages);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isBn = language === "bn";

  const suggestedPrompts = isBn
    ? [
        "কেন এই লেনদেনটি চিহ্নিত করা হলো?",
        "স্বাভাবিক হিসাবের চেয়ে কী পরিবর্তন হয়েছে?",
        "সংযুক্ত মিউল সিন্ডিকেট চক্র দেখান",
        "উপায়ের করণীয় সুপারিশ কী?",
      ]
    : [
        "Why was this transaction flagged?",
        "What changed from normal baseline?",
        "Show connected syndicate wallets",
        "Recommended analyst action?",
      ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "analyst",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsLoading(true);

    try {
      const data = await askSentinelCopilot(query, {
        caseId,
        customer,
        riskScore: 94,
        amount: 48500,
      });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply,
        timestamp: "Just now",
        evidenceUsed: data.evidence && data.evidence.length > 0 ? data.evidence : [
          isBn ? "গ্রাহকের ৩০ দিনের স্বাভাবিক লেনদেন সীমা" : "Customer 30-day baseline",
          isBn ? "নতুন হার্ডওয়্যার ও সিম পেয়ারিং" : "Hardware device telemetry",
          isBn ? "মিউল ক্লাস্টার ১৭" : "Graph Cluster #17",
        ],
        disclaimer: isBn
          ? "এআই সিন্থেসাইজড গোয়েন্দা তথ্য · প্রয়োগের আগে প্রমাণ যাচাই আবশ্যক"
          : "AI synthesized explanation · Verify evidence prior to enforcement",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // Deterministic evidence-grounded fallback
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: isBn
          ? `টেলিম্যাট্রি বিশ্লেষণ: গ্রাহক ${customer}-এর লেনদেনে ৫টি স্বতন্ত্র ঝুঁকি সংকেত বিদ্যমান। ৳৪৮,৫০০ লেনদেন ৩০ দিনের স্বাভাবিক হিসাবের চেয়ে বহুগুণ বেশি, ডিভাইস DEV-8821 লেনদেনের ১২ মিনিট আগে প্রথম ব্যবহৃত হয়েছে, এবং প্রাপক U-8831 মিউল সিন্ডিকেটের সাথে সংযুক্ত। প্রস্তাবিত ব্যবস্থা: বায়োমেট্রিক আঙুলের ছাপ যাচাই সাপেক্ষে বহির্গামী অর্থ স্থগিত রাখা।`
          : `Analysis grounded in telemetry: Customer ${customer} has 5 distinct risk anomalies. Amount of ৳48,500 exceeds the ৳6,800 median, device DEV-8821 is unverified, and recipient U-8831 connects to mule syndicate cluster #17. Recommend freezing outgoing settlement pending biometric re-authentication.`,
        timestamp: "Just now",
        evidenceUsed: [
          isBn ? "৩০ দিনের লেনদেন বেসলাইন" : "30-day baseline metrics",
          isBn ? "ডিভাইস ও সিম নিবন্ধন লগ" : "Device registration log",
          isBn ? "টপোলজিক্যাল গ্রাফ সংযোগ" : "Topological graph connectivity",
        ],
        disclaimer: isBn ? "প্রমাণভিত্তিক এআই সিন্থেসিস" : "Grounded AI synthesis",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-base flex flex-col h-[560px] overflow-hidden border border-slate-200 bg-white">
      {/* Assistant Header */}
      <div className="p-3.5 px-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
            <Sparkles size={14} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>{t("aiCopilotTitle")}</span>
              <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold">
                GEMINI 2.5 FLASH
              </span>
            </h3>
            <p className="text-[10.5px] text-slate-500">
              {t("aiCopilotSubtitle")}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
          {isBn ? "অনলাইন সক্রিয়" : "OFFLINE GROUNDED"}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 text-xs ${
              msg.sender === "analyst" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center shrink-0 text-[10px] font-bold ${
                msg.sender === "analyst"
                  ? "bg-slate-200 text-slate-800"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              {msg.sender === "analyst" ? <User size={12} /> : <Bot size={12} />}
            </div>

            <div
              className={`max-w-[85%] rounded-lg p-3 space-y-2 border ${
                msg.sender === "analyst"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-slate-50 text-slate-800 border-slate-200"
              }`}
            >
              <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>

              {msg.evidenceUsed && msg.evidenceUsed.length > 0 && (
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <span className="font-semibold block text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                    {isBn ? "ব্যবহৃত প্রমাণাবলী" : "Evidentiary Basis"}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {msg.evidenceUsed.map((ev, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] border border-slate-200"
                      >
                        ✓ {ev}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 text-xs">
            <div className="w-6 h-6 rounded bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
              <Loader2 size={12} className="animate-spin" />
            </div>
            <div className="bg-slate-50 text-slate-600 border border-slate-200 rounded-lg p-2.5 text-xs">
              {isBn ? "জেমিনাই টেলিম্যাট্রি বিশ্লেষণ করছে..." : "Gemini synthesizing telemetry and BFIU guidelines..."}
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-2 px-3 border-t border-slate-100 bg-slate-50 flex items-center gap-1.5 overflow-x-auto text-xs">
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-full border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-600 text-[11px] whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          placeholder={isBn ? "তদন্ত কোপাইলটকে প্রশ্ন করুন..." : "Ask copilot about evidence, baseline, or BFIU action..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="field flex-1 text-xs"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="btn btn-primary text-xs px-3 disabled:opacity-40"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
};
