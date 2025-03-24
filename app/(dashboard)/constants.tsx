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
