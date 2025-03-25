import type { Metadata } from "next";
import Header from "./common/Header";
import Navigation from "./common/Navigation";
import { Suspense } from "react";
import { Loader } from "@mantine/core";

export const metadata: Metadata = {
  title: "StepWise",
  description:
    "Empowering independence through AI-guided task assistance for individuals with cognitive disabilities.",
  icons: {
    icon: "/stepwise-logo.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  manifest: "/manifest.json",
  themeColor: "#228be6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[675px]">
      <Suspense fallback={<Loader />}>
        <Header />
        {children}
      </Suspense>
    </div>
  );
}
