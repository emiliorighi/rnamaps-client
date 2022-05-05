<template>
<div style="min-width:350px">
    <!-- <svg ref="heatmap"></svg> -->
    <svg ref="histogram"/>
    <svg ref="piechart"/>
    <div ref="tooltip"/>
</div>
</template>
<script>
import {pieChart, histoGram} from '../d3-helper'
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
                const hG = histoGram({...stats.human,...stats.fly}, this.$refs.histogram)
                pieChart(stats, this.$refs.piechart,this.$refs.tooltip, this.width, hG)

            })
        }
    }
}
</script>

<style scoped>
.x-labels{
    font-family: Raleway;
}
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
  stroke: white;
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