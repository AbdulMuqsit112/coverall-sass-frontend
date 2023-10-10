<template>
  <div class="dashboard">
    <TopBar />
    <div class="flex container mx-auto gap-6 xl:gap-10 my-3">
      <SideBar />
      <DashboardItems/>
    </div>
    <PageFooter />
  </div>
</template>
      
<script>
import TopBar from '@/components/TopBar.vue';
import SideBar from '@/components/SideBar.vue';
import DashboardItems from '@/components/DashboardItems.vue';
import PageFooter from '@/components/PageFooter.vue';
import { useAuthStore } from '@/store/auth.js';
import { useSchoolStore } from '@/store/school.js'

export default {
  name: "DashboardPage",
  components: {
    TopBar,
    SideBar,
    DashboardItems,
    PageFooter
  },
  methods: {
    initiateApiCalls() {
    this.fetchUser();
    this.fetchDistrictSchools();
    this.fetchDSchoolPolicies();
    this.fetchSchoolAdmins();
    },
    setToken() {
      let token = localStorage.getItem('token');
      if (token) {
        this.initiateApiCalls();
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get('token');
        localStorage.setItem('token', token);
        this.initiateApiCalls();
      }
    },
    fetchUser() {
      const authStore = useAuthStore();
      try {
        authStore.getUserDetails()
      } catch (error) {
        console.error(error)
      }
    },
    fetchDistrictSchools(){
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchDistrictSchoolsData();
      } catch (error) {
        console.error(error)
      }
    },
    fetchDSchoolPolicies(){
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchDSchoolPolicies();
      } catch (error) {
        console.error(error)
      }
    },
    fetchSchoolAdmins(){
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchSchoolAdmins();
      } catch (error) {
        console.error(error)
      }
    }
  },
  created() {
    useAuthStore().$reset()
    useSchoolStore().$reset()
    this.setToken();
  },
};
</script>
      
<style>
.dashboard {
  background-color: #E7EBF6;
}
</style>
