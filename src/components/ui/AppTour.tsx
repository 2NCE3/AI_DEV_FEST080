"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { STATUS, Step } from "react-joyride";
import { useSentinel } from "@/context/SentinelContext";

const Joyride = dynamic(() => import("react-joyride").then((mod) => mod.Joyride), { ssr: false });

interface AppTourProps {
  run: boolean;
  onFinish: () => void;
}

export const AppTour: React.FC<AppTourProps> = ({ run, onFinish }) => {
  const { language } = useSentinel();

  const steps = useMemo<Step[]>(() => {
    if (language === "bn") {
      return [
        {
          target: "body",
          content: (
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">upay Sentinel-এ স্বাগতম 🛡️</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                বাংলাদেশের মোবাইল ফাইন্যান্সিয়াল সার্ভিস (MFS)-এর জন্য নির্মিত রিয়েল-টাইম এআই সুরক্ষা ও ঝুঁকি প্ল্যাটফর্ম। চলুন প্রধান মডিউলগুলো পরিদর্শন করি।
              </p>
            </div>
          ),
          placement: "center",
        },
        {
          target: ".nav-overview",
          content: (
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">প্রধান ড্যাশবোর্ড ও ৮টি বিভাগীয় ফান্ড ফ্লো</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                বাংলাদেশ ম্যাপের মাধ্যমে বিভাগীয় লেনদেনের ভলিউম, টিপিএস এবং ৫টি লাইভ আক্রমণ সিমুলেশন দেখুন।
              </p>
            </div>
          ),
          placement: "right",
        },
        {
          target: ".nav-transactions",
          content: (
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">রিয়েল-টাইম লেনদেন নজরদারি</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্রতিটি ওয়ালেট লেনদেন ২ মিলিসেকেন্ডের মধ্যে রিস্ক ইঞ্জিন দ্বারা মূল্যায়িত হয়।
              </p>
            </div>
          ),
          placement: "right",
        },
        {
          target: ".btn-simulate",
          content: (
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">আক্রমণ সিমুলেশন ল্যাব</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                অ্যাকাউন্ট টেকওভার, সিম সোয়াপ এবং মানি মিউল সিন্ডিকেট আক্রমণ ইনজেক্ট করে ইঞ্জিনের প্রতিক্রিয়া দেখুন।
              </p>
            </div>
          ),
          placement: "bottom",
        },
        {
          target: ".nav-network",
          content: (
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">টাকাপাচার ও মিউল নেটওয়ার্ক গ্রাফ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ভুক্তভোগীর ওয়ালেট থেকে এজেন্ট পয়েন্ট হয়ে হুন্ডি সিন্ডিকেটে অর্থ প্রবাহের ২ডি ইন্টারেক্টিভ ম্যাপ।
              </p>
            </div>
          ),
          placement: "right",
        },
        {
          target: ".nav-investigations",
          content: (
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">এআই তদন্ত ও বিএফআইইউ কমপ্লায়েন্স</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                TreeSHAP ব্যাখ্যাযোগ্যতা ও জেমিনি কো-পাইলটের সহায়তায় তাৎক্ষণিক ওয়ালেট ফ্রিজ ও বিএফআইইউ রিপোর্ট তৈরি করুন।
              </p>
            </div>
          ),
          placement: "right",
        },
      ];
    }

    return [
      {
        target: "body",
        content: (
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-1">Welcome to upay Sentinel 🛡️</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enterprise Trust & Risk Intelligence platform protecting Bangladesh&apos;s MFS ecosystem in real time. Let&apos;s tour the primary operational surfaces.
            </p>
          </div>
        ),
        placement: "center",
      },
      {
        target: ".nav-overview",
        content: (
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-1">Executive Overview & 2D Geo Flow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time division fund flows across all 8 Bangladesh administrative divisions and 1-click MFS attack simulations.
            </p>
          </div>
        ),
        placement: "right",
      },
      {
        target: ".nav-transactions",
        content: (
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-1">Transaction Stream Monitor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect live MFS wallet transactions scored under 2ms by our 12-factor hybrid deterministic risk engine.
            </p>
          </div>
        ),
        placement: "right",
      },
      {
        target: ".btn-simulate",
        content: (
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-1">Risk Scenario Simulation Lab</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inject synthetic MFS attack vectors (Account Takeover, SIM Swap Cooling, Mule Structuring) to evaluate engine response live.
            </p>
          </div>
        ),
        placement: "bottom",
      },
      {
        target: ".nav-network",
        content: (
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-1">Mule Syndicate & Money Trail</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive 2D graph revealing fund movements from victim wallets through rogue agent POS to underground hubs.
            </p>
          </div>
        ),
        placement: "right",
      },
      {
        target: ".nav-investigations",
        content: (
          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-1">AI Analyst Workstation & BFIU</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review prioritized case dossiers, examine TreeSHAP attributions, and collaborate with the Gemini Risk Copilot.
            </p>
          </div>
        ),
        placement: "right",
      },
    ];
  }, [language]);

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      onFinish();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      onEvent={handleJoyrideCallback}
      options={{
        primaryColor: '#059669',
        zIndex: 10000,
        showProgress: true,
        buttons: ['back', 'close', 'primary', 'skip'],
      }}
      styles={{
        overlay: {
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
        },
        tooltip: {
          borderRadius: '12px',
          padding: '16px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          border: '1px solid #E2E8F0',
          boxShadow: 'none',
        },
        tooltipContent: {
          padding: '0 0 12px 0',
        },
        buttonPrimary: {
          backgroundColor: '#059669',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: 600,
          padding: '6px 14px',
          color: '#FFFFFF',
          boxShadow: 'none',
        },
        buttonBack: {
          color: '#64748B',
          fontSize: '12px',
          fontWeight: 500,
          marginRight: '8px',
        },
        buttonSkip: {
          color: '#94A3B8',
          fontSize: '12px',
        },
        buttonClose: {
          color: '#64748B',
        },
      }}
    />
  );
};
