<template>
  <div :class="{'flex-wrap': userRole === 'student', 'flex-col': userRole !== 'student'}" class="flex gap-6">
    <NotificationBoard />
    <SchoolDistrict v-if="IsDSchoolLoaded" />
    <SchoolGrade v-if="isSchoolStudentsLoaded || isStudentClassTeachersLoaded"/>
  </div>
</template>
<script>
import { useSchoolStore } from '@/store/school.js'
import { useAuthStore } from '@/store/auth';
import SchoolDistrict from './SchoolDistrict.vue'
import NotificationBoard from "./NotificationBoard.vue";
import SchoolGrade from './SchoolGrade.vue';
export default {
  name: "DashboardNotifications",
  components: {
    NotificationBoard,
    SchoolDistrict,
    SchoolGrade,
  },
  
  computed: {
    IsDSchoolLoaded() {
      return useSchoolStore().getIsDSchoolLoaded;
    },
    isSchoolStudentsLoaded(){
      return useSchoolStore().getIsSchoolStudentsLoaded;
    },
    isStudentClassTeachersLoaded(){
      return useSchoolStore().getIsStudentClassTeachersLoaded;
    },
    userRole(){
      return useAuthStore().getUser.role;
    }
  }
};
</script>
<style></style>
        