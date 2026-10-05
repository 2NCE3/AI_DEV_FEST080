import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "upay Sentinel | AI Fraud & Scam Intelligence Platform",
  description:
    "Next-generation AI-powered Trust & Risk Intelligence platform for digital financial services. Built for the DIU CPC × upay AI Hackathon 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#f5f8f6] text-[#17231f]">{children}</body>
    </html>
  );
}
