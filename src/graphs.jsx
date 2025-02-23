import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import stockData from "./assets/SPY_500_5y.json";
import jsonData from "./assets/clusters.json";

const handleRelayout = () => {
  console.log("Hello1");
};
export default function CreateGraph({ currentNode }) {
  var [plots, setPlots] = useState([]);
  useEffect(() => {
    setPlots([]);
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
    var curStocks = [];

    function dfs(node) {
      if (node) {
        if (node in tempData) {
          tempData[node].forEach((child) => {
            dfs(child);
          });
        } else {
          if (node != "root") curStocks.push(node);
        }
      }
    }
    dfs(currentNode);
    var tempPlots = [];
    var mxStocks = 10;

    curStocks.forEach((stock) => {
      var dates = [];
      var prices = [];
      let firstVal = -1;
      //console.log(firstVal);
      for (const [key, value] of Object.entries(stockData[stock])) {
        if (firstVal == -1) {
          firstVal = parseFloat(value);
        }
        dates.push(key);
        prices.push(parseFloat(value) / firstVal);
      }

      if (mxStocks > 0) {
        tempPlots.push({
          x: dates,
          y: prices,
          type: "scatter",
          mode: "lines+markers",
          name: stock,
        });
      }
      mxStocks -= 1;
    });
    setPlots(tempPlots);
  }, [currentNode]);

  return (
    <div
      id="Graphs"
      className="flex relative justify-center items-center min-h-screen border-3 bg-gray-400 border-green-300"
    >
      <Plot
        data={plots}
        layout={{
          title: { text: "Correlated Assets" },
          plot_bgcolor: "#f0f0f0",
          paper_bgcolor: "#e5e5e5",
          autosize: true,
        }}
        style={{ width: "80vw", height: "100vh" }}
        onRelayout={handleRelayout}
      />
    </div>
  );
}
