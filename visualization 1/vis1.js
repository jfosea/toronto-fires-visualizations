var w = 900,
    h = 600,
    x = -14100,
    y = 7300,
    scale = 66700;

var projection = d3.geo.albers()
    .translate([x, y])
    .scale([scale]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var paths = svg.append("g");

d3.json("toronto.json", function (data) {

    paths.selectAll("area")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#dddddd")
        .attr("stroke-width", "1")
        .attr("stroke", "#ffffff")

    d3.csv("final.csv", function (data) {
        console.log(data);

        paths.selectAll("fire")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "fire")
            .attr("r", function (d) {
                var cost = Math.log(d.Estimated_Dollar_Loss)
                return cost
            })
            .attr("cx", function (d) {
                var coords = projection([d.Longitude, d.Latitude])
                return coords[0]
            })
            .attr("cy", function (d) {
                var coords = projection([d.Longitude, d.Latitude])
                return coords[1]
            })
            .attr("fill", function (d) {
                var cause = d.Ignition_Source
                if (cause == "appliance") {
                    return "#58d454"
                } else if (cause == "candle") {
                    return "#30bac5"
                } else if (cause == "electronic wiring") {
                    return "#ffd214"
                } else if (cause == "heater") {
                    return "#ff8029"
                } else if (cause == "lightbulb") {
                    return "#df0000"
                } else if (cause == "smoker's article") {
                    return "#4f40d6"
                }
            })
            .attr("opacity", "0.7")
    });
});
