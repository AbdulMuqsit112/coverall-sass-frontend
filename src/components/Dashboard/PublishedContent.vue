<template>
  <div class="tile flex flex-wrap flex-colgap-6 px-4 md:w-[30rem] xl:w-[60rem]">
    <div class="flex justify-between w-full mt-2">
      <p class="font-Montserrat">{{ titleText }}</p>
      <button class="rounded-lg text-white text-xs bg-blue-400 px-3 py-1">View all</button>
    </div>
    <div :class="{ 'justify-center gap-20 py-10': userRole == 'student', 'gap-2': userRole != 'student',
    }" class="flex mt-4">
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
    if (this.userRole == 'student'){
      this.getPublishedContent();
      this.titleText = 'Newly Published Content';
    } else if (this.userRole == "content approver"){
      this.getContentAwaitApproval();
      this.titleText = 'Content Awaiting Approval';
    }
  },
  computed: {
    userRole(){
      return useAuthStore().getUser.role;
    },
  },
};
</script>
        
<style scoped></style>
        