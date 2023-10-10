<template>
  <div class="tile flex flex-wrap flex-col gap-6 px-4 xl:h-64 md:w-[30rem] xl:w-[28.2rem]">
    <div class="flex justify-between">
      <div class="flex gap-2">
        <p class="font-Montserrat">District Schools</p>
        <div class="bg-black rounded-xl w-10 h-4/5 flex justify-center gap-1">
          <img src="@/assets/icons/hat.svg" alt="hat">
          <p class="text-white text-xs mt-[0.2rem]">{{ districtSchools.length }}</p>
        </div>
      </div>
      <button class="rounded-lg text-white text-xs bg-blue-400 px-3 py-1">Manage</button>
    </div>
    <div class="flex gap-4" v-for="dSchool in districtSchools" :key="dSchool">
        <img src="@/assets/icons/schoolIcon.svg" alt="bell">
        <div>
          <p class="font-black">{{ dSchool.name }}</p>
          <p class="text-xs">{{ dSchool.address }}</p>
        </div>
    </div>
    <hr>
    <p class="text-center underline cursor-pointer">See All</p>
  </div>
</template>
        
<script>
import { useSchoolStore } from '@/store/school.js'

export default {
  name: "SchoolDistrict",
  data(){
    return {
      districtSchools: [],
    }
  },
  methods: {
    getDistrictSchools() {
      this.districtSchools = useSchoolStore().getDistictSchoolsData;
    },
  },
  mounted(){
    this.getDistrictSchools();
  }

};
</script>
        
<style scoped></style>
        