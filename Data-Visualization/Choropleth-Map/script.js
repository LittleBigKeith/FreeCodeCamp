document.addEventListener("DOMContentLoaded", () => {
	fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json")
	   .then(res => res.json())
	   .then(geoData => {
			fetch("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")
			.then(res => res.json())
			.then(eduData => {
				const width = 950;
				const height = 600;

				const svg = d3.select("body")
							  .append("svg")
							  .attr("height", height)
							  .attr("width", width);

				const path= d3.geoPath();

				usMap = svg.append("g")
				           .attr("fill", "none")
						   .attr("stroke", "black")
						   .attr("stroke-linejoin", "round")
						   .attr("stroke-linecap", "round")

				maxEducationRate = d3.max(eduData, d => d.bachelorsOrHigher);
				minEducationRate = d3.min(eduData, d => d.bachelorsOrHigher);
				console.log(maxEducationRate);
				const colorScaleDiverging = d3
               .scaleDiverging(d3.interpolateRdYlGn)
               .domain([minEducationRate, (maxEducationRate + minEducationRate) / 3, maxEducationRate])
               .clamp(true);

				const totalThresholds = 10

				const step = (maxEducationRate - minEducationRate) / totalThresholds;

				const thresholdScaleDomain = d3.range(totalThresholds).map((d) => {
					return (d) * step + minEducationRate;
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
					.style("background-color", "#FFFFDDEE")
					.style("z-index", "99")
					.style("border-radius", "30px")
					.style("font-family", "Tahoma, san-serif")
					.style("box-shadow", "3px 3px 10px 0")
					.style("text-align", "center");

				usMap.selectAll("path")
				   .data(topojson.feature(geoData, geoData.objects.counties).features)
				   .enter()
				   .append("path")
				   .attr("class", "county")
				   .attr("data-fips", d => eduData.find(e => e.fips === d.id).fips)
				   .attr("data-education", d => eduData.find(e => e.fips === d.id).bachelorsOrHigher)
				   .attr("stroke", "#AAA")
				   .attr("stroke-width", "0.5")
				   .attr("d", path)
				   .attr("fill", d => myColor(eduData.find(e => e.fips === d.id).bachelorsOrHigher))
				   .on("mouseover", function(event){const dataPoint = event.target.__data__; const eduPoint = eduData.find(e => e.fips === dataPoint.id); d3.select(this).style("stroke", "gray").style("stroke-width", 2); tooltip.html(`${eduPoint.area_name} - ${eduPoint.state}<br>${eduPoint.bachelorsOrHigher}%`); return tooltip.style("visibility", "visible").attr("data-education", eduPoint.bachelorsOrHigher);})
               	   .on("mousemove", function(event){return tooltip.style("top", (event.clientY - 30) + "px").style("left", (event.clientX + 50) + "px");})
                   .on("mouseout", function(event){d3.select(this).style("stroke", "none"); return tooltip.style("visibility", "hidden");});
				
				usMap.append("path")
				   .datum(topojson.mesh(geoData, geoData.objects.states), (a, b) => a !== b)
				   .attr("class", "states")
				   .attr("stroke-width", "0.5")
				   .attr("d", path)
				
				usMap.append("path")
				     .datum(topojson.mesh(geoData, geoData.objects.nation), (a, b) => a !== b)
				     .attr("class", "nation")
				     .attr("d", path)

				const legendScale = d3.scaleBand()
					 .range([0, 500])
					 .domain(thresholdScaleDomain.map(d => d))
					 .padding(0.01);

				const legendAxis = d3.axisBottom(legendScale)
									.tickFormat(d => d.toFixed(0));

				const legend = svg.append("g")
								.attr("id", "legend")
								.attr("transform", "translate(350, 30)")
								.call(legendAxis);

				legend.selectAll()
					.data(thresholdScaleDomain.filter((d, i) => i < thresholdScaleDomain.length - 1))
					.enter()
					.append("rect")
					.attr("width", legendScale.bandwidth())
					.attr("height", 20)
					.attr("x", d => legendScale(d) + 24)
					.attr("y", -20)
					.style("fill", d => myColor(d));


				svg.append("text")
					.attr("x", 856)
					.attr("y", 44)
					.text("%");
			})
			.catch(e => console.log(`Error: ${e}`))
		})
		.catch(e => console.log(`Error: ${e}`));
});
