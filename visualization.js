var w = 900,
    h = 600,
    x = -14100,
    y = 7300,
    scale=66700;

var projection = d3.geo.albers()
    .translate([x,y])
    .scale([scale]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map")
    .append("svg")
    .attr("width",w)
    .attr("height",h);

var paths = svg.append("g");

// d3.json("toronto.json",function(error, data){
//
//     paths.selectAll("area")
//         .data(data.features)
//         .enter()
//         .append("path")
//         .attr("d",path)
//         .attr("fill", "#b5b4b4")
//         .attr("stroke-width", "1")
//         .attr("stroke", "#ffffff")
// });


d3.json("toronto.json",function(data){

    paths.selectAll("area")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d",path)
        .attr("fill", "#b5b4b4")
        .attr("stroke-width", "1")
        .attr("stroke", "#ffffff")

    d3.csv("final.csv", function(data) {
        console.log(data);

        paths.selectAll("fire")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "fire")
            .attr("r", function(d) {
                var cost = d.Estimated_Dollar_Loss / 15000
                return cost
            })
            .attr("cx", function(d) {
                var coords = projection([d.Longitude, d.Latitude])
                return coords[0]
            })
            .attr("cy", function(d) {
                var coords = projection([d.Longitude, d.Latitude])
                return coords[1]
            })
            .attr("fill", function(d) {
                var cause = d.Ignition_Source
                if (cause == "appliance") {
                    return "#911212"
                } else if (cause == "candle") {
                    return "#85c149"
                } else {
                    return "#0d76e0"
                }
            })
            .attr("opacity", "0.7")
    });
});




