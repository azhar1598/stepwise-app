import React, { useState, useRef, useEffect } from "react";
import { Play, X, Volume2 } from "lucide-react";

export default function Instructions({ currentImage, onClose, steps }) {
  console.log("currentImage---->", currentImage);
  const [activeStep, setActiveStep] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const audioRef = useRef(null);

  //   const steps = [
  //     {
  //       id: 1,
  //       description: "Clean your hands before you start",
  //       audioUrl: "/audio/clean-hands.mp3",
  //     },
  //     {
  //       id: 2,
  //       description: "Open the fridge",
  //       audioUrl: "/audio/open-fridge.mp3",
  //     },
  //     {
  //       id: 3,
  //       description: "Take out the milk",
  //       audioUrl: "/audio/take-out-milk.mp3",
  //     },
  //     {
  //       id: 4,
  //       description: "Pour the milk in the cup",
  //       audioUrl: "/audio/put-milk-in-cup.mp3",
  //     },
  //     { id: 5, description: "Drink the milk", audioUrl: "/audio/drink-milk.mp3" },
  //     { id: 6, description: "Clean the cup", audioUrl: "/audio/clean-cup.mp3" },
  //     {
  //       id: 7,
  //       description: "Put the cup in the sink",
  //       audioUrl: "/audio/put-cup-in-sink.mp3",
  //     },
  //     {
  //       id: 8,
  //       description: "Wash your hands",
  //       audioUrl: "/audio/wash-hands.mp3",
  //     },
  //   ];

  useEffect(() => {
    if (currentImage) {
      setExpandedStep(parseInt(currentImage));
    }
  }, [currentImage]);

  const playAudio = (stepId) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setActiveStep(stepId);
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    audioRef.current = new Audio(step.audioUrl);
    audioRef.current.onended = () => setActiveStep(null);
    audioRef.current.play();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setActiveStep(null);
    }
  };

  const StepCard = ({ step }) => {
    const isActive = currentImage?.toString() === step.id.toString();
    const isPlaying = activeStep === step.id;
    const isExpanded = expandedStep === step.id;

    return (
      <div
        className={`rounded-xl transition-all duration-300 overflow-hidden ${
          isExpanded ? "shadow-md" : "shadow-sm"
        } ${isActive ? "border-2 border-blue-500" : "border border-gray-100"}`}
      >
        <div
          className={`p-4 cursor-pointer ${
            isActive
              ? "bg-gradient-to-r from-blue-50 to-blue-100"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => setExpandedStep(isExpanded ? null : step.id)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-full text-lg font-semibold transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {step.id}
            </div>

            <div className="flex-1">
              <p
                className={`font-medium ${
                  isActive ? "text-blue-700" : "text-gray-800"
                }`}
              >
                {step.description}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                isPlaying ? stopAudio() : playAudio(step.id);
              }}
              className={`p-2 rounded-full transition-all ${
                isPlaying
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-label={`${isPlaying ? "Stop" : "Play"} audio for step ${
                step.id
              }`}
            >
              {isPlaying ? <Volume2 size={18} /> : <Play size={18} />}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          {/* <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2">
            <Volume2 size={20} />
          </span> */}
          Instructions
        </h2>
        {/* <button
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close instructions"
        >
          <X size={20} />
        </button> */}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {steps?.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-md font-medium flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          onClick={onClose}
        >
          Close Instructions
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5d5e6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a3b8cc;
        }
      `}</style>
    </div>
  );
}
