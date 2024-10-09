import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        lines.forEach((line) => {
          if (line.startsWith("data: ")) {
            const content = line.slice(6);
            if (content === "[DONE]") {
              setIsLoading(false);
            } else {
              setResponse((prevResponse) => prevResponse + content);
            }
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-700 h-screen w-screen flex flex-col justify-between items-center p-10">
      <div className="flex-1 w-[800px] overflow-y-auto p-7">
        <h1 className="font-semibold text-5xl text-center mb-10 ">Chat AI</h1>
        <p className="break-all text-gray-300">{response}</p>
      </div>

      <div className="flex w-full justify-between items-center py-5 px-80 gap-4">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="h-10 rounded-md flex-1 p-3 border-none outline-none"
          onKeyDown={(e) =>
            e.key === "Enter" && prompt !== "" && handleSubmit()
          }
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading}
          className="py-2 px-4 text-slate-700 bg-gray-400 rounded-md"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;
