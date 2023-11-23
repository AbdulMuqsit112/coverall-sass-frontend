<template>
  <div class="dashboard flex flex-col gap-8">
    <TopBar v-if="isAuthenticated"/>
    <AlertComponent v-if="showAlert" :text="alertText" :alertColor="alertColor"/>
    <div class="flex container mx-auto gap-6 xl:gap-10 my-12" v-if="isAuthenticated">
      <SideBar v-if="isMenuItems"/>
      <router-view></router-view>
    </div>
    <loaderComponent v-else/>
    <PageFooter v-if="isAuthenticated"/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import AlertComponent from "./components/AlertComponent.vue";
import SideBar from "@/components/SideBar.vue";
import PageFooter from "@/components/PageFooter.vue";
import loaderComponent from "./components/loaderComponent.vue";
import { useAuthStore } from "@/store/auth.js";
import { useSchoolStore } from "./store/school";
export default {
  name: 'App',
  components: {
    TopBar,
    SideBar,
    PageFooter,
    AlertComponent,
    loaderComponent
  },
  methods: {
    async fetchUser() {
      const authStore = useAuthStore();
      try {
        await authStore.getUserDetails();
        
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMenuList() {
      const schoolStore = useSchoolStore();
      try {
        await schoolStore.fetchMenuList();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    await this.fetchUser();
  },
  computed: {
    isAuthenticated(){
      return useAuthStore().getIsAuthenticated;
    },
    showAlert(){
      return useSchoolStore().getAlertVal;
    },
    alertText(){
      return useSchoolStore().getAlertText;
    },
    alertColor(){
      return useSchoolStore().getAlertColor;
    },
    isMenuItems(){
      return useSchoolStore().getIsMenuListLoaded;
    }
  },
  watch: {
    isAuthenticated(val){
      if (val){
        this.fetchMenuList();
      }
    }
  }
}
</script>

<style>
@import url('./assets/styles/index.css');
.dashboard {
  background-color: #e7ebf6;
}
</style>
