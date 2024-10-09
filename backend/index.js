const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Set headers for Server-Sent Events (SSE)
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      stream: true,//this will enable the streaming resp
    });

    for await (const chunk of stream) {
      //console.log("logChunk", chunk);
      const content = chunk.choices[0]?.delta?.content || "";
      //console.log("logContent", chunk.choices[0]?.delta);
      if (content) {
        res.write(`data: ${content}\n\n`);
        // In Server-Sent Events (SSE), the \n\n at the end of each message is required by the protocol to indicate the end of an event. The SSE specification dictates the format of the data sent from the server to the client, and each event must be separated by a blank line, which is represented by two newline characters (\n\n).
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error:", error);
    // If headers haven't been sent yet, send an error response
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
    } else {
      // If headers have been sent, just end the response
      res.end();
    }
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
