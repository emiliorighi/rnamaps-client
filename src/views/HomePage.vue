<template>
  <v-container>
      <v-row>
          <v-col>
            <pie-chart/>
          </v-col>
      </v-row>
    <v-row>
        <v-col cols="3">
            <v-img 
                src="../assets/human.png"
                lazy-src="../assets/human.png"
            />
            <!-- add stats:
                    interactive heat maps in HP 
                    page specific stats:


             -->
        </v-col>
        <v-col cols="9">
            <time-line/>
        </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="3">
        <form-list/>
      </v-col>
      <v-col cols="9">
        <data-table/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import TimeLine from '@/components/TimeLine.vue'
import FormList from '@/components/FormList.vue'
import PieChart from '@/components/PieChart.vue'
//here put barcharts and pie charts and links to human or droso page
export default {
  components: { DataTable, TimeLine, FormList, PieChart },
    name: 'HomePage',
    // data: () => ({
    // )}
  }
</script>
