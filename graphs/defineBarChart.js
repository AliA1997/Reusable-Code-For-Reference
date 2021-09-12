import * as d3 from "d3";
export default function({
  dataSet,
  height,
  width,
  customMargins,
}) {
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(dataSet, (d) => d.value) + 50])
    .range([customMargins.left, width - customMargins.right]);

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${customMargins.top})`)
      .call(d3.axisTop(x).ticks(width / 80, dataSet.format))
      .call((g) => g.select(".domain").remove());
  const y = d3
    .scaleBand()
    .domain(d3.range(dataSet.length))
    .rangeRound([customMargins.top, height - customMargins.bottom])
    .padding(0.1);

  const yAxis = (g) =>
    g.attr("transform", `translate(${customMargins.left},0)`).call(
      d3
        .axisLeft(y)
        .tickFormat((i) => dataSet[i].label)
        .tickSizeOuter(0)
    );
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  svg
    .append("g")
    .attr("fill", "red")
    .selectAll("rect")
    .data(dataSet)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d, i) => y(i))
    .attr("width", (d) => x(d.value) - x(0))
    .attr("height", y.bandwidth());

  svg
    .append("g")
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", 8)
    .selectAll("text")
    .data(dataSet)
    .join("text")
    .attr("x", (d) => x(d.value))
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", '13%')
    .text((d) => d.label)
    .call((text) =>
      text
        .filter((d) => x(d.value) - x(0) < 20) // short bars
        .attr("dx", +4)
        .attr("fill", "black")
        .attr("text-anchor", "start")
    );

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  return svg.node();
};
