<template>
  <div class="tile px-6 xl:px-4 2xl:px-8 2xl:py-14">
    <p class="pt-2 text-sm font-Montserrat text-center">Bandwidth Usage</p>
    <apexchart type="area" width="180" height="120" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [
        {
          name: 'series 1',
          data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
          markers: {
            show: false,
          },
        },
        {
          name: 'series 2',
          data: [20, 40, 50, 60, 70, 80],
          markers: {
            show: false,
          },
        },
      ],
      options: {
        chart: {
          stacked: true,
          id: "area-chart",
          toolbar: {
            show: false,
          },
          fill: {
            type: 'gradient',
          },
        },
        colors: ['#7970B6', '#66DA26', '#2E93fA', '#546E7A', '#E91E63', '#FF9800'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ["2017", "2018", "2019", "2022", "2023", "2024"],
        },
        yaxis: {
          min: 0,
          max: 150,
          tickAmount: 2
        },
        stroke: {
          curve: "smooth",
        },
      },
    };
  },
};
</script>
