<template>
  <div class="dashboard flex flex-col gap-8">
    <AlertComponent v-if="showAlert"/>
    <TopBar/>
    <div class="flex container mx-auto gap-6 xl:gap-10 my-12">
      <SideBar/>
      <router-view v-if="isAuthenticated"></router-view>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import AlertComponent from "./components/AlertComponent.vue";
import SideBar from "@/components/SideBar.vue";
import PageFooter from "@/components/PageFooter.vue";
import { useAuthStore } from "@/store/auth.js";
import { useSchoolStore } from "./store/school";
export default {
  name: 'App',
  components: {
    TopBar,
    SideBar,
    PageFooter,
    AlertComponent
  },
  methods: {
    fetchUser() {
      const authStore = useAuthStore();
      try {
        authStore.getUserDetails();
        
      } catch (error) {
        useSchoolStore().setAlert(error.msg, 'error');
        console.error(error);
      }
    },
  },
  created() {
    this.fetchUser();
  },
  computed: {
    isAuthenticated(){
      return useAuthStore().getIsAuthenticated;
    },
    showAlert(){
      return useSchoolStore().getAlertVal;
    },
  }
}
</script>

<style>
@import url('./assets/styles/index.css');
.dashboard {
  background-color: #e7ebf6;
}
</style>
