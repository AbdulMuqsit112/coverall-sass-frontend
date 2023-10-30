<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Students -->
    <TableComponent v-if="isContent" :columns="[
      'id',
      'full_name',
      'email',
      'grade_name',
      'embed_code'
    ]" :data="studentsData" :isDelete="userRole == 'school admin'" :title="'School Students'" :isAdd="false"
      @delete-record="deleteStudents" />
    <loaderComponent v-else />
  </div>
</template>
    
<script>
import TableComponent from "@/components/TableComponent.vue";
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
import loaderComponent from "@/components/loaderComponent.vue";
export default {
  name: "ContentPage",
  components: {
    TableComponent,
    loaderComponent
  },
  computed: {
    studentsData() {
      return useSchoolStore().getContentAwaitApproval;
    },
    isContent() {
      return useSchoolStore().getIsContentAwaitApprovalLoaded;
    },
    userRole() {
      return useAuthStore().getUser.role
    }
  },
  methods: {
    fetchContentAwaitApp() {
      useSchoolStore().fetchContentAwaitingApproval();
    },
    deleteStudents(id) {
      useSchoolStore().deletePerson(id, "student");
    },
  },
  created() {
    this.fetchContentAwaitApp();
  },
};
</script>
    
<style></style>
    