<template>
  <div class="dashboard">
    <TopBar v-if="isAuthenticated"/>
    <div class="flex container mx-auto gap-6 xl:gap-10 my-3">
      <SideBar v-if="isAuthenticated"/>
      <DashboardItems v-if="isAuthenticated"/>
    </div>
    <PageFooter v-if="isAuthenticated"/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";
import DashboardItems from "@/components/DashboardItems.vue";
import PageFooter from "@/components/PageFooter.vue";
import { useAuthStore } from "@/store/auth.js";

export default {
  name: "DashboardPage",
  components: {
    TopBar,
    SideBar,
    DashboardItems,
    PageFooter,
  },
  methods: {
    setToken() {
      let token = localStorage.getItem("token");
      if (token) {
        this.fetchUser();
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get("token");
        localStorage.setItem("token", token);
        this.fetchUser();
      }
    },
    fetchUser() {
      const authStore = useAuthStore();
      try {
        authStore.getUserDetails();
        
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    useAuthStore().$reset();
    this.setToken();
  },
  computed: {
    isAuthenticated(){
      return useAuthStore().getIsAuthenticated;
    }
  }
};
</script>

<style>
.dashboard {
  background-color: #e7ebf6;
}
</style>
