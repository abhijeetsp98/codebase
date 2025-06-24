import { GoogleGenerativeAI } from '@google/generative-ai'; 
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables.");
  // Handle error, e.g., throw an exception or exit process
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export const askGPT = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Construct the message in the format expected by Gemini API
    const result = await model.generateContent(question);
    const response = result.response;
    const text = response.text(); // Get the text content from the response

    res.status(200).json({ answer: text });
  } catch (err) {
    console.error('Gemini API error:', err);
    // You might want to log the specific error details from Gemini
    // For example: console.error('Gemini error details:', err.response?.data);
    res.status(500).json({ error: 'Failed to get AI response from Gemini' });
  }
};
