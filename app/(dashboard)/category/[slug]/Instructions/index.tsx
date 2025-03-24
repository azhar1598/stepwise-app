import React, { useState, useEffect, useCallback, useRef } from "react";
import { Play, X, Volume2, Square, ChevronDown, ChevronUp } from "lucide-react";
import { Select } from "@mantine/core";
import { pauseOptions } from "@/app/(dashboard)/constants";

export default function Instructions({ currentImage, onClose, steps }: any) {
  const [activeStep, setActiveStep] = useState<any>(null);
  const [expandedStep, setExpandedStep] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLoading, setAudioLoading] = useState<any>({});
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [pauseBetweenSteps, setPauseBetweenSteps] = useState(1000); // 1 second pause

  // Use refs to manage the queue state to avoid closure issues
  const queueRef: any = useRef([]);
  const isPlayingRef: any = useRef(false);
  const pauseTimerRef: any = useRef(null);

  // Format the steps data if it's not in the expected format
  const formattedSteps = React.useMemo(() => {
    if (!steps) return [];

    // If steps is already an array of objects with id and description
    if (
      Array.isArray(steps) &&
      steps.length > 0 &&
      typeof steps[0] === "object" &&
      steps[0].id
    ) {
      return steps;
    }

    // If steps is an array of strings
    if (Array.isArray(steps)) {
      return steps.map((step, index) => ({
        id: index + 1,
        description: typeof step === "string" ? step : JSON.stringify(step),
      }));
    }

    // If steps is a string, split by periods and make steps
    if (typeof steps === "string") {
      return steps
        .split(".")
        .filter((step) => step.trim().length > 0)
        .map((step, index) => ({
          id: index + 1,
          description: step.trim(),
        }));
    }

    return [];
  }, [steps]);

  // For text-to-speech using browser API
  const speakText = useCallback((text: any, stepId: any) => {
    return new Promise((resolve, reject) => {
      setAudioLoading((prev: any) => ({ ...prev, [stepId]: true }));

      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Create utterance
        const utterance = new SpeechSynthesisUtterance(text);

        // Get available voices and choose a good English one if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find(
            (voice) => voice.lang === "en-US" && voice.name.includes("Female")
          ) ||
          voices.find((voice) => voice.lang === "en-US") ||
          voices[0];

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        // Set properties
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Set up event handlers
        setActiveStep(stepId);
        setIsSpeaking(true);

        utterance.onend = () => {
          setAudioLoading((prev: any) => ({ ...prev, [stepId]: false }));
          resolve(void 0);
        };

        utterance.onerror = (error: any) => {
          setAudioLoading((prev: any) => ({ ...prev, [stepId]: false }));
          reject(error);
        };

        // Start speaking
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Error with text-to-speech:", error);
        setAudioLoading((prev: any) => ({ ...prev, [stepId]: false }));
        reject(error);
      }
    });
  }, []);

  const stopSpeaking = useCallback(() => {
    // Cancel speech synthesis
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Clear any pending timers
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    // Reset all state
    setActiveStep(null);
    setIsSpeaking(false);
    setIsPlayingAll(false);

    // Reset refs
    queueRef.current = [];
    isPlayingRef.current = false;
  }, []);

  const playNextInQueue = useCallback(async () => {
    // If queue is empty or we're not in playing mode, stop
    if (queueRef.current.length === 0 || !isPlayingRef.current) {
      setIsPlayingAll(false);
      setActiveStep(null);
      setIsSpeaking(false);
      isPlayingRef.current = false;
      return;
    }

    // Get the next step from the queue
    const nextStepId = queueRef.current.shift();
    const step = formattedSteps.find((s) => s.id === nextStepId);

    if (!step) {
      // If step not found, move to the next one
      playNextInQueue();
      return;
    }

    try {
      // Speak the text for this step
      await speakText(step.description, step.id);

      // If queue is not empty and we're still in play mode, schedule the next step
      if (queueRef.current.length > 0 && isPlayingRef.current) {
        pauseTimerRef.current = setTimeout(() => {
          if (isPlayingRef.current) {
            playNextInQueue();
          }
        }, pauseBetweenSteps);
      } else {
        // End of queue or stopped playing
        setIsPlayingAll(false);
        setActiveStep(null);
        setIsSpeaking(false);
        isPlayingRef.current = false;
      }
    } catch (error) {
      console.error("Error playing step:", error);
      // Try to continue with the next step
      playNextInQueue();
    }
  }, [formattedSteps, speakText, pauseBetweenSteps]);

  // Play single step
  const playSingleStep = useCallback(
    (stepId: any) => {
      stopSpeaking();
      const step = formattedSteps.find((s) => s.id === stepId);
      if (step) {
        speakText(step.description, step.id);
      }
    },
    [formattedSteps, speakText, stopSpeaking]
  );

  // Play all steps from a specific step
  const playAllSteps = useCallback(
    (startStepId = null) => {
      // Stop any current playback
      stopSpeaking();

      // Get the index to start from
      let startIndex = 0;
      if (startStepId !== null) {
        const index = formattedSteps.findIndex((s) => s.id === startStepId);
        startIndex = index !== -1 ? index : 0;
      }

      // Create queue of steps to play
      queueRef.current = formattedSteps
        .slice(startIndex)
        .map((step) => step.id);

      // Set playing state
      setIsPlayingAll(true);
      isPlayingRef.current = true;

      // Start playing
      playNextInQueue();
    },
    [formattedSteps, stopSpeaking, playNextInQueue]
  );

  useEffect(() => {
    // Load voices when component mounts
    const loadVoices = () => window.speechSynthesis.getVoices();

    // Some browsers need this event
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices(); // Initial load attempt
    }

    // Clean up when component unmounts
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (currentImage) {
      setExpandedStep(parseInt(currentImage));
    }
  }, [currentImage]);

  const StepCard = ({ step }: any) => {
    const isActive = currentImage?.toString() === step.id.toString();
    const isPlaying = activeStep === step.id;
    const isExpanded = expandedStep === step.id;
    const isLoading = audioLoading[step.id];

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

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isPlaying || isPlayingAll) {
                    stopSpeaking();
                  } else {
                    playSingleStep(step.id);
                  }
                }}
                className={`p-2 rounded-full transition-all ${
                  isPlaying
                    ? "bg-blue-500 text-white"
                    : isLoading
                    ? "bg-gray-300 text-gray-500"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                disabled={isLoading}
                aria-label={`${isPlaying ? "Stop" : "Play"} audio for step ${
                  step.id
                }`}
              >
                {isPlaying && isPlayingRef.current ? (
                  <Square size={16} />
                ) : isLoading ? (
                  <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play size={18} />
                )}
              </button>

              {/* {!isPlayingAll && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAllSteps(step.id);
                  }}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  aria-label={`Play all from step ${step.id}`}
                >
                  <Play size={18} className="text-blue-500" />
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-blue-50 px-2 py-6 rounded-xl shadow-xl max-w-md w-full border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2">
            <Volume2 size={20} />
          </span>
          Instructions
        </h2>
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close instructions"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => (isPlayingAll ? stopSpeaking() : playAllSteps())}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
            isPlayingAll
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isPlayingAll ? (
            <>
              <Square size={16} />
              Stop
            </>
          ) : (
            <>
              <Play size={16} />
              Play All
            </>
          )}
        </button>

        <div className="flex items-center gap-2 ">
          {/* <button
            onClick={() =>
              setPauseBetweenSteps((prev) => Math.max(500, prev - 500))
            }
            className="p-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
            disabled={pauseBetweenSteps <= 500}
            aria-label="Decrease pause between steps"
          >
            <ChevronDown size={16} />
          </button>
          <span className="text-sm text-gray-600">
            {pauseBetweenSteps / 1000}s pause
          </span>
          <button
            onClick={() =>
              setPauseBetweenSteps((prev) => Math.min(5000, prev + 500))
            }
            className="p-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
            disabled={pauseBetweenSteps >= 5000}
            aria-label="Increase pause between steps"
          >
            <ChevronUp size={16} />
          </button> */}

          <Select
            // label="Pause Duration"
            w={100}
            data={pauseOptions}
            value={pauseBetweenSteps.toString()}
            onChange={(value) => setPauseBetweenSteps(Number(value))}
          />
        </div>
      </div>

      {formattedSteps.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto  custom-scrollbar">
          {formattedSteps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          No instructions available
        </div>
      )}

      {/* <div className="mt-6 pt-4 border-t border-gray-100">
        <button
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-md font-medium flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          onClick={onClose}
        >
          Try New Image
        </button>
      </div> */}

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
