<template>
  <div class="main-tile flex flex-wrap gap-4 p-6 w-[90vw]">
    <div class="block textbox">
      <p class="font-semibold text-lg">{{ userRole }} Dashboard</p>
      <p class="font-Montserrat text-3xl">Welcome, {{ userName }}</p>
    </div>
    <DashboardGraphs v-if="userRole != 'student'"/>
    <div :class="{'justify-center': userRole != 'content approver',}" class="flex flex-wrap gap-8 mt-4">
      <DashboardNotifications/>
      <DashboardPolicies/>
    <PublishedContent v-if="(userRole == 'student' || userRole == 'content approver') && (isPublishedContent || isContentAwaitApproval)"/>
    </div>
  </div>
</template>

<script>
import DashboardPolicies from '@/components/Dashboard/PoliciesSection/DashboardPolicies.vue';
import DashboardGraphs from '@/components/Dashboard/GraphSection/DashboardGraphs.vue';
import DashboardNotifications from '@/components/Dashboard/NotificationSection/DashboardNotifications.vue';
import PublishedContent from '@/components/Dashboard/PublishedContent.vue';
import { useAuthStore } from '@/store/auth.js'
import { useSchoolStore } from "@/store/school.js";

export default {
  name: "DashboardPage",
  components: {
    DashboardGraphs,
    DashboardNotifications,
    DashboardPolicies,
    PublishedContent
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
      } else if (this.userRole == 'student'){
        this.fetchStudentsClassTeachers()
        this.fetchPublishedContent();
      } else if (this.userRole == 'content approver'){
        this.fetchDSchoolPolicies();
        this.fetchContentAwaitApproval();
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
    },
    fetchStudentsClassTeachers(){
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchStudentsClassTeachers();
      } catch (error) {
        console.error(error);
      }
    },
    fetchPublishedContent(){
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchPublishedContent();
      } catch (error) {
        console.error(error);
      }
    },
    fetchContentAwaitApproval(){
      const schoolStore = useSchoolStore();
      try {
        schoolStore.fetchContentAwaitingApproval();
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
    isPublishedContent(){
      return useSchoolStore().getIsPublishedContentLoaded;
    },
    isContentAwaitApproval(){
      return useSchoolStore().getIsContentAwaitApprovalLoaded;
    }
  },
  mounted(){
    this.initiateApiCalls();
  }
};
</script>
    
<style>
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
    