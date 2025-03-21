import { useState } from "react";
import { Button, Card, Text } from "@mantine/core";
import { Camera, X, Check, RefreshCw } from "lucide-react";

export default function CameraCapture() {
  const [captureMode, setCaptureMode] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(false);

  const startCapture = () => {
    setCaptureMode(true);
    // In a real app, this would activate the device camera
  };

  const cancelCapture = () => {
    setCaptureMode(false);
    setImageCaptured(false);
  };

  const takePhoto = () => {
    // In a real app, this would actually capture a photo
    setImageCaptured(true);
  };

  const analyzeImage = () => {
    // In a real app, this would send the image for AI analysis
    alert("Analyzing image with AI...");
    setCaptureMode(false);
    setImageCaptured(false);
  };

  return (
    <Card shadow="sm" p="lg" className="relative">
      {!captureMode ? (
        <div className="text-center py-8">
          <Camera size={48} className="mx-auto text-gray-400 mb-4" />
          <Text className="mb-6">
            Need help with this step? Take a picture and let AI guide you.
          </Text>
          <Button
            onClick={startCapture}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Activate Camera
          </Button>
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              {!imageCaptured ? (
                <Text className="text-gray-500">Camera preview</Text>
              ) : (
                <img
                  src="/api/placeholder/640/360"
                  alt="Captured"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            <Button
              onClick={cancelCapture}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full"
              size="sm"
              variant="subtle"
            >
              <X size={16} className="text-white" />
            </Button>
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            {!imageCaptured ? (
              <Button
                onClick={takePhoto}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Take Photo
              </Button>
            ) : (
              <>
                <Button
                  leftIcon={<RefreshCw size={16} />}
                  variant="outline"
                  onClick={() => setImageCaptured(false)}
                >
                  Retake
                </Button>
                <Button
                  leftIcon={<Check size={16} />}
                  onClick={analyzeImage}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Use This Photo
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
