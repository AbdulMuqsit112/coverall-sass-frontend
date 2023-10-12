<template>
    <DashboardItems v-if="isAuthenticated"/>
</template>

<script>
import DashboardItems from "@/components/DashboardItems.vue";
import { useAuthStore } from "@/store/auth.js";

export default {
  name: "DashboardPage",
  components: {    
    DashboardItems,
  },
  computed: {
    isAuthenticated(){
      return useAuthStore().getIsAuthenticated;
    }
  }
};
</script>

<style>

</style>
