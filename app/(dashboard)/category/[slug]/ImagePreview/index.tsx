import { Button, Loader } from "@mantine/core";
import { X, Check } from "lucide-react";
import Image from "next/image";
import TimerLoader from "./TimeLoader";

export default function ImagePreview({
  image,
  onSave,
  onDiscard,
  isAnalyzing,
}: any) {
  const handleAnalysisComplete = () => {
    // Optional: Add any logic you want to run when analysis is complete
    console.log("Analysis completed");
  };
  return (
    <>
      {!isAnalyzing && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
            <div className="w-full h-full relative">
              <Image
                src={image}
                alt="Captured photo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 p-6 flex justify-center space-x-4">
            <Button
              variant="outline"
              color="red"
              radius="xl"
              size="lg"
              onClick={onDiscard}
              disabled={isAnalyzing}
              className="hover:bg-red-500/20 transition-all duration-300 min-w-[160px]"
              leftSection={<X size={24} />}
            >
              Discard
            </Button>

            <Button
              variant="filled"
              color="green"
              radius="xl"
              size="lg"
              onClick={onSave}
              disabled={isAnalyzing}
              className="hover:bg-green-600 transition-all duration-300 min-w-[160px]"
              leftSection={
                isAnalyzing ? <Loader size={24} /> : <Check size={24} />
              }
            >
              {isAnalyzing ? "Analyzing..." : "Start"}
            </Button>
          </div>
        </div>
      )}
      <TimerLoader
        isAnalyzing={isAnalyzing}
        totalDuration={30} // Set total analysis time to 30 seconds
        onComplete={handleAnalysisComplete}
      />
    </>
  );
}
