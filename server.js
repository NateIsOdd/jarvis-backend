import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = "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";

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Jarvis"
  },
  body: JSON.stringify({
    model: "openrouter/auto",
    messages: [
      {
        role: "system",
        content: "You are Jarvis, a helpful futuristic AI assistant."
      },
      {
        role: "user",
        content: req.body.message
      }
    ]
  })
});

    const data = await response.json();
    console.log(data);

    const reply =
      data.choices?.[0]?.message?.content ||
      data.error?.message ||
      "No response";

    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.json({ reply: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Jarvis running on http://localhost:3000");
});