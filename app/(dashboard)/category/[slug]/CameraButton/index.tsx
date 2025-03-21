// app/camera-page/components/CameraButton.js
import { Button } from "@mantine/core";
import { Camera } from "lucide-react";

export default function CameraButton({ startCamera }) {
  return (
    <div className="z-10 w-full flex justify-center">
      <Button
        w={"95%"}
        radius="md"
        className="bg-blue-600 hover:bg-blue-700 w-full h-[30px] shadow-lg mt-2 mx-2 py-8"
        onClick={startCamera}
        h={50}
      >
        <Camera size={28} />
      </Button>
    </div>
  );
}
