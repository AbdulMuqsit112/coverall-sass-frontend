<template>
<div class="card border mx-4 flex-col w-44 h-72">
  <div class="icon-wrapper rounded-full p-2 flex justify-center my-8">
    <img :src=loadImage(cardIcon) alt="card Icon">
  </div>
  <p class="font-extrabold text-lg text-center">{{ cardTitle }}</p>
  <p class="mt-4 mx-3 text-center text-base">{{ cardSubTitle }}</p>
</div>
</template>

<script>
export default {
  name: "CardLinks",
  props: ['cardIcon', 'cardTitle', 'cardSubTitle'],
  components: {},
  methods: {
    loadImage(source) {
      return require(`@/assets/icons/${source}`);
    },
  },
};
</script>

<style>
.icon-wrapper {
  background-color: black;
}
</style>
