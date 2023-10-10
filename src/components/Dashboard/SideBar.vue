<template>
  <div class="sidebar flex flex-col float-left gap-10 w-60 xl:w-72 xl:gap-12 h-[90rem] xl:h-auto">
    <div class="flex flex-col items-center">
      <div class="rounded-full">
        <img src="@/assets/icons/Avatar.svg" alt="avatar">
      </div>
      <div class="userBlock">
        <p class="text-xl">{{ userName }}</p>
        <p class="font-normal text-xs">
          {{ userEmail }}
        </p>
      </div>
    </div>
    <MenuItems />
  </div>
</template>

<script>
import MenuItems from '@/components/Dashboard/MenuItems.vue'
import { useAuthStore } from '@/store/auth.js'
export default {
  name: "SideBar",
  components: {
    MenuItems
  },
  data() {
    return {
      userAvatar: '',
      userType: ''
    }
  },
  computed: {
    userName() {
      let user = useAuthStore().getUser;
      return user.firstName + ' ' + user.lastName
    },
    userEmail() {
      return useAuthStore().getUser.email;
    }
  }
}
</script>
      
<style>
.sidebar {
  background-color: white;
  padding-block: 3rem;
  padding-inline: 1rem;
  border-radius: 0.7rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

body {
  background-color: #E7EBF6;
}
</style>
      