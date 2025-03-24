// app/camera-page/components/CameraInterface.js
import { useRef } from "react";
import { Button } from "@mantine/core";
import Webcam from "react-webcam";

export default function CameraInterface({
  onCapture,
  onCancel,
  onStore,
  cameraError,
  setCameraError,
}: any) {
  const webcamRef: any = useRef(null);

  const takePhoto = () => {
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
  };

  const handleWebcamError = (error: any) => {
    console.error("Webcam error:", error);
    setCameraError(`Camera access error: ${error.message || "Unknown error"}`);
  };

  const CameraFallback = () => {
    const fileInputRef: any = useRef(null);

    const openFilePicker = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileSelect = (e: any) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          onCapture(event.target?.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-4">{cameraError}</p>
        <p className="mb-4">Try using your device's camera instead:</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button onClick={openFilePicker}>Open Camera</Button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-20 flex flex-col">
      <div className="flex-1 relative">
        {cameraError ? (
          <CameraFallback />
        ) : (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
            }}
            onUserMediaError={handleWebcamError}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="bg-black p-6 flex justify-center">
        <Button
          size="xl"
          radius="xl"
          className="bg-white text-black hover:bg-gray-200 w-16 h-16 p-0"
          onClick={takePhoto}
          disabled={!!cameraError}
        >
          <div className="w-12 h-12 rounded-full border-2 border-black"></div>
        </Button>
      </div>
      <div className="bg-black p-2 flex justify-end">
        <Button variant="subtle" color="red" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
