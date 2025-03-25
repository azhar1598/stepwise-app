import React, { useState, useEffect, useRef } from "react";
import Lottie from "react-lottie-player";
import animationData from "../../../../../../public/clock-loader.json";

export default function TimerLoader({
  isAnalyzing,
  totalDuration = 30,
  onComplete,
}: {
  isAnalyzing: boolean;
  totalDuration?: number;
  onComplete?: () => void;
}) {
  if (!isAnalyzing) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      play
      style={{ width: "100%", height: "100%" }}
      speed={1.5}
    />
  );
}
