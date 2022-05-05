<template>
<div style="min-width:350px">
    <!-- <svg ref="heatmap"></svg> -->
    <svg ref="piechart"/>
    <div ref="tooltip"/>
</div>
</template>
<script>
import * as d3 from "d3"

export default {
    data(){
        return {
            domains: [],
            humanData:[],
            flyData:[],
            margin:{top: 80, right: 25, bottom: 30, left: 40},
        }
    },
    computed:{
        width(){
            return this.$refs.piechart.clientWidth
        },
        height(){
            return 450 - this.margin.top - this.margin.bottom
        }

    },
    mounted(){
        this.createD3HeatMap()
    },
    methods:{
        createD3HeatMap(){
            const stats = {
                    human:{},
                    fly:{}
                }
            d3.tsv("metadata.tsv", row => {
                //manipulate data here
                if(stats[row.organism]){
                    if(stats[row.organism][row.dataType]){
                        stats[row.organism][row.dataType]++
                    }else{
                        stats[row.organism][row.dataType] = 1
                    }
                }
                return row
            })
            .then(() => {
                var color = d3.scaleOrdinal()
                .domain(['human','fly'])
                .range(d3.schemeCategory10)
            // var pC ={},    
                var pieDim ={w:300, h: 300};
                pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
                const totalExps = ['human','fly'].map(function(d){
                    return {type: d, freq: d3.sum(Object.values(stats[d]))}
                })
            // create svg for pie chart.
                var piesvg = d3.select(this.$refs.piechart)
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
                
                var tooltip = d3.select(this.$refs.tooltip)
                // .append("div")
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
                .on("mouseover", function() {
                    console.log('1')
                    tooltip.style("display", null);
                })
                .on("mousemove", function(event, d) {
                    console.log('2')
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9)
                    tooltip.html(d.data.type)	
                    .style("left", (event.layerX) + "px")		
                    .style("top", (event.layerY-15) + "px");	
                    d3.select(this.firstChild).transition()
                    .attr("d", arcOver);
                })
                .on("mouseout", function() {
                    tooltip.style("display", "none")
                    d3.select(this.firstChild).transition()
                    .attr("d", arc)
                    .attr("stroke", "none");
                })

                g.append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color(d.data.type);
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
                .attr("x", this.width / 1.9)
                .attr("word-wrap", "break-word")
                .attr("width", 18).attr("height", 18)
                .style("fill", function(d) {
                    return color(d.type);
                });
                legend.append("text").attr("x", this.width / 2)
                .attr("y", 9).attr("dy", ".35em")
                .style("text-anchor", "end").text(function(d) {
                    return d.type;
                });
            })
        }
    }
}
</script>

<style>

.tooltip {
  position: absolute;
  text-align: center;
  width: fit-content;
  height: auto;
  padding: 1rem;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}

path {
  stroke: steelblue;
  stroke-width: 2;
}

.tooltip {
  color: black;
}

.container {
  text-align: center;
  padding: 15px;
}

</style>