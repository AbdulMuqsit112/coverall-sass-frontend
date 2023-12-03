<template>
  <div
    :class="{
      'h-64 xl:w-[28.2rem]': role !== 'student',
      'h-40 xl:w-[30rem]': role === 'student',
    }"
    class="tile flex-col flex-wrap  flex px-4 md:w-[30rem] 2xl:w-[33rem] gap-8"
  >
    <div class="flex justify-between">
      <div class="flex gap-2">
        <p class="font-Montserrat">{{ TextTitle }}</p>
      </div>
      <button class="rounded-lg text-white text-xs bg-blue-400 px-3 py-1">
        Manage
      </button>
    </div>
    <div class="flex flex-wrap gap-12">
      <div class="flex gap-3" v-for="st in data" :key="st">
        <div
          class="bg-transparent border rounded-full w-10 h-10 flex justify-center items-center"
        >
          {{ role == "student" ? st.class_name[0] : st.grade_name[0] }}
        </div>
        <div class="">
          <p class="text-sm font-black">
            {{ role == "student" ? st.class_name : st.grade_name }}
          </p>
          <p class="text-xs font-light">
            {{ role == "student" ? st.teacher_name : st.students_count }}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-10" v-if="role !='student'">
      <hr />
      <p class="text-center underline cursor-pointer mt-1">See All</p>
    </div>
  </div>
</template>

<script>
import { useSchoolStore } from "@/store/school.js";
import { useAuthStore } from "@/store/auth";
export default {
  name: "SchoolGrade",
  data() {
    return {
      data: [],
      TextTitle: "",
      role: "",
    };
  },
  methods: {
    getDistrictSchools() {
      let students = useSchoolStore().getSchoolStudents;
      this.data = students.slice(0, 4);
    },
    getStudentClassTeacher() {
      let teachers = useSchoolStore().getStudentClassTeachers;
      this.data = teachers.slice(0, 2);
    },
  },
  mounted() {
    this.role = useAuthStore().getUser.role;
    if (this.role == "school admin") {
      this.TextTitle = "School Students";
      this.getDistrictSchools();
    } else if (this.role == "teacher") {
      this.TextTitle = "Grade/Class";
      this.getDistrictSchools();
    } else {
      this.TextTitle = "Grade/Class";
      this.getStudentClassTeacher();
    }
  },
};
</script>

<style scoped></style>
