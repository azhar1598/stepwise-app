import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Progress,
  Card,
  Group,
} from "@mantine/core";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Volume2,
  Check,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/router";
import CameraCapture from "../components/CameraCapture";
import TaskSteps from "../components/TaskSteps";
import makeBed from "../../public/task-assets/make-bed.jpeg";

export default function TaskGuide() {
  const router = useRouter();
  const { id } = router.query;

  const [currentTask, setCurrentTask] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (id) {
      setCurrentTask({
        id: parseInt(id),
        name: "Making the Bed",
        category: "Home",
        steps: [
          {
            title: "Remove all pillows",
            description: "Take all pillows off the bed and set them aside.",
            imageUrl: { makeBed },
            audioUrl: "#",
          },
          {
            title: "Straighten the fitted sheet",
            description:
              "Pull the corners of the fitted sheet so it's smooth across the mattress.",
            imageUrl: "/api/placeholder/400/300",
            audioUrl: "#",
          },
          {
            title: "Spread the top sheet",
            description:
              "Unfold the top sheet and spread it evenly across the bed.",
            imageUrl: "/api/placeholder/400/300",
            audioUrl: "#",
          },
          {
            title: "Add the comforter or duvet",
            description:
              "Place the comforter or duvet on top of the sheet and straighten it.",
            imageUrl: "/api/placeholder/400/300",
            audioUrl: "#",
          },
          {
            title: "Place the pillows",
            description: "Put the pillows back at the head of the bed.",
            imageUrl: "/api/placeholder/400/300",
            audioUrl: "#",
          },
        ],
      });
    }
  }, [id]);

  if (!currentTask) {
    return <Container className="py-12 text-center">Loading task...</Container>;
  }
  const progress = ((currentStep + 1) / currentTask.steps.length) * 100;

  const nextStep = () => {
    if (currentStep < currentTask.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const playAudio = () => {
    alert("Playing audio instructions");
  };

  const finishTask = () => {
    router.push("/dashboard");
  };

  return (
    <Container size="lg" className="py-12">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="subtle"
          leftSection={<ChevronLeft size={16} />}
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </Button>
        <Button
          variant="outline"
          leftSection={<Camera size={16} />}
          onClick={() => setShowCamera(!showCamera)}
        >
          {showCamera ? "Hide Camera" : "Show Camera"}
        </Button>
      </div>

      <div className="mb-6">
        <Title className="text-3xl font-bold mb-2">{currentTask.name}</Title>
        <Text className="text-gray-600 mb-4">
          Step {currentStep + 1} of {currentTask.steps.length}
        </Text>
        <Progress value={progress} className="h-2" />
      </div>

      {showCamera && (
        <div className="mb-6">
          <CameraCapture />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card shadow="sm" p="lg">
            <img
              src={currentTask.steps[currentStep].imageUrl}
              alt={currentTask.steps[currentStep].title}
              className="w-full rounded-lg mb-4"
            />
            <Button
              variant="light"
              fullWidth
              leftSection={<Volume2 size={16} />}
              onClick={playAudio}
              className="mb-4"
            >
              Listen to Instructions
            </Button>
            <TaskSteps steps={currentTask.steps} currentStep={currentStep} />
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card shadow="sm" p="lg" className="mb-6">
            <Title order={2} className="text-2xl font-bold mb-4">
              {currentTask.steps[currentStep].title}
            </Title>
            <Text className="text-lg mb-6">
              {currentTask.steps[currentStep].description}
            </Text>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <Text fw={700} className="mb-2">
                Tips:
              </Text>
              <Text>
                Take your time with this step. It's okay to ask for help if you
                need it!
              </Text>
            </div>

            <Group>
              <Button
                variant="outline"
                leftSection={<ChevronLeft size={16} />}
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              {currentStep < currentTask.steps.length - 1 ? (
                <Button
                  rightSection={<ChevronRight size={16} />}
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  rightSection={<Check size={16} />}
                  onClick={finishTask}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Task
                </Button>
              )}
            </Group>
          </Card>

          <Card shadow="sm" p="lg">
            <div className="flex justify-between items-center mb-4">
              <Title order={3} className="text-xl">
                Need Help?
              </Title>
              <Button
                variant="light"
                leftSection={<RefreshCw size={16} />}
                className="text-gray-700"
              >
                Repeat Instructions
              </Button>
            </div>
            <Text className="mb-4">
              If you're having trouble with this step, you can:
            </Text>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Press the "Listen" button to hear the instructions again</li>
              <li>
                Use the camera to scan the object for more specific guidance
              </li>
              <li>Ask a caregiver for assistance</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  );
}
