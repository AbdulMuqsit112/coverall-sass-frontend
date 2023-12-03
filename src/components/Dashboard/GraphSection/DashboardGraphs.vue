<template>
  <div class="flex flex-wrap py-2 gap-6 justify-center xl:gap-8 2xl:gap-10 xl:h-44">
    <ColumnChart/>
    <PolicyViolations/>
    <DeviceBreakdown/>
    <BandwidthUsage/>
  </div>
</template>
      
<script>
import BandwidthUsage from './BandwidthUsage.vue'
import PolicyViolations from './PolicyViolations.vue';
import DeviceBreakdown from './DeviceBreakdown.vue';
import ColumnChart from './ColumnChart.vue';

export default {
  name: "DashboardGraphs",
  components: {
    ColumnChart,
    PolicyViolations,
    DeviceBreakdown,
    BandwidthUsage
  },
};
</script>
      
<style>
</style>
      