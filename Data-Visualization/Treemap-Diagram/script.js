document.addEventListener("DOMContentLoaded", () => {
    fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json")
   .then(res => res.json())
   .then(data => {
        // Specify the chart’s dimensions.
        const width = 1200
        const height = 1680;

        // Specify the color scale.
        const color = d3.scaleOrdinal(data.children.map(d => d.name), d3.schemeTableau10);

        const tile = d3.treemapBinary;

        // Compute the layout.
        const root = d3.treemap()
            .tile(tile)
            .size([width, height])
            .padding(1)
            .round(true)
        (d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value));

        // Create the SVG container.
        const svg = d3.select("body")
            .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

        // Add a cell for each leaf of the hierarchy.
        const leaf = svg.selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);

        // Append a tooltip.
        const format = d3.format(",d");
        leaf.append("title")
            .text(d => `${d.ancestors().reverse().map(d => d.data.name).join(".")}\n${format(d.value)}`);

        const tooltip = d3.select("body")
            .append("div")
            .attr("id", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("padding", "0.4rem")
            .style("font-size", "6px")
            .style("background-color", "#FFFFDDEE")
            .style("z-index", "99")
            .style("border-radius", "10px")
            .style("font-family", "Tahoma, san-serif")
            .style("box-shadow", "3px 3px 10px 0")
            .style("text-align", "center");

        // Append a color rectangle. 
        leaf.append("rect")
            .attr("id", d => d.data.name)
            .attr("class", "tile")
            .attr("data-name", d => d.data.name)
            .attr("data-category", d => d.data.category)
            .attr("data-value", d => d.data.value)
            .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr("fill-opacity", 0.6)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .on("mouseover", function(event){const dataPoint = event.target.__data__; d3.select(this).style("stroke", "gray").style("stroke-width", 2).style("fill-opacity", 0.85); tooltip.html(`Name: ${dataPoint.data.name}<br>Category: ${dataPoint.data.category}<br>Value: ${dataPoint.data.value}`); return tooltip.style("visibility", "visible").attr("data-value", dataPoint.data.value);})
            .on("mousemove", function(event){return tooltip.style("top", (event.clientY - 30) + "px").style("left", (event.clientX + 20) + "px");})
            .on("mouseout", function(event){d3.select(this).style("stroke", "none").style("fill-opacity", 0.6); return tooltip.style("visibility", "hidden");});

        // Append a clipPath to ensure text does not overflow.
        leaf.append("clipPath")
            .attr("id", d => d.data.name)
            .append("use")

        // Append multiline text. The last line shows the value and has a specific formatting.
        leaf.append("text")
            .attr("clip-path", d => d.clipUid)
            .selectAll("tspan")
            .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value)))
            .join("tspan")
            .attr("x", 3)
            .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
            .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
            .text(d => d);
        
        // Legend
        const legend = d3.select("body")
                         .append("svg")
                         .attr("id", "legend")
                         .attr("x", 1200/2 - 150)
                         .attr("y", 1720)
                         .attr("width", 300)
                         .attr("height", 400);
            
        const legendPadding = 15;

        console.log(data.children)
        for (let i = 0; i < data.children.length; i++) {
            legend.append("rect")
                .attr("x", legendPadding + 100 * (i > 5) + 100 * (i > 11))
                .attr("y", legendPadding + 20 * (i % 6))
                .attr("height", 10)
                .attr("width", 10)
                .attr("class", "legend-item")
                .style("fill-opacity", 0.6)
                .style("fill", color(data.children[i].name));

            legend.append("text")
                .attr("x", legendPadding + 100 * (i > 5) + 100 * (i > 11) + 16)
                .attr("y", legendPadding + 20 * (i % 6) + 9)
                .style("font-size", "10px")
                .text(data.children[i].name);
        }

        /*
        legend.append("text")
                .attr("x", 35)
                .attr("y", legendPadding * 1.7)
                .text("Riders with doping allegations");

        legend.append("text")
                .attr("x", 35)
                .attr("y", legendPadding * 3.7)
                .text("No doping allegations");
        */
   })
   .catch(e => `Error: ${e}`);   
})
