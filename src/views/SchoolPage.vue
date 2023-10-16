<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <TableComponent 
    v-if="isDistictSchools" 
    :columns="['id', 'name', 'address','school_type', 'subscription_status', 'subscription_date']"
    :data="distictSchools" :stateColumns="['subscription_status']" 
    :editableColumns="['name', 'address']" 
    :isDelete="true"
    :title="'District Schools'"
    @delete-record="deleteDSchool"
    />
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
    },
    deleteDSchool(id){
      useSchoolStore().deleteDistrictSchool(id);
    },
  },
  created(){
    this.fetchDSchools();
  }
};
</script>
  
<style></style>
  