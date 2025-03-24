// app/camera-page/page.js
"use client";
import { useState } from "react";

import makeBed from "../../../public/task-assets/make-bed.jpeg";
import brushTeeth from "../../../public/task-assets/brushing-teeth.jpeg";
import drawingCrayons from "../../../public/task-assets/drawing.jpeg";
import wateringPlants from "../../../public/task-assets/watering-plants.jpeg";
import cooking from "../../../public/task-assets/cooking.jpeg";
import foodMaking from "../../../public/task-assets/food-making.jpeg";
import puzzle from "../../../public/task-assets/puzzle.jpeg";
import PhotoList from "./PhotoList";

export default function Category() {
  const [tasks, setTasks] = useState([
    {
      id: 29,
      src: puzzle,
      title: "Puzzle",
      slug: "puzzle",
      date: "Mar 10, 2025",
      category: "Puzzle",
      analysis: "A puzzle being solved.",
    },
    {
      id: 21,
      src: wateringPlants,
      title: "Watering the Plants",
      slug: "watering-plants",
      date: "Mar 10, 2025",
      category: "Gardening",
      analysis: "A watering can being used to water a plant.",
    },
    {
      id: 28,
      src: foodMaking,
      title: "Food Making",
      slug: "food-making",
      date: "Mar 10, 2025",
      category: "Cooking",
      analysis: "A child cooking with a spoon.",
    },
    {
      id: 22,
      src: drawingCrayons,
      title: "Drawing with Crayons",
      slug: "drawing-with-crayons",
      date: "Mar 12, 2025",
      category: "Art",
      analysis: "A child drawing with crayons.",
    },

    {
      id: 2,
      src: brushTeeth,
      title: "Brush Teeth",
      slug: "brush-teeth",
      date: "Mar 11, 2025",
      category: "Personal Hygiene",
      analysis: "A toothbrush and toothpaste.",
    },
  ]);

  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [analysis, setAnalysis] = useState("");
  const [cameraError, setCameraError] = useState(null);

  const startCamera = () => {
    setCameraError(null);
    setCapturedImage(null);
    setShowCamera(true);
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
      return data.analysis;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  const analyzeExistingImage = async (imageId: any) => {
    const image = tasks.find((img) => img.id === imageId);
    if (!image) return;

    setSelectedImage(image);
    setIsAnalyzing(true);

    try {
      if (image?.src) {
        setAnalysis("Cannot analyze placeholder tasks.");
      } else {
        const analysisResult = await analyzeImageWithGemini(image.src);
        setAnalysis(analysisResult);

        const updatedImages = tasks.map((img) =>
          img.id === imageId ? { ...img, analysis: analysisResult } : img
        );
        setTasks(updatedImages);
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
      <PhotoList tasks={tasks} analyzeExistingImage={analyzeExistingImage} />
    </div>
  );
}
