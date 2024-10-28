import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // use non-public variable for security
});

async function fetchOpenAI(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150, // Limits response length
      temperature: 0.3, // Lower randomness for concise, consistent responses
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
    throw new Error("Failed to fetch history");
  }
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const countryName = searchParams.get("countryName");

  if (!countryName) {
    return NextResponse.json(
      { error: "Invalid request, missing country name" },
      { status: 400 }
    );
  }

  const prompt = `Tell me about the history of ${countryName}.`;
  try {
    const history = await fetchOpenAI(prompt);
    return NextResponse.json({ history });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
};
