<template>
  <div class="dashboard flex flex-col gap-8">
    <TopBar/>
    <div class="flex container mx-auto gap-6 xl:gap-10 my-12">
      <SideBar/>
      <router-view></router-view>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";
import PageFooter from "@/components/PageFooter.vue";
import { useAuthStore } from "@/store/auth.js";

export default {
  name: 'App',
  components: {
    TopBar,
    SideBar,
    PageFooter
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
    this.setToken();
  },
}
</script>

<style>
@import url('./assets/styles/index.css');
.dashboard {
  background-color: #e7ebf6;
}
</style>
