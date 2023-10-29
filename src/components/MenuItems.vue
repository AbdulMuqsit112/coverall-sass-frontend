<template>
<div class="flex">
        <ul>
          <li class="sidelinks">
            <img src="@/assets/icons/sidebarIcon1.svg" alt="side bar icon">
            <router-link to="/" active-class="text-xl font-extrabold">
              Dashboard
            </router-link>
          </li>
          <li class="sidelinks">
            <img src="@/assets/icons/sidebarIcon2.svg" alt="side bar icon">
            <router-link to="/schools" active-class="text-xl font-extrabold">
              Schools
            </router-link>
          </li>
          <li class="sidelinks">
            <img src="@/assets/icons/sidebarIcon3.svg" alt="side bar icon">
            <router-link to="/admin" active-class="text-xl font-extrabold">
              Administrator
            </router-link>
          </li>
          <li class="sidelinks">
            <img src="@/assets/icons/sidebarIcon4.svg" alt="side bar icon">
            <router-link to="/policies" active-class="text-xl font-extrabold">
              Policies
            </router-link>
          </li>
          <li class="sidelinks">
            <img src="@/assets/icons/teacher.svg" alt="side bar icon">
            <router-link to="/teachers" active-class="text-xl font-extrabold">
              Teachers
            </router-link>
          </li>
          <li class="sidelinks">
            <img src="@/assets/icons/student.svg" alt="side bar icon">
            <router-link to="/students" active-class="text-xl font-extrabold">
              Students
            </router-link>
          </li>
          <li class="sidelinks">
            <img src="@/assets/icons/student.svg" alt="side bar icon">
            <router-link to="/classes" active-class="text-xl font-extrabold">
              Classes
            </router-link>
          </li>
          <li class="sidelinks">
            <img src="@/assets/icons/student.svg" alt="side bar icon">
            <router-link to="/grades" active-class="text-xl font-extrabold">
              Grades
            </router-link>
          </li>
        </ul>
      </div></template>
  
<script>
export default {
  name: "MenuItems",
  components: {},
};
</script>
  
<style>
.sidelinks {
  font-size: larger;
  font-weight: lighter;
  padding-block: 0.6rem;
  display: flex;
  gap: 1rem;
}
</style>
  