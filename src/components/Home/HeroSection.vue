<template>
  <section class="container mx-auto flex justify-between py-4 mb-20" :class="{ 'flex-reverse': sectionType ==2 }">
    <div class="flex flex-col justify-center w-6/12 mt-36">
      <!-- Hero Section Type 1 -->
      <div class="wrapper" v-if="sectionType == 1">
        <p class="text-4xl font-Montserrat">Create the <span class="yellow-text">safest</span> possible learning
          environment</p>
        <p class="text-base font-thin my-3 w-[79%]">Our platform is designed for schools and educational institutions to
          create a secure, edifying digital space for their students.</p>
      </div>

      <!-- Hero Section Type 2 -->
      <div class="wrapper" v-if="sectionType == 2">
        <p class="text-4xl font-Montserrat">Test our versatile <span class="yellow-text">Coverall</span> technology with a
          <span class="yellow-text">Free Trial</span></p>
        <p class="text-base font-thin my-3 w-[79%]">We provide solutions for every kind of classroom and for every range of budget. See the Coverall difference in action with our free trial!</p>
      </div>
      <button class="primary-button rounded py-3 w-32 mt-2 text-sm">Learn More</button>
    </div>

    <!-- Hero Section Type 1 -->
    <div class="flex mr-28" v-if="sectionType == 1">
      <img src="../../assets/icons/hero2.svg" class="absolute top-72 right-[32rem]" alt="">
      <div class="image-container w-96 h-96"></div>
    </div>

      <!-- Hero Section Type 2 -->
    <div class="flex mr-28" v-if="sectionType == 2">
      <div class="image-container-3 w-56 h-56 absolute"></div>
      <div class="image-container-2 ml-32"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  components: {},
  props: ['sectionType']
};
</script>

<style>
.image-container {
  background-image: url('../../assets/icons/hero1.svg');
  background-repeat: no-repeat;
}
.image-container-2 {
  background-image: url('../../assets/icons/hero3.svg');
  background-repeat: no-repeat;
  width: 23rem;
  height: 23rem;
}
.image-container-3{
  background-image: url('../../assets/icons/hero4.svg');
  background-repeat: no-repeat;
}
.flex-reverse {
  flex-direction: row-reverse;
}
</style>
