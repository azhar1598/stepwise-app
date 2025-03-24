// app/camera-page/components/PhotoList.js
import { Text, Badge, Button } from "@mantine/core";
import { Image as ImageIcon, Brain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PhotoList({ tasks, analyzeExistingImage }: any) {
  // if (tasks.length === 0) {
  //   return (
  //     <div className="flex-1 p-4 overflow-y-auto pb-20">
  //       <div className="h-full flex flex-col items-center justify-center text-gray-400">
  //         <ImageIcon size={64} strokeWidth={1.5} />
  //         <Text size="lg" mt={3}>
  //           No photos yet
  //         </Text>
  //         <Text size="sm" c="dimmed" mt={1}>
  //           Tap the camera icon to take your first photo
  //         </Text>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex-1 p-4 overflow-y-auto pb-20">
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task: any) => (
          <Link
            key={task.id}
            href={`/category/${task.slug}`}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div className="aspect-video relative">
              <Image
                src={task.src}
                alt={task.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <Text fw={500}>{task.category}</Text>
                <Badge color="blue" variant="light">
                  {task.date}
                </Badge>
              </div>
              {task.analysis && (
                <div className="mt-1 text-sm text-gray-600 mb-2">
                  <div className="line-clamp-2">{task.analysis}</div>
                </div>
              )}
              <Button
                variant="light"
                size="sm"
                leftSection={<Brain size={16} />}
                onClick={() => analyzeExistingImage(task.id)}
                className="mt-1"
              >
                {task.analysis ? "Re-analyze" : "Analyze with Gemini"}
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
