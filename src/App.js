import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("")

  const width = 640;
  const height = 400;
  const padding = 60;
  
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setTitle(res.source_name);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    createChart();
  }, [data]);

  const createChart = () => {
      const svg = d3
              .select("#mySvg")
              .attr("width", width)
              .attr("height", height)

      const xScale = d3.scaleTime().domain([data[0], data[data.length - 1][0]])

      svg.append("g")
          .attr("transform", `translate(0, ${height - padding})`)
          .call(d3.axisBottom(xScale))

  }

  return (
    <div className="App">
      <header className="App_inner_Container">
        <div className="title">{title}</div>
        <svg id="mySvg"></svg>
      </header>
    </div>
  );
}

export default App;
