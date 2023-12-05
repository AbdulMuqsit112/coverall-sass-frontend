<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Students -->
    <TableComponent
      v-if="isGrades"
      :columns="['grade_id', 'grade_name', 'students_count']"
      :data="gradesData"
      :isDelete="false"
      :title="'Grades'"
      :isAdd="userRole == 'school admin'"
      @add-record="toggleModal"
    />
    <loaderComponent v-else/>
    <ModalComponent
      v-if="isAddGrade"
      :inputFields="gradeInputFields"
      :title="'Add Grade'"
      @close-modal="toggleModal"
      @submited-data="addGrade"
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
  name: "GradesPage",
  components: {
    TableComponent,
    ModalComponent,
    loaderComponent
  },
  data() {
    return {
      gradeInputFields: [{ id: 1, label: "name", value: "" }],
      isAddGrade: false,
    };
  },
  computed: {
    gradesData() {
      return useSchoolStore().getSchoolStudents;
    },
    isGrades() {
      return useSchoolStore().getIsSchoolStudentsLoaded;
    },
    userRole() {
      return useAuthStore().getUser.role;
    },
  },
  methods: {
    fetchGrades() {
      useSchoolStore().fetchSchoolStudents();
    },
    async toggleModal() {
      this.isAddGrade = !this.isAddGrade;
    },
    addGrade(data) {
      let params = {
        grade_name: data.name,
      };
      useSchoolStore().createGrades(params);
      this.toggleModal();
    },
  },
  created() {
    this.fetchGrades();
  },
};
</script>

<style></style>
