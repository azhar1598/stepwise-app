import type { Metadata } from "next";
import Header from "./common/Header";
import Navigation from "./common/Navigation";

export const metadata: Metadata = {
  title: "StepWise",
  description:
    "Empowering independence through AI-guided task assistance for individuals with cognitive disabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[675px]">
      <Header />
      {children}
    </div>
  );
}
