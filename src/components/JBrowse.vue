<template>
  <div ref="jbrowse">
  </div>
</template>

<script>
import '@fontsource/roboto'
import {
  JBrowseLinearGenomeView,
  createViewState
} from '@jbrowse/react-linear-genome-view'
import * as ReactDOM from 'react-dom'
import React from 'react'
import assembly from '../assembly'


  export default {
    props:['defaultSession','configuration','tracks'],
    data: () => ({
      assembly: assembly,
    }), 
    computed:{
      changeData(){
        const {assembly,defaultSession, configuration, tracks} = this
        return {assembly, defaultSession, configuration, tracks}
      }
    },
    watch:{
      changeData:{
        handler: function(){
          ReactDOM.render(
            React.createElement(JBrowseLinearGenomeView, {viewState: new createViewState({tracks:this.tracks, assembly: this.assembly})}),
            this.$refs.jbrowse
          )
        },
        deep:true
      }
    },
    mounted(){
      ReactDOM.render(
        React.createElement(JBrowseLinearGenomeView, {viewState: new createViewState({tracks:this.tracks, assembly: this.assembly})}),
        this.$refs.jbrowse
      )
    }
  }
</script>