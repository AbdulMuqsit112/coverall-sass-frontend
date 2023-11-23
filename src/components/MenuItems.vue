<template>
  <div class="flex">
    <ul>
      <li class="sidelinks">
        <img src="@/assets/icons/sidebarIcon1.svg" alt="side bar icon" />
        <router-link to="/" active-class="text-xl font-extrabold">
          Dashboard
        </router-link>
      </li>
      <li v-for="menu in menuList" :key="menu" class="sidelinks">
        <img :src="'data:image/png;base64,' + menu.icon" alt="side bar icon" />
        <router-link :to="menu.route" active-class="text-xl font-extrabold">
          {{ menu.link_name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { useSchoolStore } from "@/store/school";
export default {
  name: "MenuItems",
  components: {},
  computed: {
    menuList() {
      let list = useSchoolStore().getMenuList;
      return list.menu_list;
    },
  },
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
