import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gdp, setGdp] = useState([]);

  const width = 640;
  const height = 400;

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
      .then((res) => res.json())
      .then((res) => setGdp(res.data));
  }, []);

  useEffect(() => {
    if (gdp.length === 0) return;

    createChart();
  }, [gdp]);

  const createChart = () => {
      
  }

  return (
    <div className="App">
      <header className="App_inner_Container">
        <svg id="mySvg" width={width} height={height}></svg>
      </header>
    </div>
  );
}

export default App;
