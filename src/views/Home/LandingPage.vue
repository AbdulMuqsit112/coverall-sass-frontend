<template>
  <div class="landing-page">
    <div class="lines z-0">
    <img src="@/assets/icons/line1.svg" class="absolute" alt="line1">
    <img src="@/assets/icons/line2.svg" class="absolute" alt="line2">
    <img src="@/assets/icons/line3.svg" class="absolute" alt="line3">
    <img src="@/assets/icons/line4.svg" class="absolute" alt="line4">
    <img src="@/assets/icons/line5.svg" class="absolute" alt="line5">
  </div>
    <NavBar />
    <HeroSection :sectionType="1" />
    <section class="container mx-auto flex flex-col py-8 mt-6 items-center gap-6 rectangle">
      <div class="flex flex-col text-center w-7/12">
        <p class="text-4xl font-Montserrat">
          Safety and <span class="yellow-text">Student-Focused</span>
        </p>
        <p class="my-3 mx-6 text-base font-thin">
          The platform empowers educational institutions to have granular control over Video content, backed by AI-driven
          insights, ensuring a safe and conducive digital learning environment for students.
        </p>
      </div>
      <div class="flex justify-evenly pb-12">
        <div class="card-wrapper" v-for="(cardIcon, index) in cardIcons" :key=cardIcon>
          <CardLinks :cardIcon="cardIcon" :cardTitle="cardTitles[index]" :cardSubTitle="cardSubTitles[index]" />
        </div>
      </div>
    </section>
    <HeroSection :sectionType="2" />
    <div class="container mx-auto rectangle flex p-12 items-center mb-20">
      <p class="font-Montserrat text-4xl w-1/4 p-4">
        <span class="yellow-text">Trusted</span> by Schools Nationwide
      </p>
      <div class="card mt-2 mx-4 w-[52rem] justify-evenly py-5 h-1/2 relative z-10">
        <img v-for="icon in schoolIcons" :key="icon" :src="require(`@/assets/icons/${icon}`)" class="h-2/4"
          alt="school icons">
      </div>
    </div>
    <div class="lines z-0 my-8 relative">
    <img src="@/assets/icons/line8.svg" class="absolute bottom-[-4rem] left-1/4" alt="line8">
    <img src="@/assets/icons/line9.svg" class="absolute bottom-[-4rem] left-1/4" alt="line9">
    <img src="@/assets/icons/line10.svg" class="absolute bottom-[-4rem] left-1/4" alt="line10">
    <img src="@/assets/icons/line7.svg" class="absolute bottom-[-4rem] left-1/4" alt="line7">
    <img src="@/assets/icons/line6.svg" class="absolute bottom-[-4rem] left-1/4" alt="line6">
  </div>
    <PageFooter />
  </div>
</template>
<script>
import NavBar from '@/components/Home/NavBar.vue';
import HeroSection from '@/components/Home/HeroSection.vue';
import CardLinks from '@/components/Home/CardLinks.vue';
import PageFooter from '@/components/Home/PageFooter.vue'
export default {
  name: "LandingPage",
  components: {
    NavBar,
    HeroSection,
    CardLinks,
    PageFooter,
  },
  data() {
    return {
      schoolIcons: [
        'school1.svg',
        'school2.svg',
        'school3.svg',
        'school4.svg',
        'school5.svg',
      ],
      cardIcons: [
        'cardIcon1.svg',
        'cardIcon2.svg',
        'cardIcon3.svg',
        'cardIcon4.svg',
        'cardIcon5.svg',
        'cardIcon6.svg',
      ],
      cardTitles: [
        'Content Filtering',
        'AI/ML Integration',
        'Multi-Tenancy',
        'Desktop Agent',
        'Monitoring & Reporting',
        'Customization & Branding'
      ],
      cardSubTitles: [
        'Approve, deny, and flag videos',
        'Analyses video content and makes risk assessments',
        'Can serve multiple districts and',
        'Ensures content guidelines are applied',
        'View accessed content, analytics, and AI/ML insights',
        'Customizable dashboard and interface!'
      ]
    }
  },
};
</script>

<style>
.rectangle {
  background-color: #2e3b6a;
  border-radius: 0.8rem;
  box-shadow: 0px -5px 1px rgba(0, 0, 0, 0.1);
}
.landing-page{
  background-color: #18275B;
  color: white;
}
</style>
