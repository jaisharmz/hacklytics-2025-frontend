import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CircleGroup({
  parent,
  sizes,
  data,
  currentNode,
  setCurrentNode,
}) {
  // Add isLoading state to prevent rendering before sizes are calculated
  const [path, setPath] = useState("/");
  const getItems = () => {
    return data[currentNode] ? Array.from(data[currentNode]) : [];
  };
  const retrievePath = (item) => {
    var currentNode = item;
    var allNodes = [];
    while (currentNode != "root") {
      allNodes.push(currentNode);
      currentNode = parent[currentNode];
    }
    var currentPath = "/";
    for (var i = allNodes.length - 1; i >= 0; i--) {
      currentPath += allNodes[i] + "/";
    }
    return currentPath;
  };
  const travForward = (item) => {
    setCurrentNode(item);
    setPath(retrievePath(item));
  };

  const travBackward = () => {
    setPath(retrievePath(parent[currentNode]));
    if (currentNode != "root") setCurrentNode(parent[currentNode]);
  };

  const goTop = () => {
    setCurrentNode("root");
    setPath("/");
  };

  return (
    <div
      id="Clusters"
      className="flex relative justify-center items-center min-h-screen  bg-gray-800 border-3 border-red-500"
    >
      <div
        className="absolute p-2 bg-gray-500 top-5 left-5 hover:shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
        onClick={travBackward}
      >
        Back
      </div>

      <div
        className="absolute p-2 bg-gray-500 top-5 left-20 hover:shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
        onClick={goTop}
      >
        Top
      </div>
      <div className="absolute p-2 top-5 left-30">{path}</div>
      <div className="flex flex-wrap">
        {getItems().map((item, index) => (
          <motion.div
            key={item}
            style={{
              //width: `${Math.max(subtreeSz[item] * 30, 100)}px`,
              //height: `${Math.max(subtreeSz[item] * 30, 100)}px`,
              width: "150px",
              height: "150px",
            }}
            className={`bg-blue-500 rounded-full flex items-center justify-center text-center text-white m-2 cursor-pointer text-wrap overflow-hidden`}
            whileHover={{ scale: 1.2 }}
            animate={{ opacity: 1, x: [0, 10, -10, 0] }}
            onClick={() => travForward(item)}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
