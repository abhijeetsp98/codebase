import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Create an OpenAI instance directly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askGPT = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Updated method path for v5
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Change to 'gpt-4' if you have access
      messages: [{ role: 'user', content: question }],
    });

    const answer = response.choices[0]?.message?.content;
    res.status(200).json({ answer });
  } catch (err) {
    console.error('OpenAI API error:', err);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};
