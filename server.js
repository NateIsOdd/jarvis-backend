import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://nateisodd.github.io",
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

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Jarvis backend is running.");
});
app.listen(PORT, () => {
  console.log(`Jarvis running on port ${PORT}`);
});
