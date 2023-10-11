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
import DashboardPolicies from '@/components/PoliciesSection/DashboardPolicies.vue';
import DashboardGraphs from '@/components/GraphSection/DashboardGraphs.vue';
import DashboardNotifications from '@/components/NotificationSection/DashboardNotifications.vue';
import { useAuthStore } from '@/store/auth.js'
import { useSchoolStore } from "@/store/school.js";

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
  methods: {
    initiateApiCalls() {
      if (this.userRole == 'district admin'){
        this.fetchDistrictSchools();
        this.fetchDSchoolPolicies();
        this.fetchPeopleData('school admin');
      } else if (this.userRole == 'school admin'){
        this.fetchSchoolStudents();
        this.fetchPeopleData('teacher');
        this.fetchDSchoolPolicies();
      } else if(this.userRole == 'teacher'){
        this.fetchSchoolStudents();
        this.fetchPeopleData('student');
        this.fetchDSchoolPolicies();
      }
    },
    fetchDistrictSchools() {
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchDistrictSchoolsData();
      } catch (error) {
        console.error(error);
      }
    },
    fetchDSchoolPolicies() {
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchDSchoolPolicies();
      } catch (error) {
        console.error(error);
      }
    },
    fetchPeopleData(userType) {
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchPeopleData(userType);
      } catch (error) {
        console.error(error);
      }
    },
    fetchSchoolStudents(){
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchSchoolStudents();
      } catch (error) {
        console.error(error);
      }
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
  },
  mounted(){
    this.initiateApiCalls();
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
    