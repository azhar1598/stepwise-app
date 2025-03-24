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

  const [storeImage, setStoreImage] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [cameraError, setCameraError] = useState(null);

  const [currentImage, setCurrentImage] = useState([]);
  const [instructions, setInstructions] = useState([]);

  console.log;

  const startCamera = () => {
    setCameraError(null);
    setCapturedImage(null);
    setShowCamera(true);
  };

  const stopCamera = () => {
    setShowCamera(false);
  };

  const savePhoto = async (capturedImage: any) => {
    if (capturedImage) {
      setIsAnalyzing(true);

      let analysisResult = null;
      try {
        analysisResult = await analyzeImageWithGemini(capturedImage);
        setCapturedImage(null);
        setInstructions(analysisResult);
      } catch (error) {
        console.error("Error analyzing image:", error);
        analysisResult = "Analysis failed. Please try again.";
      }
      console.log("analysisResult---->", analysisResult);
      const newImage = {
        src: capturedImage,
        title: `Photo`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        analysis: analysisResult,
      };

      setCurrentImage(newImage.analysis);
      closeAnalysis();
      setShowCamera(false);

      setIsAnalyzing(false);
    }
  };

  const analyzeImageWithGemini = async (imageData: any) => {
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
          src={
            storeImage ||
            categories.find((cat) => cat.slug === slug)?.src ||
            makeBed
          }
          alt={"Photo Here"}
          fill
          style={{
            objectFit: "cover",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "10px",
          }}
        />
      </div>
      {!showCamera && !capturedImage && (
        <CameraButton startCamera={startCamera} />
      )}

      {showCamera && (
        <CameraInterface
          onCapture={setCapturedImage}
          onStore={setStoreImage}
          onCancel={stopCamera}
          cameraError={cameraError}
          setCameraError={setCameraError}
        />
      )}

      {!showCamera && capturedImage && (
        <ImagePreview
          image={capturedImage}
          onSave={() => savePhoto(capturedImage)}
          onDiscard={() => setCapturedImage(null)}
          isAnalyzing={isAnalyzing}
        />
      )}

      {/* {selectedImage && (
        <AnalysisModal
          image={selectedImage}
          analysis={analysis}
          isAnalyzing={isAnalyzing}
          onClose={closeAnalysis}
        />
      )} */}
      {instructions.length > 0 && (
        <Instructions
          steps={instructions}
          currentImage={currentImage}
          onClose={closeAnalysis}
        />
      )}
    </div>
  );
}
