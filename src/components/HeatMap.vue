<template>
<div>
    <svg ref="heatmap"></svg>
    <svg ref="piechart"/>
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
            return 450 - this.margin.left - this.margin.right
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
            // const svg = 
            // d3.select(this.$refs.heatmap)
            //     .attr("width", this.width + this.margin.left + this.margin.right)
            //     .attr("height", this.height + this.margin.top + this.margin.bottom)
            //     .append("g")
            //     .attr("transform",
            //     "translate(" + this.margin.left + "," + this.margin.top + ")");
            // const stats = {
            //         human:{},
            //         fly:{}
            //     }
        // d3.tsv("metadata.tsv", row => {
        //     //manipulate data here
        //     if(stats[row.organism]){
        //         if(stats[row.organism][row.dataType]){
        //             stats[row.organism][row.dataType]++
        //         }else{
        //             stats[row.organism][row.dataType] = 1
        //         }
        //     }
        //     return row
        // })
        // .then(() => {
        //     var color = d3.scaleOrdinal()
        //     .domain(['human','fly'])
        //     .range(d3.schemeCategory10)
        //   // var pC ={},    
        // var pieDim ={w:250, h: 250};
        // pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
        // const totalExps = ['human','fly'].map(function(d){
        //     return {type: d, freq: d3.sum(Object.values(stats[d]))}
        // })
        // // create svg for pie chart.
        // var piesvg = d3.select(this.$refs.piechart)
        //     .attr("width", pieDim.w)
        //     .attr("height", pieDim.h)
        //     .append("g")
        //     .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
        
        // // create function to draw the arcs of the pie slices.
        // var arc = d3.arc()
        // .outerRadius(pieDim.r - 10)
        // .innerRadius(0);

        // var arcOver = d3.arc()
        // .innerRadius(0)
        // .outerRadius(150 + 10);
        // // create a function to compute the pie slice angles.
        // // var pie = 
        // var pie = d3.pie()
        // .value(function(d) { return d.freq; });

        // // var dataReady = pie(d3.entries())
        // // Draw the pie slices.
        // piesvg.selectAll(".arc")
        // .data(pie(totalExps))
        // .enter()
        // .attr("class","arc").attr("d", arc)
        //     .each(function(d) { this._current = d; })
        //     .style("fill", function(d) { return color(d); })
        //     .append('text')
        //     .on("mousemove",function(d){

        //     })

        // create function to update pie-chart. This will be used by histogram.
        // pC.update = function(nD){
        //     piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
        //         .attrTween("d", arcTween);
        // }        
        // // Utility function to be called on mouseover a pie slice.
        // function mouseover(d){
        //     // call the update function of histogram with new data.
        //     hG.update(fData.map(function(v){ 
        //         return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
        // }
        // //Utility function to be called on mouseout a pie slice.
        // function mouseout(d){
        //     // call the update function of histogram with all data.
        //     hG.update(fData.map(function(v){
        //         return [v.State,v.total];}), barColor);
        // }
        // // Animating the pie-slice requiring a custom function which specifies
        // // how the intermediate paths should be drawn.
        // function arcTween(a) {
        //     var i = d3.interpolate(this._current, a);
        //     this._current = i(0);
        //     return function(t) { return arc(i(t));    };
        // }    
        // return pC;
        // })
        }
    }
}
</script>