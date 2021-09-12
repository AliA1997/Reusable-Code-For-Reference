import * as d3 from 'd3';
export default function({  
    dataSet, 
    height, 
    width, 
    customMargins 
}) {

  const color = d3.scaleOrdinal()
                  .domain(dataSet.map(d => d.label))
                  .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), dataSet.length).reverse());
  
  const pieHeight = Math.min(width, 500);

  const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(Math.min(width, height) / 2.25 - 1)

  const arcLabel = d3.arc().innerRadius(Math.min(width, height) / 2 * 0.8).outerRadius(Math.min(width, height) / 2.5 * 0.9);

  const pie = d3.pie()
                .sort(null)
                .value(d => d.quantity)

  const arcs = pie(dataSet);

  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

  svg.append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
        .attr("fill", d => color(d.data.label))
        .attr("d", arc)
      .append("title")
        .text(d => `${d.data.label}: ${d.data.quantity.toLocaleString()}`);

  svg.append("g")
      .attr('class', d => 'abcd')
      .attr("font-family", "sans-serif")
      .attr("font-size", 3)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .call(text => text.append("tspan")
            .attr("y", "-1em")
            .attr("font-weight", "bold")
            .text(d => d.data.label))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.quantity.toLocaleString()));

  return svg.node();
}