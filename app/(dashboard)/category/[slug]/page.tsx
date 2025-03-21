"use client";
import { useState } from "react";

import makeBed from "../../../../public/task-assets/make-bed.jpeg";
import ImagePreview from "./ImagePreview";
import CameraButton from "./CameraButton";
import CameraInterface from "./CameraInterface";
import AnalysisModal from "./AnalysisModal";
import { useParams } from "next/navigation";
import { categories } from "../../constants";
import Image from "next/image";
import Instructions from "./Instructions";

export default function Category() {
  const { slug } = useParams();

  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [cameraError, setCameraError] = useState(null);

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

  const [currentImage, setCurrentImage] = useState([]);

  const startCamera = () => {
    setCameraError(null);
    setCapturedImage(null);
    setShowCamera(true);
  };

  const stopCamera = () => {
    setShowCamera(false);
  };

  const savePhoto = async (capturedImage) => {
    if (capturedImage) {
      setIsAnalyzing(true);

      const newId =
        images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1;

      let analysisResult = null;
      try {
        analysisResult = await analyzeImageWithGemini(capturedImage);
      } catch (error) {
        console.error("Error analyzing image:", error);
        analysisResult = "Analysis failed. Please try again.";
      }
      console.log("analysisResult---->", analysisResult);
      const newImage = {
        id: newId,
        src: capturedImage,
        title: `Photo ${newId}`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        analysis: analysisResult,
      };
      setCurrentImage(newImage.analysis);

      setImages([newImage, ...images]);
      setCapturedImage(null);
      setIsAnalyzing(false);
    }
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
      //   console.log("datayellow---->", data);
      return data;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  const closeAnalysis = () => {
    setSelectedImage(null);
    setAnalysis("");
  };

  console.log(
    "category----->",
    categories.find((cat) => cat.slug === slug)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="aspect-video relative">
        <Image
          src={categories.find((cat) => cat.slug === slug)?.image}
          alt={categories.find((cat) => cat.slug === slug)?.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      {!showCamera && !capturedImage && (
        <CameraButton startCamera={startCamera} />
      )}

      {showCamera && (
        <CameraInterface
          onCapture={setCapturedImage}
          onCancel={stopCamera}
          cameraError={cameraError}
          setCameraError={setCameraError}
        />
      )}

      {capturedImage && !showCamera && (
        <ImagePreview
          image={capturedImage}
          onSave={() => savePhoto(capturedImage)}
          onDiscard={() => setCapturedImage(null)}
          isAnalyzing={isAnalyzing}
        />
      )}

      {selectedImage && (
        <AnalysisModal
          image={selectedImage}
          analysis={analysis}
          isAnalyzing={isAnalyzing}
          onClose={closeAnalysis}
        />
      )}
      <Instructions
        steps={currentImage}
        currentImage={currentImage}
        onClose={closeAnalysis}
      />
    </div>
  );
}
