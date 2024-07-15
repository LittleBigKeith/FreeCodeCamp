document.addEventListener("DOMContentLoaded", () => {
    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
        .then(res => res.json())
        .then(dataset => {
            const height = window.innerHeight * 0.8;
            const width = window.innerWidth * 0.8;
            const padding = 60;
            const xScale = d3.scaleLinear()
                             .domain([d3.min(dataset.map(d => d.Year)) - 1, d3.max(dataset.map(d => d.Year)) + 1])
                             .range([padding, width - padding]);
            const yScale = d3.scaleLinear()
                             .domain([d3.min(dataset.map(d => d.Seconds)), d3.max(dataset.map(d => d.Seconds))])
                             .range([padding, height - padding]);
            const tooltip = d3.select("body")
                             .append("div")
                             .attr("id", "tooltip")
                             .style("position", "absolute")
                             .style("visibility", "hidden")
                             .style("padding", "0.8rem")
                             .style("background-color", "#DDDDDDEE")
                             .style("border-radius", "30px")
                             .style("z-index", "99")
                             .style("font-family", "Tahoma, san-serif")
                             .style("box-shadow", "3px 3px 10px 0");
            
            const svg = d3.select("body")
                          .append("svg")
                          .attr("id", "canvas")
                          .attr("height", height)
                          .attr("width", width);
            
            const fillFn = (d) => d.Doping ? "crimson" : "green";
            const dispStr = (d) => `${d.Name}: ${d.Nationality}<br>Year: ${d.Year} Time: ${d.Time}<br>Place: ${d.Place}${d.Doping ? "<br><br>" + d.Doping : ""}`
            svg.selectAll("circle")
               .data(dataset)
               .enter()
               .append("circle")
               .attr("class", "dot")
               .attr("data-xvalue", (d) => new Date(d.Year, null))
               .attr("data-yvalue", (d) => new Date(null, null ,null, null, null, d.Seconds))
               .attr("cx", (d) => xScale(d.Year))
               .attr("cy", (d) => yScale(d.Seconds))
               .attr("r", 6)
               .style("fill", (d) => fillFn(d))
               .on("mouseover", function(event){const dataPoint = event.target.__data__; d3.select(this).style("fill", "darkgoldenrod"); tooltip.html(`${dispStr(dataPoint)}`); return tooltip.style("visibility", "visible").attr("data-year", event.target.attributes["data-xvalue"].value);})
               .on("mousemove", function(event){return tooltip.style("top", (event.pageY-30)+"px").style("left",(event.pageX + 20)+"px");})
               .on("mouseout", function(event){d3.select(this).style("fill", () => fillFn(event.target.__data__)); return tooltip.style("visibility", "hidden");});

            const xAxis = d3.axisBottom(xScale)
                            .tickFormat(d3.format(""));
            const yAxis = d3.axisLeft(yScale)
                            .ticks(13)
                            .tickFormat((d) => new Date(d * 1000).toISOString().slice(14, 19));

            svg.append("g")
               .attr("id", "x-axis")
               .attr("transform", "translate(0, " + (height - padding) + ")")
               .call(xAxis);
            svg.append("g")
               .attr("id", "y-axis")
               .attr("transform", "translate(" + padding + ", 0)")
               .call(yAxis);

            svg.append("text")
               .attr("x", padding - 60)
               .attr("y", padding - 25)
               .text("Finishing Time");
            svg.append("text")
               .attr("x", width - padding + 22)
               .attr("y", height - padding + 15)
               .text("Year")

            const legend = d3.select("#canvas")
                             .append("svg")
                             .attr("id", "legend")
                             .attr("x", width - 280)
                             .attr("y", 30);
            
            

            const legendPadding = 15;

            legend.append("rect")
                  .attr("x", legendPadding)
                  .attr("y", legendPadding)
                  .attr("height", 10)
                  .attr("width", 10)
                  .style("fill", "crimson");
            
            legend.append("rect")
                  .attr("x", legendPadding)
                  .attr("y", legendPadding * 3)
                  .attr("height", 10)
                  .attr("width", 10)
                  .style("fill", "green");

            legend.append("text")
                  .attr("x", 35)
                  .attr("y", legendPadding * 1.7)
                  .text("Riders with doping allegations");

            legend.append("text")
                  .attr("x", 35)
                  .attr("y", legendPadding * 3.7)
                  .text("No doping allegations");

            d3.select("#canvas")
              .append("rect")
              .attr("x", width - 280)
              .attr("y", 21)
              .attr("width", 260)
              .attr("height", 90)
              .style("fill", "none")
              .style("stroke", "black")
              .style("stroke-width", 2);
        })
        .catch(e => console.log(`Error: ${e}`))
})