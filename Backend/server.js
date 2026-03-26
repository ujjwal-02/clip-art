const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = "sk-proj-********************************************";

app.post("/generate", async (req, res) => {
    console.log("🔥 API HIT");

  try {
    const { prompt } = req.body;
    console.log("PROMPT 👉", prompt);

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "512x512",
      }),
    });

    const data = await response.json();

    res.json({
      url: data.data[0].url,
    });
  } catch (err) {
    console.log("SERVER ERROR 👉", err);
    res.status(500).json({ error: "failed" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));