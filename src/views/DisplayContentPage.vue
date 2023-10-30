<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <div class="flex flex-wrap justify-center py-10 bg-white w-[65rem]" v-if="isPublishedContent">
    <div class="flex justify-between w-[55rem]">
      <span class="text-xl font-black">Content</span>
        <div class="relative">
          <input
            v-model="searchQuery"
            class="mb-4 px-4 py-1 w-[30rem] rounded-3xl bg-[#F8F8F8]"
            placeholder="Search"
          />
          <img
            src="@/assets/icons/search.svg"
            alt="search"
            class="absolute right-3 top-4 transform -translate-y-1/2"
          />
        </div>
    </div>
      <div class="flex flex-col p-4 w-[29rem]" v-for="content in filteredData" :key="content">
        <iframe src="https://www.youtube.com/embed/X3iFhLdWjqc" width="100%" height="300" frameborder="0" allowfullscreen></iframe>
        <p class="font-black text-sm ml-1">{{ content.video_details }}</p>
        <p class="ml-1 text-xs">{{ content.teacher_name }} | {{ content.class_name }}</p>
      </div>
    </div>
    <loaderComponent v-else/>
  </div>
</template>

<script>
import { useSchoolStore } from "@/store/school";
import loaderComponent from "@/components/loaderComponent.vue";
export default {
  name: "DisplayContentPage",
  components: {
    loaderComponent
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    isPublishedContent() {
      return useSchoolStore().getIsPublishedContentLoaded;
    },
    publishedContent() {
      return useSchoolStore().getPublishedContent;
    },
    filteredData() {
      if (this.searchQuery) {
        return this.publishedContent.filter((item) => {
          return Object.values(item).some((value) =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      } else {
        return this.publishedContent;
      }
    },
  },
  methods: {
    fetchPublishedContent() {
      useSchoolStore().fetchPublishedContent();
    },
  },
  created() {
    this.fetchPublishedContent();
  },
};
</script>

<style></style>
