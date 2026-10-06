"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { STATUS, Step } from "react-joyride";

const Joyride = dynamic(() => import("react-joyride").then((mod) => mod.Joyride), { ssr: false });

interface AppTourProps {
  run: boolean;
  onFinish: () => void;
}

export const AppTour: React.FC<AppTourProps> = ({ run, onFinish }) => {
  const [steps] = useState<Step[]>([
    {
      target: "body",
      content: (
        <div>
          <h3 className="font-bold text-lg text-emerald-900 mb-2">Welcome to upay Sentinel 🛡️</h3>
          <p className="text-sm text-gray-700">
            This AI-powered intelligence platform detects and mitigates fraud in real-time. 
            Let&apos;s take a quick tour of the key features.
          </p>
        </div>
      ),
      placement: "center",
    },
    {
      target: ".nav-overview",
      content: (
        <div>
          <h3 className="font-bold text-md text-emerald-900">Overview Dashboard</h3>
          <p className="text-sm text-gray-700">Get a high-level bird&apos;s-eye view of total network health, active alerts, and real-time transaction velocities.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: ".nav-transactions",
      content: (
        <div>
          <h3 className="font-bold text-md text-emerald-900">Transaction Monitor</h3>
          <p className="text-sm text-gray-700">Watch live transactions flow through the system. Our machine learning engine scores them in milliseconds.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: ".btn-simulate",
      content: (
        <div>
          <h3 className="font-bold text-md text-emerald-900">Simulate Attack</h3>
          <p className="text-sm text-gray-700">Use this to inject a synthetic fraudulent transaction (like an Account Takeover) and watch Sentinel catch it live.</p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: ".nav-network",
      content: (
        <div>
          <h3 className="font-bold text-md text-emerald-900">Fraud Network Intelligence</h3>
          <p className="text-sm text-gray-700">Analyze topological graphs linking multiple wallets through shared devices and money mule hubs.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: ".nav-investigations",
      content: (
        <div>
          <h3 className="font-bold text-md text-emerald-900">AI Investigation Copilot</h3>
          <p className="text-sm text-gray-700">Chat with the Gemini AI Copilot to analyze case files, draft subpoenas, and get recommendations instantly.</p>
        </div>
      ),
      placement: "right",
    },
  ]);

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
        primaryColor: '#10b981', // emerald-500
        zIndex: 10000,
        showProgress: true,
        buttons: ['back', 'close', 'primary', 'skip'],
      }}
      styles={{
        tooltip: {
          borderRadius: '12px',
          padding: '20px',
        },
        buttonPrimary: {
          backgroundColor: '#059669', // emerald-600
          borderRadius: '8px',
        },
        buttonBack: {
          color: '#059669',
        }
      }}
    />
  );
};
