<template>
  <div class="tile flex flex-wrap flex-col gap-6 h-60 px-4 md:w-[30rem] xl:w-[28.2rem]">
    <div class="flex justify-between">
      <div class="flex gap-2">
        <p class="font-Montserrat">School Administrators</p>
        <div class="bg-black rounded-xl w-10 h-4/5 flex justify-center gap-1">
          <img src="@/assets/icons/person.svg" alt="hat">
          <p class="text-white text-xs mt-[0.2rem]">{{ schoolAdmins.length }}</p>
        </div>
      </div>
      <button class="rounded-lg text-white text-xs bg-blue-400 px-3 py-1">Manage</button>
    </div>
    <div class="flex flex-wrap gap-4">
      <div class="flex gap-4" v-for="admin in schoolAdmins" :key="admin">
        <img src="@/assets/icons/avatar1.png" alt="avatar">
        <div class="">
          <p class="text-sm font-black">{{ admin.first_name + ' '+ admin.last_name }}</p>
          <p class="text-xs font-light">{{ admin.school_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
          
<script>
import { useSchoolStore } from '@/store/school';
export default {
  name: "SchoolAdmin",
  data(){
    return {
      schoolAdmins:[]
    }
  },
  methods: {
    getSchoolAdmins(){
      this.schoolAdmins = useSchoolStore().getSchoolAdmins;
      console.log(this.schoolAdmins);
    },
  },
  mounted(){
    this.getSchoolAdmins();
  }
};
</script>
          
<style scoped>
</style>
          