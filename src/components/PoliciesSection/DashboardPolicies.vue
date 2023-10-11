<template>
  <div class="flex flex-wrap flex-col gap-6">
    <PeopleCard v-if="IsPeopleDataLoaded"/>
    <PoliciesBoard v-if="isPoliciesLoaded"/>
  </div>
</template>
        
<script>
import PeopleCard from './PeopleCard.vue';
import PoliciesBoard from './PoliciesBoard.vue';
import { useSchoolStore } from '@/store/school';
export default {
  name: "DashboardPolicies",
  components: {
    PoliciesBoard,
    PeopleCard
},
computed: {
  isPoliciesLoaded(){
    return useSchoolStore().getIsDSchoolPolicyLoaded;
  },
  IsPeopleDataLoaded(){
    return useSchoolStore().getIsPeopleDataLoaded;
  }
}
};
</script>
        
<style>
</style>
        