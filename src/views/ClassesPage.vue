<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Classes -->
    <TableComponent
      v-if="isClasses && userRole == 'school admin'"
      :columns="['id', 'name', 'grade_name', 'teacher_name']"
      :data="classesData"
      :isDelete="true"
      :title="'Classes'"
      :isAdd="true"
      @add-record="toggleModal"
      @delete-record="deleteClasses"
    />
    <TableComponent
      v-else-if="isStudentClasses && userRole == 'student'"
      :columns="['id', 'class_name', 'teacher_name']"
      :data="studentClasses"
      :isDelete="false"
      :isEnrolled="true"
      :title="'Classes'"
    />
    <loaderComponent v-else />
    <ModalComponent
      v-if="isAddClass"
      :inputFields="classInputFields"
      :dropdownOptions="dropdownOptions"
      :title="'Add Class'"
      :isConditional="true"
      :conditionalDropdowns="conditionalDropdowns"
      @close-modal="toggleModal"
      @submited-data="addClass"
      @add-dropdown="addGradeTeacher"
    />
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import loaderComponent from "@/components/loaderComponent.vue";
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
export default {
  name: "ClassesPage",
  components: {
    TableComponent,
    ModalComponent,
    loaderComponent,
  },
  data() {
    return {
      classInputFields: [{ id: 1, label: "name", value: "" }],
      dropdownOptions: [],
      conditionalDropdowns: [],
      isAddClass: false,
    };
  },
  computed: {
    classesData() {
      return useSchoolStore().getclassesData;
    },
    isClasses() {
      return useSchoolStore().getIsClassesLoaded;
    },
    userRole() {
      return useAuthStore().getUser.role;
    },
    studentClasses() {
      return useSchoolStore().getStudentClassTeachers;
    },
    isStudentClasses() {
      return useSchoolStore().getIsStudentClassTeachersLoaded;
    },
  },
  methods: {
    fetchStudentsClassTeachers() {
      useSchoolStore().fetchStudentsClassTeachers();
    },
    fetchClasses() {
      useSchoolStore().fetchClasses();
    },
    fetchGrades() {
      let id = useAuthStore().getUser.schoolId;
      useSchoolStore().fetchGrades(id);
    },
    generateGradeOptions() {
      this.dropdownOptions = [];
      let grades = useSchoolStore().getGradesData;
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
    async addGradeTeacher(id) {
      this.conditionalDropdowns = [];
      let teachers = [];
      let opt = [];
      await useSchoolStore().fetchGradesTeacher(id);
      if (useSchoolStore().getIsGradesTeachersLoaded) {
        teachers = useSchoolStore().getGradesTeachers;
        opt = teachers.map((item) => ({
          label: item.teacher_name,
          value: item.teacher_user_id,
        }));
      }
      let option = {
        id: 1,
        label: "Teachers",
        selectedOption: useSchoolStore().getIsGradesTeachersLoaded
          ? opt[0].value
          : "",
        options: opt,
      };
      this.conditionalDropdowns.push(option);
    },
    deleteClasses(id) {
      useSchoolStore().deleteClass(id);
    },
    async toggleModal() {
      if (!this.isAddClass) {
        this.generateGradeOptions();
      } else {
        this.conditionalDropdowns = [];
      }
      this.isAddClass = !this.isAddClass;
    },
    addClass(data) {
      let grade = data.dropDownData.pop();
      let teacher = data.condDropdown.pop();
      let params = {
        name: data.name,
        grade_id: grade.selectedOption,
        user_id: teacher.selectedOption,
      };
      useSchoolStore().createClasses(params);
      this.toggleModal();
    },
  },
  created() {
    if (this.userRole == "school admin") {
      this.fetchClasses();
      this.fetchGrades();
    } else if (this.userRole == "student") this.fetchStudentsClassTeachers();
  },
};
</script>

<style></style>
