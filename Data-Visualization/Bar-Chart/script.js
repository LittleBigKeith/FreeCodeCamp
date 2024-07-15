document.addEventListener("DOMContentLoaded", () => {
    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
        .then(res => res.json())
        .then(data => {
            const height = window.innerHeight * 0.8;
            const width = window.innerWidth * 0.8;
            const padding = 60;
            const bar_width = 12;
            const dp = data.data;
            const tempColor = null;

            const dateToQuarter = (date) => {
                switch (date.slice(-5)) {
                    case "01-01":
                        return date.substring(0, date.length - 6) + " Q1"
                    case "04-01":
                        return date.substring(0, date.length - 6) + " Q2"
                    case "07-01":
                        return date.substring(0, date.length - 6) + " Q3"
                    case "10-01":
                        return date.substring(0, date.length - 6) + " Q4"
                    default:
                        return date;
                }
            }
            
            document.getElementById("title").textContent += ` (${dateToQuarter(dp[0][0])} - ${dateToQuarter(dp[dp.length - 1][0])})`
            
            

            const xScale = d3.scaleTime()
                             .domain([new Date(dp[0][0]), new Date(dp[dp.length - 1][0])])
                             .range([padding, width - padding]);

            const yScale = d3.scaleLinear()
                             .domain([0, d3.max(dp, ([date, d]) => d)])
                             .range([height - padding, padding]);

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
                              .style("box-shadow", "3px 3px 10px 0");
            const svg = d3.select("body")
                          .append("svg")
                          .attr("height", height)
                          .attr("width", width);
            
            const fillFn = (d, i) => `rgb(${(80 + i) % 60}, ${(160 + i) % 60 + 60}, ${(240 + i) % 60  + 120})`;
            svg.selectAll("rect")
               .data(dp)
               .enter()
               .append("rect")
               .attr("class", "bar")
               .attr("x", ([date, gdp], i) => xScale(new Date(date)))
               .attr("y", ([date, gdp], i) => yScale(gdp))
               .attr("width", (width - 2 * padding) / dp.length )
               .attr("height", ([date, gdp], i) => height - yScale(gdp) - padding)
               .attr("data-date", ([date, gdp], i) => date)
               .attr("data-gdp", ([date, gdp], i) => gdp)
               .attr("index", (d, i) => i)
               .style("fill", fillFn)
               .on("mouseover", function(event){const dataPoint = event.target.__data__; d3.select(this).style("fill", "gold"); tooltip.html(`${dateToQuarter(dataPoint[0])}<br>$${dataPoint[1]} B`); return tooltip.style("visibility", "visible").attr("data-date", dataPoint[0]).attr("data-gdp", dataPoint[1]);})
               .on("mousemove", function(event){return tooltip.style("top", (event.pageY-70)+"px").style("left",(event.pageX-105)+"px");})
               .on("mouseout", function(event){d3.select(this).style("fill", () => fillFn(0, this.attributes.index.value)); return tooltip.style("visibility", "hidden");});

            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale);

            svg.append("g")
               .attr("id", "x-axis")
               .attr("transform", "translate(0, " + (height - padding) + ")")
               .call(xAxis);
            
            svg.append("g")
               .attr("id", "y-axis")
               .attr("transform", "translate(" + padding + ", 0)")
               .call(yAxis);
            
            svg.append("text")
               .attr("x", width - padding + 20)
               .attr("y", height - padding + 18)
               .style("font-size", "18px")
               .text("Year");

            svg.append("text")
               .attr("x", padding - 60)
               .attr("y", padding - 40)
               .text(`Gross Domestic Product (GDP)`)
            svg.append("text")
               .attr("x", padding - 60)
               .attr("y", padding - 18)
               .text("in $Billion");
        })
        .catch(e => console.log(`Error: ${e}`));
})