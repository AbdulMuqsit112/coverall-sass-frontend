<template>
  <div class="tile flex flex-wrap flex-col gap-6 h-60 px-4 md:w-[30rem] xl:w-[28.2rem] 2xl:w-[33rem]">
    <div class="flex justify-between">
      <div class="flex gap-2">
        <p class="font-Montserrat">{{ cardTitle }}</p>
        <div class="bg-black rounded-xl w-10 h-4/5 flex justify-center gap-1">
          <img src="@/assets/icons/person.svg" alt="hat" />
          <p class="text-white text-xs mt-[0.2rem]">{{ peopleData.length }}</p>
        </div>
      </div>
      <router-link :to="url" class="rounded-lg text-white text-xs bg-blue-400 px-3 py-1">
        Manage
      </router-link>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex gap-3" v-for="person in peopleData" :key="person">
        <img src="@/assets/icons/avatar1.png" alt="avatar" />
        <div class="">
          <p class="text-sm font-black">
            {{ person.first_name + " " + person.last_name }}
          </p>
          <p class="text-xs font-light">
            {{
              role == "district admin" ? person.school_name : person.grade_name
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
export default {
  name: "PeopleCard",
  data() {
    return {
      cardTitle: "",
      peopleData: [],
      role: "",
      url: ""
    };
  },
  methods: {
    getPeopleData() {
      let people = useSchoolStore().getPeopleData;
      this.peopleData = people.slice(0, 6);
      this.role = useAuthStore().getUser.role;
      if (this.role == "district admin") {
        this.cardTitle = "School Administrators";
      } else if (this.role == "school admin") {
        this.cardTitle = "School Teachers";
        this.url = "/teachers"
      } else if (this.role == "teacher"){
        this.cardTitle = "Students";
      }
    },
  },
  mounted() {
    this.getPeopleData();
  },
};
</script>

<style scoped></style>
