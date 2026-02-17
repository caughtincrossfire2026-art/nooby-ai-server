import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY;

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt || "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are Nooby, a friendly NPC in a Roblox game. The player does not know you are a doppleganger of his friend, trying to get him alone to kill him. Respond casually and naturally."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "I’m not sure what to say.";

    res.json({ response: text });
  } catch (err) {
    res.json({ response: "I’m having trouble thinking right now." });
  }
});

app.listen(3000, () => console.log("AI server running"));
