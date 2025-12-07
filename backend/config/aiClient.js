const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getAIReply(userMessage) {
  if (!GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY in .env");
    return "AI Error: Gemini API key is not configured on the server.";
  }

  try {
    const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const candidates = response.data.candidates;
    if (!candidates || candidates.length === 0) {
      return "AI Error: Gemini returned no candidates.";
    }

    const parts = candidates[0].content.parts || [];
    const text = parts.map((p) => p.text || "").join(" ").trim();

    return text || "AI Error: Gemini returned empty text.";
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response?.data || error.message || error
    );

    const apiMessage = error.response?.data?.error?.message;
    if (apiMessage) {
      return `AI Error: ${apiMessage}`;
    }

    return "AI Error: Unable to generate response using Gemini.";
  }
}

module.exports = { getAIReply };
