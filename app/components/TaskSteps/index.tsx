import { Text } from "@mantine/core";
import { Check, Circle } from "lucide-react";

export default function TaskSteps({ steps, currentStep }) {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center p-2 rounded-lg ${
            index === currentStep
              ? "bg-blue-100 text-blue-800"
              : index < currentStep
              ? "text-green-700"
              : "text-gray-500"
          }`}
        >
          {index < currentStep ? (
            <Check size={16} className="mr-2 text-green-600" />
          ) : index === currentStep ? (
            <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
          ) : (
            <Circle size={16} className="mr-2" />
          )}
          <Text size="sm">{step.title}</Text>
        </div>
      ))}
    </div>
  );
}
