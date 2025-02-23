import { useEffect, useState } from "react";
import axios from "axios";

export default function ConnectionGraph() {
  const [query, setQuery] = useState("");
  const [iFrame, setiFrame] = useState("");
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Enter pressed with query:", query);
      const response = await axios.post("http://127.0.0.1:5132/query", {
        query: query,
      });
      setiFrame(response.data);
    }
  };

  return (
    <div
      id="Connections"
      style={{ width: "100vw", height: "100vh" }}
      className="flex relative justify-center items-center min-h-screen bg-gray-500 border-3 border-blue-500"
    >
      <div className="flex flex-col p-4 text-center">
        <h1 className="mb-2">Enter your query here: </h1>
        <input
          className="bg-white text-black rounded-md mb-4"
          name="hello"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {iFrame != "" && (
          <iframe
            title="Dynamic Iframe"
            srcDoc={iFrame}
            style={{ width: "80vw", height: "80vh" }}
          />
        )}
      </div>
    </div>
  );
}
