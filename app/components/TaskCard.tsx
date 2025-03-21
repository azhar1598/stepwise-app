import { Card, Text, Badge, Button, Group } from "@mantine/core";
import { Play, Check } from "lucide-react";
import Link from "next/link";

export default function TaskCard({ task }) {
  return (
    <Card shadow="sm" p="lg" className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <Text fw={700} className="text-xl">
          {task.name}
        </Text>
        <Badge color={task.completed ? "green" : "blue"}>
          {task.completed ? "Completed" : "In Progress"}
        </Badge>
      </div>

      <Text className="text-gray-600 mb-4 flex-grow">
        {task.steps} steps · {task.category}
      </Text>

      <Group>
        <Link href={`/task-guide?id=${task.id}`}>
          <Button
            leftSection={
              task.completed ? <Check size={16} /> : <Play size={16} />
            }
            className={task.completed ? "bg-green-600" : "bg-blue-600"}
          >
            {task.completed ? "Review" : "Start"}
          </Button>
        </Link>
      </Group>
    </Card>
  );
}
