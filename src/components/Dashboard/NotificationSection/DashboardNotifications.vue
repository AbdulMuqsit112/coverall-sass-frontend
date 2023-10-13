<template>
  <div class="flex flex-wrap flex-col gap-6">
    <NotificationBoard />
    <SchoolDistrict v-if="IsDSchoolLoaded" />
    <SchoolGrade v-if="isSchoolStudentsLoaded || isStudentClassTeachersLoaded"/>
    <PublishedContent v-if="showContent"/>
  </div>
</template>
<script>
import { useSchoolStore } from '@/store/school.js'
import SchoolDistrict from './SchoolDistrict.vue'
import NotificationBoard from "./NotificationBoard.vue";
import SchoolGrade from './SchoolGrade.vue';
import PublishedContent from './PublishedContent.vue';
export default {
  name: "DashboardNotifications",
  components: {
    NotificationBoard,
    SchoolDistrict,
    SchoolGrade,
    PublishedContent
  },
  data(){
    return{
      showContent: false
  }},
  computed: {
    IsDSchoolLoaded() {
      return useSchoolStore().getIsDSchoolLoaded;
    },
    isSchoolStudentsLoaded(){
      return useSchoolStore().getIsSchoolStudentsLoaded;
    },
    isStudentClassTeachersLoaded(){
      return useSchoolStore().getIsStudentClassTeachersLoaded;
    }
  }
};
</script>
<style></style>
        