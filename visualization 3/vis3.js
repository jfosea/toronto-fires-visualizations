var w = 900,
    h = 600,
    x = -14100,
    y = 7300,
    x_lab = 500,
    y_lab = 0
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

var legend = svg.append("g")
    .attr("transform", "translate("+x_lab+","+y_lab+")");

var opacity_val = [0.3, 0.7, 1, 0.1];

var loss_val = [10000, 50000];

var loss_val_legend = ["<"+loss_val[0], loss_val[0]+ " to " + loss_val[1],
    ">"+loss_val[1], "0"]

var keys = ["Appliance", "Candle", "Electronic Wiring",
    "Heater", "Lightbulb", "Smoker's Article"];

var main_title = svg.append("g")
    .attr("transform", "translate(60,30)");

d3.json("toronto.json", function (data) {

    main_title.append("text")
        .text("Toronto Fire Incidents (2017)")
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-family", "Gill Sans, sans-serif")
        .style("font-size", "15pt")

    paths.selectAll("area")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#dddddd")
        .attr("stroke-width", "1")
        .attr("stroke", "#ffffff")

    d3.csv("final.csv", function (data) {

        legend.append("text")
            .attr("x", 90)
            .attr("y", 80)
            .text("Ignition Source")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-family", "Gill Sans, sans-serif")
            .style("font-size", "7pt")

        legend.selectAll("mydots")
            .data(keys)
            .enter()
            .append("circle")
            .attr("cx", 100)
            .attr("cy", function (d, i) {
                return 100 + i * 20
            })
            .attr("r", 5)
            .style("fill",
                function (d) {
                    var cause = d
                    if (cause == "Appliance") {
                        return "#58d454"
                    } else if (cause == "Candle") {
                        return "#30bac5"
                    } else if (cause == "Electronic Wiring") {
                        return "#ffd214"
                    } else if (cause == "Heater") {
                        return "#ff8029"
                    } else if (cause == "Lightbulb") {
                        return "#df0000"
                    } else if (cause == "Smoker's Article") {
                        return "#4f40d6"
                    }
                })

        legend.selectAll("mylabels")
            .data(keys)
            .enter()
            .append("text")
            .attr("x", 110)
            .attr("y", function (d, i) {
                return 100 + i * 20
            })
            .text(function (d) {
                return d
            })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-family", "Gill Sans, sans-serif")
            .style("font-size", "7pt")

        legend.append("text")
            .attr("x", 90)
            .attr("y", 250)
            .text("Estimated Dollar Loss")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-family", "Gill Sans, sans-serif")
            .style("font-size", "7pt")
        
        legend.selectAll("myopacity_dots")
            .data(opacity_val)
            .enter()
            .append("circle")
            .attr("cx", 100)
            .attr("cy", function (d, i) {
                return 270 + i * 20
            })
            .attr("r", 5)
            .attr("fill", "#151414")
            .attr("opacity", function(d) {return d})

        legend.selectAll("myopacity_text")
            .data(loss_val_legend)
            .enter()
            .append("text")
            .attr("x", 110)
            .attr("y", function(d,i) {
                return 270 + i * 20
            })
            .text(function (d) {return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .style("font-family", "Gill Sans, sans-serif")
            .style("font-size", "7pt")

        paths.selectAll("fire")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "fire")
            .attr("r", 5)
            .attr("cx", function (d) {
                var coords = projection([d.Longitude, d.Latitude])
                return coords[0]
            })
            .attr("cy", function (d) {
                var coords = projection([d.Longitude, d.Latitude])
                return coords[1]
            })
            .attr("fill",
                function (d) {
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
            .attr("opacity", function(d) {
                var loss = d.Estimated_Dollar_Loss
                if (loss < loss_val[0]) {
                    return opacity_val[0]
                } else if (loss >= loss_val[0] && loss < loss_val[1]) {
                    return opacity_val[1]
                } else if (loss >= loss_val[1]) {
                    return opacity_val[2]
                } else {
                    return opacity_val[3]
                }
            })
    });

});


