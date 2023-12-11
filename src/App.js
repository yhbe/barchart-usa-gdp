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

      const xScale = d3.scaleTime().domain([new Date(data[0][0]), new Date(data[data.length - 1][0])]).range([padding, width - padding])

      svg
        .append("g")
        .attr("transform", `translate(0, ${height - padding})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")));

      const yScale = d3.scaleLinear().domain([
        d3.min(data, (d) => d[1]),
        d3.max(data, (d) => d[1])
      ]).range([height - padding, padding])

      svg
        .append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .call(d3.axisLeft(yScale));

      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(new Date(d[0])))
        .attr("y", (d) => yScale(d[1]))
        .attr("height", (d) => height - padding - yScale(d[1]))
        .attr("width", (width - 2 * padding) / data.length)
        .attr("fill", "steelblue")
        .on("mousemove", (e,d) => {
          const tooltip = d3.select("#tooltip")

          tooltip.transition()
                  .duration(200)
                  .style("opacity", 0.9)
                  .style("left", e.pageX + 10 + "px")
                  .style("top", e.pageY + 10 + "px")
                  .style("font-size", "15px")

          const months = {
            "01": "Q1",
            "02": "Q1",
            "03": "Q1",
            "04": "Q2",
            "05": "Q2",
            "06": "Q2",
            "07": "Q3",
            "08": "Q3",
            "09": "Q3",
            "10": "Q4",
            "11": "Q4",
            "12": "Q4"
          }

          tooltip
              .attr("data-date", d[0])
              .html(`${d[0].split("-")[0]} ${months[d[0].split("-")[1]]} <br/> $${d[1]} Billions`)
        })
        .on("mouseout", () => {
          d3.select("#tooltip").style("opacity", "0")
        })

        const tooltip = d3.select("body")
                          .append("div")
                          .attr("id", "tooltip")
                          .style("opacity", 0)
                          .style("position", "absolute")
                          .style("background-color", "black")
                          .style("color", "white")
                          .style("padding", "10px")
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
