"use client";

import React, { useState, useEffect } from "react";
import { NavigationPage, Transaction, InvestigationCase } from "@/types";
import { SentinelProvider, useSentinel } from "@/context/SentinelContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { OverviewView } from "@/components/overview/OverviewView";
import { TransactionMonitorView } from "@/components/transactions/TransactionMonitorView";
import { TransactionDrawer } from "@/components/transactions/TransactionDrawer";
import { RiskIntelligenceView } from "@/components/risk/RiskIntelligenceView";
import { FraudNetworkView } from "@/components/network/FraudNetworkView";
import { InvestigationsView } from "@/components/investigations/InvestigationsView";
import { InvestigationDetailView } from "@/components/investigations/InvestigationDetailView";
import { CustomerIntelligenceView } from "@/components/customers/CustomerIntelligenceView";
import { AlertCenterView } from "@/components/alerts/AlertCenterView";
import { AnalyticsView } from "@/components/analytics/AnalyticsView";
import { SimulationModal } from "@/components/simulation/SimulationModal";
import { ReportExportModal } from "@/components/report/ReportExportModal";
import { Toast } from "@/components/ui/Toast";
import { AppTour } from "@/components/ui/AppTour";

function SentinelAppShell() {
  const {
    transactions,
    alerts,
    cases,
    selectedCase,
    selectedTransaction,
    setSelectedCase,
    setSelectedTransaction,
    isStreaming,
    toggleStreaming,
    unreadAlertsCount,
    injectScenario,
  } = useSentinel();

  const [currentPage, setCurrentPage] = useState<NavigationPage>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isSimModalOpen, setIsSimModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
  };

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    setSelectedTransaction(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Background stream simulator running through unified risk engine pipeline
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(async () => {
      const locations = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna"];
      const types = ["Wallet Transfer", "Cash Out", "Merchant Pay", "Add Money", "Mobile Recharge"] as const;
      const isAnomalous = Math.random() < 0.12; // 12% probability of an anomaly

      const randomAmount = isAnomalous
        ? Math.floor(Math.random() * 45000) + 25000
        : Math.floor(Math.random() * 4000) + 500;

      const randomCustNum = Math.floor(Math.random() * 9000) + 1000;
      const randomRecipNum = Math.floor(Math.random() * 9000) + 1000;
      const randomDev = isAnomalous
        ? `DEV-${Math.floor(Math.random() * 9000) + 1000}`
        : "DEV-2211";

      const streamTxnPartial: Partial<Transaction> = {
        id: `TXN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        customer: `U-${randomCustNum}`,
        recipient: isAnomalous ? "U-8831" : `U-${randomRecipNum}`,
        amount: randomAmount,
        type: types[Math.floor(Math.random() * types.length)],
        device: randomDev,
        isNewDevice: isAnomalous,
        location: locations[Math.floor(Math.random() * locations.length)],
        isNewLocation: isAnomalous,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const resultTxn = await injectScenario(streamTxnPartial);

      if (resultTxn.riskLevel === "Critical") {
        showNotification(
          `Critical Risk Detected: ৳${resultTxn.amount.toLocaleString()} on ${resultTxn.customer} (Score: ${resultTxn.riskScore}/100)`
        );
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isStreaming, injectScenario]);

  // Inject attack / custom transaction handler from Modal or Topbar
  const handleInjectTransaction = async (txnData: Partial<Transaction>) => {
    const injected = await injectScenario(txnData);
    showNotification(
      `Injected ${injected.riskLevel} Transaction: ৳${injected.amount.toLocaleString()} (Score: ${injected.riskScore}/100)`
    );
    setSelectedTransaction(injected);
  };

  return (
    <div className="app flex min-h-screen bg-[var(--bg)]">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        unreadAlertsCount={unreadAlertsCount}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onTourClick={() => setIsTourOpen(true)}
      />

      {/* Main Shell */}
      <div className="main-shell flex-1">
        {/* Topbar */}
        <Topbar
          onOpenSimulation={() => setIsSimModalOpen(true)}
          onOpenReport={() => setIsReportModalOpen(true)}
          unreadCount={unreadAlertsCount}
          onNavigateAlerts={() => handleNavigate("alerts")}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onToggleSidebar={() => setIsSidebarOpen((o) => !o)}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((d) => !d)}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 p-5 md:p-7 max-w-[1600px] w-full mx-auto">
          {currentPage === "overview" && (
            <OverviewView
              onNavigate={handleNavigate}
              onOpenTransactionDrawer={(txn) => setSelectedTransaction(txn)}
              transactions={transactions}
              onOpenReport={() => setIsReportModalOpen(true)}
            />
          )}

          {currentPage === "transactions" && (
            <TransactionMonitorView
              transactions={transactions}
              onSelectTransaction={(txn) => setSelectedTransaction(txn)}
              isStreaming={isStreaming}
              onToggleStreaming={() => {
                toggleStreaming();
                showNotification(
                  isStreaming ? "Live simulation paused" : "Live simulation streaming resumed"
                );
              }}
              onOpenSimulation={() => setIsSimModalOpen(true)}
            />
          )}

          {currentPage === "risk" && (
            <RiskIntelligenceView
              onNavigate={handleNavigate}
              onNotify={showNotification}
            />
          )}

          {currentPage === "network" && (
            <FraudNetworkView
              onNavigate={handleNavigate}
              onOpenCase={() => handleNavigate("investigation")}
              onNotify={showNotification}
            />
          )}

          {currentPage === "investigations" && (
            <InvestigationsView
              onSelectCase={(c) => {
                setSelectedCase(c);
                handleNavigate("investigation");
              }}
              onNewCaseModal={() => {
                showNotification("New case wizard initiated. Auto-filling risk telemetry.");
                handleNavigate("investigation");
              }}
            />
          )}

          {currentPage === "investigation" && (
            <InvestigationDetailView
              caseData={selectedCase}
              onNavigate={handleNavigate}
              onNotify={showNotification}
            />
          )}

          {currentPage === "customers" && (
            <CustomerIntelligenceView
              onNavigate={handleNavigate}
              onOpenCase={() => handleNavigate("investigation")}
            />
          )}

          {currentPage === "alerts" && (
            <AlertCenterView
              onNavigate={handleNavigate}
              onOpenCase={() => handleNavigate("investigation")}
              onNotify={showNotification}
            />
          )}

          {currentPage === "analytics" && (
            <AnalyticsView
              onNavigate={handleNavigate}
              onOpenReport={() => setIsReportModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Slide-out Transaction Detail Drawer */}
      <TransactionDrawer
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onOpenInvestigation={(txn) => {
          setSelectedTransaction(null);
          const relatedCase = cases.find((c) => c.customer === txn.customer);
          if (relatedCase) setSelectedCase(relatedCase);
          handleNavigate("investigation");
          showNotification(`Opened Investigation workspace for ${txn.id}`);
        }}
      />

      {/* Simulation / Attack Injector Modal */}
      <SimulationModal
        isOpen={isSimModalOpen}
        onClose={() => setIsSimModalOpen(false)}
        onInjectTransaction={handleInjectTransaction}
      />

      {/* Export Report / Compliance Modal */}
      <ReportExportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onNotify={showNotification}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />

      {/* Onboarding / App Tour */}
      <AppTour run={isTourOpen} onFinish={() => setIsTourOpen(false)} />

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-surface border border-line rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-ink mb-4">System Settings</h3>
            <p className="text-sm text-subtle mb-6">
              Adjust AI confidence thresholds, configure notification alerts, and manage integration keys.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">AI Auto-Mitigation</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Email Notifications</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">Webhook Integration</span>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="btn btn-secondary text-sm"
              >
                Close
              </button>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="btn btn-primary text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <SentinelProvider>
      <SentinelAppShell />
    </SentinelProvider>
  );
}
