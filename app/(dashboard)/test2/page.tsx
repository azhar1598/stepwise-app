// app/camera-page/page.js
"use client";
import { useState } from "react";

import makeBed from "../../../public/task-assets/make-bed.jpeg";
import PhotoList from "./PhotoList";

export default function CameraPage() {
  const [images, setImages] = useState([
    {
      id: 1,
      src: makeBed,
      title: "Make the Bed",
      date: "Mar 10, 2025",
      category: "Home Tasks",
      analysis: "A bed with a blanket and pillows.",
    },
    {
      id: 2,
      src: "/api/placeholder/400/300",
      title: "Buy Groceries",
      date: "Mar 12, 2025",
      category: "Shopping",
      analysis: null,
    },
    {
      id: 3,
      src: "/api/placeholder/400/300",
      title: "Use the Stove",
      date: "Mar 14, 2025",
      category: "Cooking & Eating",
      analysis: null,
    },
    {
      id: 4,
      src: "/api/placeholder/400/300",
      title: "Brush Teeth",
      date: "Mar 15, 2025",
      category: "Taking Care of Myself",
      analysis: "A toothbrush and toothpaste.",
    },
    {
      id: 5,
      src: "/api/placeholder/400/300",
      title: "Lock the Door",
      date: "Mar 20, 2025",
      category: "Staying Safe",
      analysis: "A key in a door lock.",
    },
    {
      id: 6,
      src: "/api/placeholder/400/300",
      title: "Take the Bus",
      date: "Mar 19, 2025",
      category: "Going Out",
      analysis: "A person waiting for the bus.",
    },
  ]);

  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [cameraError, setCameraError] = useState(null);

  const startCamera = () => {
    setCameraError(null);
    setCapturedImage(null);
    setShowCamera(true);
  };

  const analyzeImageWithGemini = async (imageData) => {
    const base64Data = imageData.split(",")[1];

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Data,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.analysis;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  const analyzeExistingImage = async (imageId) => {
    const image = images.find((img) => img.id === imageId);
    if (!image) return;

    setSelectedImage(image);
    setIsAnalyzing(true);

    try {
      if (image.src.includes("/api/placeholder")) {
        setAnalysis("Cannot analyze placeholder images.");
      } else {
        const analysisResult = await analyzeImageWithGemini(image.src);
        setAnalysis(analysisResult);

        const updatedImages = images.map((img) =>
          img.id === imageId ? { ...img, analysis: analysisResult } : img
        );
        setImages(updatedImages);
      }
    } catch (error) {
      setAnalysis("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const closeAnalysis = () => {
    setSelectedImage(null);
    setAnalysis("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PhotoList images={images} analyzeExistingImage={analyzeExistingImage} />
    </div>
  );
}
