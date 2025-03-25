// import makeBed from "../../public/task-assets/make-bed.jpeg";
import puzzle from "../../public/task-assets/puzzle.jpeg";
import wateringPlants from "../../public/task-assets/watering-plants.jpeg";
import foodMaking from "../../public/task-assets/food-making.jpeg";
import drawingCrayons from "../../public/task-assets/drawing.jpeg";
import brushTeeth from "../../public/task-assets/brushing-teeth.jpeg";

export const categories = [
  {
    id: 29,
    src: puzzle,
    title: "Puzzle",
    date: "Mar 10, 2025",
    slug: "puzzle",
    category: "Puzzle",
    analysis: "A puzzle being solved.",
  },
  {
    id: 21,
    src: wateringPlants,
    title: "Watering the Plants",
    date: "Mar 10, 2025",
    slug: "watering-plants",
    category: "Gardening",
    analysis: "A watering can being used to water a plant.",
  },
  {
    id: 28,
    src: foodMaking,
    title: "Food Making",
    date: "Mar 10, 2025",
    slug: "food-making",
    category: "Cooking",
    analysis: "A child cooking with a spoon.",
  },
  {
    id: 22,
    src: drawingCrayons,
    title: "Drawing with Crayons",
    date: "Mar 12, 2025",
    slug: "drawing-with-crayons",
    category: "Art",
    analysis: "A child drawing with crayons.",
  },

  {
    id: 2,
    src: brushTeeth,
    title: "Brush Teeth",
    date: "Mar 11, 2025",
    slug: "brush-teeth",
    category: "Personal Hygiene",
    analysis: "A toothbrush and toothpaste.",
  },
];

export const pauseOptions = [
  { value: "500", label: "0.5s" },
  { value: "1000", label: "1s" },
  { value: "1500", label: "1.5s" },
  { value: "2000", label: "2s" },
  { value: "2500", label: "2.5s" },
  { value: "3000", label: "3s" },
  { value: "3500", label: "3.5s" },
  { value: "4000", label: "4s" },
  { value: "4500", label: "4.5s" },
  { value: "5000", label: "5s" },
];

export const prompt = `
Analyze the provided image and generate a step-by-step instructional guide tailored for a person with Down syndrome to complete the task depicted in the image.

### Requirements:
- The instructions should be **clear, simple, and detailed**, ensuring ease of understanding.
- Output must be in **valid JSON format** with the following structure:
  - **id**: A unique step number.
  - **description**: A concise yet detailed explanation of the step.
  - **audioUrl**: A placeholder audio URL in the format "/audio/{action}.mp3".
  - **category**: The category that best fits the task (e.g., "Puzzle," "Gardening," "Cooking," "Food," "Personal Hygiene," "Art," etc.).
- The response **must only contain the JSON**—no extra text.

### Example JSON Format:

[
  { "id": 1, "description": "Wash your hands with soap and water", "audioUrl": "/audio/wash-hands.mp3", "category": "cooking-eating" },
  { "id": 2, "description": "Pick up the spoon and hold it firmly", "audioUrl": "/audio/pick-spoon.mp3", "category": "cooking-eating" }
]
`;
