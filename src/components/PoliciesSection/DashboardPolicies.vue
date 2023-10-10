<template>
  <div class="flex flex-wrap flex-col gap-6">
    <SchoolAdmin v-if="isSchoolAdminsLoaded"/>
    <PoliciesBoard v-if="isPoliciesLoaded"/>
  </div>
</template>
        
<script>
import SchoolAdmin from './SchoolAdmin.vue';
import PoliciesBoard from './PoliciesBoard.vue';
import { useSchoolStore } from '@/store/school';
export default {
  name: "DashboardPolicies",
  components: {
    PoliciesBoard,
    SchoolAdmin
},
computed: {
  isPoliciesLoaded(){
    return useSchoolStore().getIsDSchoolPolicyLoaded;
  },
  isSchoolAdminsLoaded(){
    return useSchoolStore().getIsSchoolAdminsLoaded
  }
}
};
</script>
        
<style>
</style>
        