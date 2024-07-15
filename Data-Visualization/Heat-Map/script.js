document.addEventListener("DOMContentLoaded", () => {
    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
        .then(res => res.json())
        .then(dataset => {
            const baseTemperature = dataset.baseTemperature;
            dataset = dataset.monthlyVariance;
            console.log(dataset);
            const startYear = d3.min(dataset, d => d.year);
            const endYear = d3.max(dataset, d => d.year);
            const minVariance = d3.min(dataset, d => d.variance);
            const maxVariance = d3.max(dataset, d => d.variance);
            document.getElementById("description").textContent = `${startYear} - ${endYear}: base temperature ${baseTemperature}°C`

            const padding = 60;
            const legendPadding = 40;
            const width = window.innerWidth * 0.96;
            const height = window.innerHeight * 0.8;

            const svg = d3.select("body")
                          .append("svg")
                          .attr("id", "canvas")
                          .attr("height", height)
                          .attr("width", width);

            const years = Array.from(new Set(dataset.map(d => d.year))).sort((a, b) => a - b);
            const months = Array.from(new Set(dataset.map(d => d.month))).sort((a, b) => a - b);

            const xScale = d3.scaleBand()
                            .range([padding, width - padding])
                            .domain(years)
                            .padding(0.01);

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(xScale.domain().filter((d, i) => !(d % 10)));
            
            svg.append("g")
               .attr("id", "x-axis")
               .attr("transform", "translate(0, " + (height - padding - legendPadding) + ")")
               .call(xAxis);

            const yScale = d3.scaleBand()
                             .range([padding, height - padding - legendPadding])
                             .domain(months)
                             .padding(0.01);

            const monthToLongStr = (d) => new Date(2024, d - 1).toLocaleString('default', { month: 'long' });
            const yAxis = d3.axisLeft(yScale)
                            .tickFormat(d => monthToLongStr(d));

            svg.append("g")
               .attr("id", "y-axis")
               .attr("transform", "translate(" + padding + ", 0)")
               .call(yAxis);

            const colorScaleDiverging = d3
               .scaleDiverging(d3.interpolateRdYlBu)
               .domain([maxVariance, 0.005, minVariance])
               .clamp(true)

            const totalThresholds = 10

            const step = (maxVariance - minVariance) / totalThresholds

            const thresholdScaleDomain = d3.range(totalThresholds).map((d) => {
                return (d + 1) * step + minVariance
            })

            let thresholdScaleRange = thresholdScaleDomain.map((d) => {
            return colorScaleDiverging(d)
            })
            
            var myColor = d3.scaleThreshold()
                            .domain(thresholdScaleDomain)
                            .range(thresholdScaleRange)

            const tooltip = d3.select("body")
                              .append("div")
                              .attr("id", "tooltip")
                              .style("position", "absolute")
                              .style("visibility", "hidden")
                              .style("padding", "0.8rem")
                              .style("background-color", "#DDDDDDEE")
                              .style("z-index", "99")
                              .style("border-radius", "30px")
                              .style("font-family", "Tahoma, san-serif")
                              .style("box-shadow", "3px 3px 10px 0")
                              .style("text-align", "center");
            
            svg.selectAll()
               .data(dataset, d => d.year + ":" + d.month)
               .enter()
               .append("rect")
               .attr("class", "cell")
               .attr("data-year", d => d.year)
               .attr("data-month", d => d.month - 1)
               .attr("data-temp", d => baseTemperature + d.variance)
               .attr("x", d => xScale(d.year))
               .attr("y", d => yScale(d.month))
               .attr("width", xScale.bandwidth())
               .attr("height", yScale.bandwidth())
               .style("fill", d => myColor(d.variance))
               .on("mouseover", function(event){const dataPoint = event.target.__data__; d3.select(this).style("stroke", "gray").style("stroke-width", 2); tooltip.html(`${dataPoint.year} - ${monthToLongStr(dataPoint.month)}<br>${(baseTemperature + dataPoint.variance).toFixed(1)}°C<br>${dataPoint.variance.toFixed(1)}°C`); return tooltip.style("visibility", "visible").attr("data-year", dataPoint.year);})
               .on("mousemove", function(event){console.log(event); return tooltip.style("top", (event.target.attributes.y.value)+"px").style("left",(event.pageX-75)+"px");})
               .on("mouseout", function(event){d3.select(this).style("stroke", "none"); return tooltip.style("visibility", "hidden");});
            
            const legendScale = d3.scaleBand()
                                  .range([padding * 2, padding * 10])
                                  .domain(thresholdScaleDomain.map(d => baseTemperature + d))
                                  .padding(0.01);

            const legendAxis = d3.axisBottom(legendScale)
                                 .tickFormat(d => d.toFixed(2));

            const legend = svg.append("g")
                              .attr("id", "legend")
                              .attr("transform", "translate(0, " + (height - legendPadding + 20) + ")")
                              .call(legendAxis);

            legend.selectAll()
               .data(thresholdScaleDomain.filter((d, i) => i < thresholdScaleDomain.length - 1))
               .enter()
               .append("rect")
               .attr("width", legendScale.bandwidth())
               .attr("height", 20)
               .attr("x", d => legendScale(baseTemperature + d) + 24)
               .attr("y", -20)
               .style("fill", d => myColor(d));

            svg.append("text")
               .attr("x", width - padding + 20)
               .attr("y", height - padding - 25)
               .style("font-size", "18px")
               .text("Year");

            svg.append("text")
               .attr("x", padding - 48)
               .attr("y", padding - 20)
               .text(`Month`)

            svg.append("text")
               .attr("x",  610)
               .attr("y", height - 5)
               .text(`Temperature (°C)`)
         })
         .catch(e => console.log(`Error: ${e}`));
})