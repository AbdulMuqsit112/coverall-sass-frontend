<template>
  <div :class="{
    'h-44': userRole == 'content approver',
    'h-40': userRole != 'content approver',
  }" class="tile flex flex-wrap flex-col gap-6 px-4 md:w-[30rem] xl:w-[28.2rem]">
    <p class="font-Montserrat">Notifications</p>
    <div class="flex gap-4">
      <img src="@/assets/icons/bell.svg" alt="bell">
      <p>Turn on push notifications</p>
    </div>
    <div class="flex gap-4">
      <img src="@/assets/icons/block.svg" alt="bell">
      <p>5 policy violations</p>
    </div>
  </div>
</template>
        
<script>
import { useAuthStore } from '@/store/auth';
export default {
  name: "NotificationsBoard",
  computed: {
    userRole() {
      return useAuthStore().getUser.role;
    }
  }
};
</script>
        
<style scoped></style>
        