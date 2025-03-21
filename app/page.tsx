"use client";
import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Button,
  Badge,
} from "@mantine/core";
import { Camera, Check, ArrowRight, Settings, Plus } from "lucide-react";
import Link from "next/link";
import TaskCard from "./components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Making the Bed",
      completed: true,
      steps: 5,
      category: "Home",
    },
    {
      id: 2,
      name: "Brushing Teeth",
      completed: false,
      steps: 8,
      category: "Hygiene",
    },
    {
      id: 3,
      name: "Making Breakfast",
      completed: false,
      steps: 12,
      category: "Cooking",
    },
    {
      id: 4,
      name: "Getting Dressed",
      completed: true,
      steps: 6,
      category: "Personal Care",
    },
    {
      id: 5,
      name: "Doing Laundry",
      completed: false,
      steps: 10,
      category: "Home",
    },
    {
      id: 6,
      name: "Setting the Table",
      completed: false,
      steps: 7,
      category: "Home",
    },
  ]);

  return (
    <Container size="lg" className="py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title className="text-3xl font-bold">Welcome back, Sam!</Title>
          <Text className="text-gray-600">Let's practice some daily tasks</Text>
        </div>
        <Button
          leftSection={<Camera size={18} />}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Scan Object
        </Button>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <Text fw={700} className="text-lg mb-2">
              Today's Progress
            </Text>
            <Text className="text-gray-600">
              You've completed 2 out of 6 tasks today. Keep going!
            </Text>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: "33%" }}
              ></div>
            </div>
            <Text className="text-right mt-1 text-sm">33% Complete</Text>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Title order={2} className="text-2xl font-bold">
            Your Tasks
          </Title>
          <Button
            variant="subtle"
            rightSection={<ArrowRight size={16} />}
            className="text-blue-600"
          >
            View All
          </Button>
        </div>

        <Grid>
          {tasks.map((task) => (
            <Grid.Col key={task.id} md={6} lg={4}>
              <TaskCard task={task} />
            </Grid.Col>
          ))}
          <Grid.Col span={12}>
            <Card
              shadow="sm"
              p="lg"
              className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300"
            >
              <Button
                variant="subtle"
                leftSection={<Plus size={20} />}
                className="text-gray-500"
              >
                Add New Task
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <Title order={2} className="text-2xl font-bold mb-4">
          Suggested Skills
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card shadow="sm" p="lg">
            <Badge color="blue" className="mb-2">
              New
            </Badge>
            <Title order={3} className="text-xl mb-2">
              Using Public Transport
            </Title>
            <Text className="text-gray-600 mb-4">
              Learn how to navigate buses and trains safely.
            </Text>
            <Button variant="light" className="w-full">
              Start Learning
            </Button>
          </Card>

          <Card shadow="sm" p="lg">
            <Badge color="green" className="mb-2">
              Recommended
            </Badge>
            <Title order={3} className="text-xl mb-2">
              Grocery Shopping
            </Title>
            <Text className="text-gray-600 mb-4">
              Follow a shopping list and pay at checkout.
            </Text>
            <Button variant="light" className="w-full">
              Start Learning
            </Button>
          </Card>

          <Card shadow="sm" p="lg">
            <Badge color="orange" className="mb-2">
              Popular
            </Badge>
            <Title order={3} className="text-xl mb-2">
              Using Smartphone
            </Title>
            <Text className="text-gray-600 mb-4">
              Essential skills for using your smartphone.
            </Text>
            <Button variant="light" className="w-full">
              Start Learning
            </Button>
          </Card>
        </div>
      </div>
    </Container>
  );
}
