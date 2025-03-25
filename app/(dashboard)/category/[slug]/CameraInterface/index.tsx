import React, { useState, useRef, useCallback, useEffect } from "react";
import { ActionIcon } from "@mantine/core";
import { Camera, X, CameraOff } from "lucide-react";
import Webcam from "react-webcam";

export default function AdvancedCameraInterface({
  onCapture,
  onCancel,
  onStore,
  cameraError,
  setCameraError,
}: any) {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [zoomLevel, setZoomLevel] = useState(1);

  const videoConstraints: any = {
    facingMode: facingMode,
    advanced: [{ zoom: zoomLevel }],
  };

  const takePhoto = useCallback(() => {
    if (!webcamRef.current) {
      console.error("Webcam reference is null");
      return;
    }

    try {
      const imageSrc = webcamRef.current?.getScreenshot();
      onCapture(imageSrc);
      onStore(imageSrc);
      onCancel();
    } catch (err: any) {
      console.error("Error capturing photo:", err);
      setCameraError(`Error capturing photo: ${err.message}`);
    }
  }, [webcamRef, onCapture, onStore, onCancel, setCameraError]);

  // Zoom handling
  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in") {
      setZoomLevel(Math.min(10, zoomLevel + 1));
    } else {
      setZoomLevel(Math.max(1, zoomLevel - 1));
    }
  };

  // Toggle between front and back cameras
  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Camera View */}
      <div className="relative flex-1 overflow-hidden">
        <Webcam
          key={facingMode}
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <ActionIcon
            variant="filled"
            color="gray"
            onClick={onCancel}
            aria-label="Close Camera"
            className="bg-white/50 backdrop-blur-sm"
          >
            <X size={24} />
          </ActionIcon>
        </div>
      </div>

      {/* Bottom Control Panel */}
      <div className="bg-white/90 backdrop-blur-md p-4 pb-6 rounded-t-3xl shadow-2xl">
        {/* Camera Selection */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={toggleCamera}
            className={`px-4 py-2 rounded-full text-sm ${
              facingMode === "environment"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Rear Camera
          </button>
          <button
            onClick={toggleCamera}
            className={`px-4 py-2 rounded-full text-sm ${
              facingMode === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Front Camera
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => handleZoom("out")}
            className="bg-gray-200 p-2 rounded-full"
          >
            -
          </button>
          <div className="self-center">Zoom: {zoomLevel}x</div>
          <button
            onClick={() => handleZoom("in")}
            className="bg-gray-200 p-2 rounded-full"
          >
            +
          </button>
        </div>

        {/* Capture Button */}
        <div className="flex justify-center">
          <button
            onClick={takePhoto}
            className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <div className="w-16 h-16 rounded-full border-2 border-white"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
