import { useEffect, useState } from "react";
import "./App.css";
import CircleGroup from "./CircleGroup";
import Navbar from "./navbar";
import CreateGraph from "./graphs";
import ConnectionGraph from "./connections";
import jsonData from "./assets/clusters.json";

function App() {
  const [subtreeSz, setSubtreeSz] = useState({});
  const [parent, setParent] = useState({});
  const [currentNode, setCurrentNode] = useState("root");
  const [data, setData] = useState({});
  useEffect(() => {
    const tempData = {};
    const mx = Math.max(...jsonData.map((item) => item[0])) + 1;

    jsonData.forEach(([from, to, value]) => {
      if (!tempData["root"]) {
        tempData["root"] = new Set();
      }
      const adjustedTo = to;
      if (!tempData[from]) {
        tempData[from] = new Set();
      }
      if (!tempData[adjustedTo]) {
        tempData[adjustedTo] = new Set();
      }
      tempData["root"].add(from);
      tempData[from].add(adjustedTo);
      tempData[adjustedTo].add(value);
    });
    for (let key in tempData) {
      tempData[key] = Array.from(tempData[key]);
    }

    const sizes = {};
    const parents = {};
    function dfs(node, parent) {
      parents[node] = parent;
      let size = 1;
      if (node in tempData) {
        // Use tempData instead of data
        tempData[node].forEach((child) => {
          size += dfs(child, node);
        });
      }
      sizes[node] = size;
      return size;
    }
    dfs("root", null);

    setSubtreeSz(sizes);
    setParent(parents);
    setData(tempData);
  }, []);
  return (
    <div>
      <Navbar />
      <CircleGroup
        parent={parent}
        sizes={subtreeSz}
        data={data}
        currentNode={currentNode}
        setCurrentNode={setCurrentNode}
      />
      <CreateGraph data={data} currentNode={currentNode} />
      <ConnectionGraph />
    </div>
  );
}

export default App;
