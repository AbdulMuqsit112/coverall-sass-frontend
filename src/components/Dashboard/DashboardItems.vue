<template>
  <div class="dashboard-items flex flex-wrap gap-4 p-6 w-[90vw]">
    <div class="block textbox">
      <p class="font-semibold text-lg">{{ userRole }} Dashboard</p>
      <p class="font-Montserrat text-3xl">Welcome, {{ userName }}</p>
    </div>
    <DashboardGraphs v-if="test"/>
    <div class="flex flex-wrap justify-center gap-8 mt-4">
      <DashboardNotifications/>
      <DashboardPolicies/>
    </div>
  </div>
</template>
    
<script>
import DashboardPolicies from '@/components/Dashboard/PoliciesSection/DashboardPolicies.vue';
import DashboardGraphs from '@/components/Dashboard/GraphSection/DashboardGraphs.vue';
import DashboardNotifications from '@/components/Dashboard/NotificationSection/DashboardNotifications.vue';
import { useAuthStore } from '@/store/auth.js'

export default {
  name: "DashboardItems",
  components: {
    DashboardGraphs,
    DashboardNotifications,
    DashboardPolicies
  },
  data(){
    return{
      test: true,
    }
  },
  computed: {
    userName() {
      let user = useAuthStore().getUser;
      return user.firstName + ' ' + user.lastName
    },
    userRole() {
      return useAuthStore().getUser.role;
    },
  }
};
</script>
    
<style>
.dashboard-items {
  background-color: #f1f3fa;
  border-radius: 1rem;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.tile {
  background-color: white;
  padding-block: 0.5rem;
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}
.textbox{
  width: inherit;
}

</style>
    