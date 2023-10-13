<template>
  <div class="tile flex flex-wrap flex-col gap-8 h-64 px-4 md:w-[30rem] xl:w-[28.2rem]">
    <div class="flex justify-between">
      <div class="flex gap-2">
        <p class="font-Montserrat">{{ TextTitle }}</p>
      </div>
      <button class="rounded-lg text-white text-xs bg-blue-400 px-3 py-1">Manage</button>
    </div>
    <div class="flex flex-wrap gap-12">
      <div class="flex gap-3" v-for="st in data" :key="st">
        <div class="bg-transparent border rounded-full w-10 h-10 flex justify-center items-center">{{ st.grade_name[0] }}
        </div>
        <div class="">
          <p class="text-sm font-black">{{ st.grade_name }}</p>
          <p class="text-xs font-light">{{ st.students_count }}</p>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <hr>
      <p class="text-center underline cursor-pointer mt-1">See All</p>
    </div>
  </div>
</template>
          
<script>
import { useSchoolStore } from '@/store/school.js'
import { useAuthStore } from '@/store/auth';
export default {
  name: "SchoolGrade",
  data() {
    return {
      data: [],
      TextTitle: ''
    }
  },
  methods: {
    getDistrictSchools() {
      let students = useSchoolStore().getSchoolStudents;
      this.data = students.slice(0, 4);
    },
    getStudentClassTeacher(){
      this.data = useSchoolStore().getStudentClassTeachers;
    },
  },
  mounted() {
    let role = useAuthStore().getUser.role;
    if (role == 'school admin') {
      this.TextTitle = 'School Students';
      this.getDistrictSchools();
    } else if (role == 'teacher') {
      this.TextTitle = 'Grade/Class';
      this.getDistrictSchools();
    } else {
      this.TextTitle = 'Grade/Class';

    }
  }

};
</script>
          
<style scoped></style>
          