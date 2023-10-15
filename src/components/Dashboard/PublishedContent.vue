<template>
  <div class="tile flex flex-wrap flex-colgap-6 px-4 md:w-[30rem] xl:w-[58.5rem]">
    <div class="flex justify-between w-full">
      <p class="font-Montserrat">{{ titleText }}</p>
      <button class="rounded-lg text-white text-xs bg-blue-400 px-3 py-1">View all</button>
    </div>
    <div :class="{
      'gap-2': role !== 'student',
      'gap-24 py-10': role === 'student',
    }" class="flex">
      <div class="flex flex-col p-4" v-for="content in publishedContent" :key="content">
        <img src="@/assets/icons/content.svg" alt="content">
        <p class="font-black text-sm ml-1">{{ content.video_details }}</p>
        <p class="ml-1 text-xs">{{ content.teacher_name }} | {{ content.class_name }}</p>
      </div>
    </div>
  </div>
</template>
        
<script>
import { useSchoolStore } from '@/store/school';
import { useAuthStore } from '@/store/auth';
export default {
  name: "PublishedContent",
  data() {
    return {
      publishedContent: [],
      titleText: ''
    }
  },
  methods: {
    getPublishedContent() {
      let content = useSchoolStore().getPublishedContent;
      this.publishedContent = content.slice(0, 2);
    },
    getContentAwaitApproval(){
      let content = useSchoolStore().getContentAwaitApproval;
      this.publishedContent = content.slice(0,4);
    }
  },
  mounted() {
    let role = useAuthStore().getUser.role;
    if (role == 'student'){
      this.getPublishedContent();
      this.titleText = 'Newly Published Content';
    } else if (role == "content approver"){
      this.getContentAwaitApproval();
      this.titleText = 'Content Awaiting Approval';
    }
  }
};
</script>
        
<style scoped></style>
        