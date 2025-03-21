// app/camera-page/components/AnalysisModal.js
import { Button, Text, Loader } from "@mantine/core";
import Image from "next/image";

export default function AnalysisModal({
  image,
  analysis,
  isAnalyzing,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b">
          <Text size="lg" fw={600}>
            Image Analysis
          </Text>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader size="lg" />
              <Text size="md" mt={3}>
                Analyzing image with Gemini AI...
              </Text>
            </div>
          ) : (
            <>
              <div className="aspect-video relative mb-4">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <Text size="md" fw={500}>
                Analysis:
              </Text>
              <Text size="md" mt={2}>
                {analysis}
              </Text>
            </>
          )}
        </div>
        <div className="p-4 border-t">
          <Button fullWidth onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
