<template>
  <div class="flex flex-wrap flex-col gap-6">
    <NotificationBoard />
    <SchoolDistrict v-if="IsDSchoolLoaded" />
  </div>
</template>
<script>
import { useSchoolStore } from '@/store/school.js'
import SchoolDistrict from './SchoolDistrict.vue'
import NotificationBoard from "./NotificationBoard.vue";
export default {
  name: "DashboardNotifications",
  components: {
    NotificationBoard,
    SchoolDistrict
  },
  computed: {
    IsDSchoolLoaded() {
      return useSchoolStore().getIsDSchoolLoaded;
    }
  }
};
</script>
<style></style>
        