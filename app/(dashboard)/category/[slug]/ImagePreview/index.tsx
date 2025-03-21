// app/camera-page/components/ImagePreview.js
import { Button, Loader } from "@mantine/core";
import { X, Check } from "lucide-react";
import Image from "next/image";

export default function ImagePreview({
  image,
  onSave,
  onDiscard,
  isAnalyzing,
}: any) {
  return (
    <div className="fixed inset-0 bg-black z-20 flex flex-col">
      <div className="flex-1 relative">
        <Image
          src={image}
          alt="Captured photo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="bg-black p-6 flex justify-around">
        <Button
          variant="filled"
          color="red"
          radius="xl"
          size="lg"
          onClick={onDiscard}
          leftSection={<X size={20} />}
          disabled={isAnalyzing}
        >
          Discard
        </Button>
        <Button
          variant="filled"
          color="green"
          radius="xl"
          size="lg"
          onClick={onSave}
          leftSection={isAnalyzing ? <Loader size={20} /> : <Check size={20} />}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Save & Analyze"}
        </Button>
      </div>
    </div>
  );
}
