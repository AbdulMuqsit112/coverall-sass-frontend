<template>
    <div class="tile flex flex-wrap flex-col gap-6 h-40 px-4 md:w-[30rem] xl:w-[28.2rem]">
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
  export default {
    name: "NotificationsBoard",
  };
  </script>
        
  <style scoped>
</style>
        