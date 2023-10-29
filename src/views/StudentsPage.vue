<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Students -->
    <TableComponent v-if="isStudents" 
    :columns="[
      'id',
      'full_name',
      'email',
      'grade_name',
      'risk_score'
    ]" 
    :data="studentsData" 
    :isDelete="userRole == 'school admin'"
    :title="'School Students'" 
    :isAdd="false" 
    @delete-record="deleteStudents"
    />
  </div>
</template>
  
<script>
import TableComponent from "@/components/TableComponent.vue";
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
export default {
  name: "StudentsPage",
  components: {
    TableComponent,
  },
  computed: {
    studentsData() {
      return useSchoolStore().getPeopleData;
    },
    isStudents() {
      return useSchoolStore().getIsPeopleDataLoaded;
    },
    userRole(){
      return useAuthStore().getUser.role
    }
  },
  methods: {
    fetchStudents() {
      useSchoolStore().fetchPeopleData('student')
    },
    deleteStudents(id) {
      useSchoolStore().deletePerson(id, "student");
    },
  },
  created() {
    this.fetchStudents();
  },
};
</script>
  
<style></style>
  