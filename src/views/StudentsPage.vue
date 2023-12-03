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
    :isAdd="true"
    @add-record="toggleModal" 
    @delete-record="deleteStudents"
    />
    <ModalComponent
      v-if="isAddStudent"
      :inputFields="studentInputFields"
      :dropdownOptions="dropdownOptions"
      :title="'Add Student'"
      @close-modal="toggleModal"
      @submited-data="addStudents"
    />
    <loaderComponent v-else/>
  </div>
</template>
  
<script>
import TableComponent from "@/components/TableComponent.vue";
import loaderComponent from "@/components/loaderComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
export default {
  name: "StudentsPage",
  components: {
    TableComponent,
    loaderComponent,
    ModalComponent
  },
  data(){
    return {
      isAddStudent: false,
      studentInputFields: [
        { id: 1, label: "first_name", value: "" },
        { id: 2, label: "last_name", value: "" },
        { id: 3, label: "email", value: "", type: "email" },
        { id: 3, label: "password", value: "", type: "password" },
      ],
      dropdownOptions: []
    }
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
    toggleModal(){
      if (!this.isAddStudent) this.generateGradeOptions();
      this.isAddStudent = !this.isAddStudent
    },
    fetchStudents() {
      useSchoolStore().fetchPeopleData('student');
    },
    fetchTeacherGrades() {
      useSchoolStore().fetchTeachersGrades();
    },
    deleteStudents(id) {
      useSchoolStore().deletePerson(id, "student");
    },
    generateGradeOptions() {
      this.dropdownOptions = [];
      let grades = useSchoolStore().getTeacherGrades;
      const opt = grades.map((item) => ({
        label: item.grade_name,
        value: item.id,
      }));
      let option = {
        id: 1,
        label: "Grade",
        selectedOption: "",
        options: opt,
      };
      this.dropdownOptions.push(option);
    },
    addStudents(Student){
      if (Student){
        let dData = Student.dropDownData.pop();
        let params = {
          first_name: Student.first_name,
          last_name: Student.last_name,
          email: Student.email,
          password: Student.password,
          school_id: useAuthStore().getUser.schoolId,
          role: 'student',
          grade_id: dData.selectedOption
        };
        useSchoolStore().createStudent(params);
      }
      this.toggleModal();
    },
  },
  created() {
    this.fetchStudents();
    this.fetchTeacherGrades();
  },
};
</script>
  
<style></style>
  