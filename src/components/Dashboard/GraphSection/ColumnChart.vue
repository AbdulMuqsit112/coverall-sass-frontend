<template>
  <div class="tile text-center px-6 xl:px-4 2xl:px-8 2xl:py-14">
    <p class="text-sm">Content Access Breakdown</p>
    <p class="font-black text-xs ">Top 3</p>
    <apexchart width="180" height="100" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>
        
<script>

export default {
  name: "ColumnChart",
  data() {
    return {
      series: [
        {
          name: "Sales",
          data: [40, 25, 22],
        },
      ],
      options: {
        colors: ["#46527b"],
        grid: {
          show: false
        },
        toolbar: {
          show: false
        },
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ["#fff"],
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-datalabel",
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },

        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["Feb", "Apr", "Jun"],
        },
        yaxis: {
          show: false,
        },

        fill: {
          opacity: 1,
        },
        tooltip: {
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return seriesName;
              },
            },
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
      },
    };
  },
};
</script>
        
<style>
</style>
        