<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Teachers -->
    <TableComponent
      v-if="isTeachers && isGrades"
      :columns="[
        'id',
        'full_name',
        'email',
        // 'grade_name',
        'Password Reset',
        // 'status'
      ]"
      :data="teachersData"
			:dropdownColumns="['status', 'grade_name']"
      :isDelete="true"
      :title="'School Teachers'"
			:gradeData="grades"
      :isReset="true"
      :isAdd="userRole == 'school admin'"
      @delete-record="deleteTeacher"
      @update-record="updateTeachers"
      @update-grades="updateGrades"
      @reset-password="resetPassword"
      @add-record="toggleModal"
    />
    <loaderComponent v-else/>
    <ModalComponent
      v-if="isAddTeacher"
      :inputFields="studentInputFields"
      :title="'Add Teacher'"
      @close-modal="toggleModal"
      @submited-data="addStudents"
    />
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import loaderComponent from "@/components/loaderComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
export default {
  name: "TeachersPage",
  components: {
    TableComponent,
    loaderComponent,
    ModalComponent
  },
  data(){
    return {
      isAddTeacher: false,
      studentInputFields: [
        { id: 1, label: "first_name", value: "" },
        { id: 2, label: "last_name", value: "" },
        { id: 3, label: "email", value: "", type: "email" },
      ],
      dropdownOptions: []
    }
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
    },
    userRole(){
      return useAuthStore().getUser.role;
    }
  },
  methods: {
    toggleModal(){
      this.isAddTeacher = !this.isAddTeacher
    },
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
    addStudents(teacher){
      if (teacher){
        let params = {
          first_name: teacher.first_name,
          last_name: teacher.last_name,
          email: teacher.email,
          school_id: useAuthStore().getUser.schoolId,
          role: 'teacher',
        };
        useSchoolStore().createUser(params, 'teacher');
      }
      this.toggleModal();
    },
  },
  created() {
    this.fetchTeachers();
		this.fetchGrades();
  },
};
</script>

<style></style>
