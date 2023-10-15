<template>
  <div class="main-tile flex p-8">
    <TableComponent :columns="['id', 'name', 'address', 'subscription_status', 'subscription_date']" :data="distictSchools" :dropdownColumns="['subscription_status']" :editableColumns="['name']"/>
  </div>
</template>
  
<script>
import TableComponent from '@/components/TableComponent.vue';
import { useSchoolStore } from '@/store/school';
export default {
  name: "SchoolPage",
  components: {
    TableComponent
  },
  computed: {
    distictSchools(){
      return useSchoolStore().getDistictSchoolsData;
    },
    isDistictSchools(){
      return useSchoolStore().getIsDSchoolLoaded;
    }
  },
  methods: {
    fetchDSchools(){
      useSchoolStore().fetchDistrictSchoolsData();
    }
  },
  created(){
    this.fetchDSchools();
  }

};
</script>
  
<style></style>
  