import * as d3 from "d3"

function pieChart(data, ref, tooltipRef, width, hG){
    var color = d3.scaleOrdinal()
    .domain(['human','fly'])
    .range(d3.schemeCategory10)
// var pC ={},    
    var pieDim ={w:300, h: 300};
    pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
    const totalExps = ['human','fly'].map(function(d){
        return {type: d, freq: d3.sum(Object.values(data[d]))}
    })
// create svg for pie chart.
    var piesvg = d3.select(ref)
        // .attr("viewBox", [-this.outerRadius, this.windowSize, this.width, this.width])
        .attr("width", pieDim.w)
        .attr("height", pieDim.h)
        .append("g")
        .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
// create function to draw the arcs of the pie slices.
    var arc = d3.arc()
    .outerRadius(pieDim.r - 100)
    .innerRadius(0);

    var arcOver = d3.arc()
    .outerRadius(pieDim.r - 75)
    .innerRadius(0)
// create a function to compute the pie slice angles.
// var pie = 
    var pie = d3.pie()
    .value(function(d) { return d.freq; });
    
    var tooltip = d3.select(tooltipRef)
    .attr("class", "tooltip")
    .style("opacity", 0.5)
    .style('display', 'none')

    tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "#ffffff")
    .style("opacity", 0.5);

    tooltip.append("div")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "1.5em")
    .attr("font-weight", "bold");

// var dataReady = pie(d3.entries())
// Draw the pie slices.
    var g = piesvg.selectAll(".arc")
    .data(pie(totalExps))
    .enter().append("g")
    .attr('class', "arc")
    .on("mouseover", function(event, d) {
        tooltip.style("display", null)
        hG.update(Object.entries(data[d.data.type]),color(d.data.type))
    })
    .on("mousemove", function(event, d) {
        tooltip.transition()
        .duration(200)
        .style("opacity", 0.9)
        tooltip.html('Total <strong>'+d.data.type+'</strong> experiments: '+d.data.freq)	
        .style("left", (event.layerX) + "px")		
        .style("top", (event.layerY-15) + "px");	
        d3.select(this.firstChild).transition()
        .attr("d", arcOver);
    })
    .on("mouseout", function() {
        tooltip.style("display", "none")
        hG.update(Object.entries({...data.human,...data.fly}),'#69b3a2')
        d3.select(this.firstChild).transition()
        .attr("d", arc)
        .attr("stroke", "none");
    })

    g.append("path")
    .attr("d", arc)
    .style("fill", function(d) {
        return color(d.data.type);
    })

    g.append("text")
    .attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = pieDim.r;
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor","middle")
    .text(function(d){
        return d.data.freq
    })

    var count = 0;
//Legend for charts 
    var legend = piesvg.selectAll(".legend")
    .data(totalExps).enter()
    .append("g").attr("class", "legend")
    .attr("legend-id", function() {
        return count++;
    })
    .attr("transform", function(d, i) {
        return "translate(-30," + (-90 + i * 20) + ")";
    });

    legend.append("rect")
    .attr("x", width / 1.9)
    .attr("word-wrap", "break-word")
    .attr("width", 18).attr("height", 18)
    .style("fill", function(d) {
        return color(d.type);
    });
    legend.append("text")
    .attr("x", width / 2)
    .attr("y", 9).attr("dy", ".35em")
    .style("text-anchor", "end").text(function(d) {
        return d.type;
    })
    .style("font-weight", 'bold');
}

function histoGram(data, ref){
    /*
    data structure
    {
        human: {exp keys,value}
        fly: {exp keys,value}
    }
    */
    // var color = d3.scaleOrdinal()
    // .domain(Object.keys(data))
    // .range(d3.schemeCategory10)
    var hG = {}
    const mappedData = Object.entries(data)
    var hGDim = {t: 30, r: 30, b: 70, l: 60};
    hGDim.w = 500 - hGDim.l - hGDim.r, 
    hGDim.h = 300 - hGDim.t - hGDim.b;
        
    //create svg for histogram.
    var hGsvg = d3.select(ref)
        .attr("width", hGDim.w + hGDim.l + hGDim.r)
        .attr("overflow", 'visible')
        .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
        .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

    var x = d3.scaleBand()
    // .rangeRoundBands([0, hGDim.w], 0.1)
        .domain(mappedData.map(function(d) { return d[0]; }))
        .range([0, hGDim.w])
        .padding(0.2)

    // Add x-axis to the histogram svg.
    hGsvg.append("g").attr("class", "x axis")
        .attr("transform", "translate(0," + hGDim.h + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("class", "x-labels")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-family", "Raleway");

    var y = d3.scaleLinear()
    .domain([0, d3.max(mappedData, function(d) { return d[1]})+100])
    .range([hGDim.h, 0])
    
    hGsvg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("class", "y-labels")
    .style("text-anchor", "end")
    .style("font-family", "Raleway");
        //create the rectangles.
        // .on("mouseover",mouseover)// mouseover is defined below.
        // .on("mouseout",mouseout);// mouseout is defined below.
    hGsvg.selectAll("mybar")
    .data(mappedData)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => x(d[0]))
    .attr("y", d => y(d[1]))
    .attr("width", x.bandwidth())
    .attr("height", d => hGDim.h - y(d[1]))
    .attr("fill", "#69b3a2")

    hG.update = function(nD, color){
        console.log('updating')
        console.log(nD)
        console.log(color)
        // update the domain of the y-axis map to reflect change in frequencies.
        x.domain(nD.map(function(d){return d[0]}))
        y.domain([0, d3.max(nD, function(d) { return d[1]; })+100]);
        var svg = hGsvg.transition()
        svg.select('.x')
        .attr("transform", "translate(0," + hGDim.h + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-family", "Raleway");   
        svg.select(".y")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("class", "y-labels")
        .style("text-anchor", "end")
        .style("font-family", "Raleway");
        hGsvg.selectAll('rect')
        .data(nD)
        .join("rect")
        .transition()
        .duration(750)
        .attr("x", d => x(d[0]))
        .attr("y", d => y(d[1]))
        .attr("width", x.bandwidth())
        .attr("height", d => hGDim.h - y(d[1]))
        .attr("fill", color); 
 

    
    }        
    return hG;
    
}

export {pieChart,histoGram}