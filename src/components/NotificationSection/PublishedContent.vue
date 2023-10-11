<template>
  <div class="tile flex flex-wrap flex-colgap-6 px-4 md:w-[30rem] xl:w-[60rem]">
    <div class="flex justify-between w-full">
      <p class="font-Montserrat">Newly Published Content</p>
      <button class="rounded-lg text-white text-xs bg-blue-400 px-3 py-1">View all</button>
    </div>
    <div class="flex gap-24 py-10">
      <div class="flex flex-col p-4">
        <img src="@/assets/icons/content.svg" alt="content">
        <p class="font-black text-sm ml-1">Learn Colors with Dinosaurs!</p>
        <p class="ml-1 text-xs">Mr. Bright | Kindergarten</p>
      </div>
      <div class="flex flex-col p-4">
        <img src="@/assets/icons/content.svg" alt="content">
        <p class="font-black text-sm ml-1">Learn Colors with Dinosaurs!</p>
        <p class="ml-1 text-xs">Mr. Bright | Kindergarten</p>
      </div>
    </div>
  </div>
</template>
        
<script>
export default {
  name: "PublishedContent",
};
</script>
        
<style scoped></style>
        