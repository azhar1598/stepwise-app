"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

function Page() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/category");
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/10 animate-pulse"></div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <AlertCircle
          className="mb-6 text-white/80 animate-bounce"
          size={64}
          strokeWidth={1.5}
        />

        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight transform transition-all duration-500 hover:scale-105">
          Preparing Your Experience
        </h1>

        <p className="text-xl md:text-2xl text-center max-w-2xl opacity-80 mb-8">
          Your personalized journey is loading. We're getting everything ready
          for you!
        </p>

        <div className="flex items-center space-x-4">
          <div className="w-4 h-4 bg-white/50 rounded-full animate-ping"></div>
          <div className="w-4 h-4 bg-white/50 rounded-full animate-ping delay-500"></div>
        </div>

        <div className="mt-6 text-sm opacity-70">
          Redirecting in 3 seconds...
        </div>
      </div>
    </main>
  );
}

export default Page;
