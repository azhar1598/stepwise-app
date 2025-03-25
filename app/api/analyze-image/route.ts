import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // return NextResponse.json({ message: "Hello, world!" });

  // return NextResponse.json([
  //   {
  //     id: 1,
  //     description: "Wash your hands",
  //     audioUrl: "/audio/wash-hands.mp3",
  //     category: "cooking-eating",
  //   },
  //   {
  //     id: 2,
  //     description: "Pick up the spoon",
  //     audioUrl: "/audio/pick-spoon.mp3",
  //     category: "cooking-eating",
  //   },
  //   {
  //     id: 3,
  //     description: "Put the spoon in your mouth",
  //     audioUrl: "/audio/put-spoon-in-mouth.mp3",
  //     category: "cooking-eating",
  //   },
  //   {
  //     id: 4,
  //     description: "Put the spoon in your mouth",
  //     audioUrl: "/audio/put-spoon-in-mouth.mp3",
  //     category: "cooking-eating",
  //   },
  // ]);
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(
      "AIzaSyB0r-YhgIA1CuxqJt3Q85CvD0Ui9xHQFAA"
      // "process.env.NEXT_PUBLIC_GEMINI_API_KEY"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prepare the image data for Gemini
    const imagePart = {
      inlineData: {
        data: image,
        mimeType: "image/jpeg",
      },
    };

    // Updated Prompt with Context for JSON Response
    const prompt = `
      Analyze this image and generate step-by-step instructions for a person with Down syndrome to complete the task in the image.
      The instructions should be in JSON format with an ID, a short description, and an audio URL for each step.
      The audio URLs should be placeholders in the format "/audio/{action}.mp3".
      Do not include any additional text outside the JSON response.
      
      Example JSON format:
      [
        { "id": 1, "description": "Wash your hands", "audioUrl": "/audio/wash-hands.mp3",category:"cooking-eating" },
        { "id": 2, "description": "Pick up the spoon", "audioUrl": "/audio/pick-spoon.mp3",category:"cooking-eating" }
      ]
      
      Now generate the JSON based on the image task.
    `;

    // Generate content with the image
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;

    // Extract JSON from response text
    // const analysis: any = response.text().match(/\[.*\]/); // Extract JSON array from response

    // below working code line
    const analysis: any = response.text().match(/\[[\s\S]*\]/);
    // .match(/\[.*\]/s);

    if (!analysis) {
      throw new Error("Invalid response format");
    }

    return NextResponse.json(JSON.parse(analysis[0]));
  } catch (error: any) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to analyze image", details: error.message },
      { status: 500 }
    );
  }
}
