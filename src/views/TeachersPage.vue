<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Teachers -->
    <TableComponent
      v-if="isTeachers && isGrades"
      :columns="[
        'id',
        'full_name',
        'email',
        'grade_name',
        'Password Reset',
        'status'
      ]"
      :data="teachersData"
			:dropdownColumns="['status', 'grade_name']"
      :isDelete="true"
      :title="'School Teachers'"
			:gradeData="grades"
      :isReset="true"
      :isAdd="false"
      @delete-record="deleteTeacher"
      @update-record="updateTeachers"
      @update-grades="updateGrades"
      @reset-password="resetPassword"
    />
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
export default {
  name: "TeachersPage",
  components: {
    TableComponent,
  },
  computed: {
    teachersData() {
      return useSchoolStore().getPeopleData;
    },
    isTeachers() {
      return useSchoolStore().getIsPeopleDataLoaded;
    },
    isGrades() {
      return useSchoolStore().getIsGradesDataLoaded;
    },
    grades(){
      let grades =  useSchoolStore().getGradesData;
      return grades.map(obj => obj.grade_name);
    }
  },
  methods: {
    fetchTeachers() {
      useSchoolStore().fetchPeopleData('teacher')
		},
    fetchGrades() {
			let schoolId = useAuthStore().getUser.schoolId;
      useSchoolStore().fetchGrades(schoolId)
		},
    deleteTeacher(id) {
      useSchoolStore().deletePerson(id, "teacher");
    },
    updateTeachers(teacher) {
      useSchoolStore().updatePerson({ ...teacher }, 'teacher');
    },
    resetPassword(record) {
      useAuthStore().resetPassword(record.id);
    },
    updateGrades(record) {
			let schoolId = useAuthStore().getUser.schoolId;
      let gradesData = useSchoolStore().getGradesData;
      let gradeObj = gradesData.find(item => item.grade_name === record.grade_name);
      if (gradeObj){
        useSchoolStore().updateGrade(record.id, gradeObj.id, record.role, schoolId);
      } else {
        console.log("Something Went Wrong");
      }
    },
  },
  created() {
    this.fetchTeachers();
		this.fetchGrades();
  },
};
</script>

<style></style>
