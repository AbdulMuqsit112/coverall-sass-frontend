<template>
  <div class="tile px-6 xl:px-4 2xl:px-8 2xl:py-14">
    <p class="py-2 text-sm font-Montserrat text-center">Device Breakdown</p>
    <apexchart type="pie" :series="series" width="170" height="120" :options="options"></apexchart>
  </div>
</template>

<script>
export default {
  name: "DeviceBreakdown",
  data() {
    return {
      series: [30, 20, 50],
      options: {
        chart: {
          type: "pie",
        },
        labels: ["Laptop", "SmartPhone", "Desktop"],
        colors: ["#313851", "#71ACB9", "#8371A8"],
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            let index = opts.seriesIndex;
            let name = opts.w.config.labels[index];
            return name + "\n" + val + "%";
          },
          style: {
            colors: ["#313851", "#71ACB9", "#8371A8"],
            fontFamily: 'Source Sans Pro',
            fontSize: '7px',
          },
          dropShadow: {
            enabled: false, // add this to remove the shadow
          },
        },
        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 30,
            }
          }
        }
      },

    }
  }
};

</script>
          
<style scoped>
</style>
