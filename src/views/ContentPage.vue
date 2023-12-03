<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Content Approver -->
    <TableComponent v-if="isContent && userRole == 'content approver'" 
      :columns="[
        'video_id',
        'title',
        'youtube_link',
        'grade_name',
        'class_name',
        'video_status'
      ]" 
      :data="contentData" 
      :title="'Content'" 
      :isAdd="false"
      :dropdownColumns="['video_status']" 
      @update-record="updateContent" />

      <!-- Teachers -->
    <TableComponent v-else-if="isTeachContent && userRole == 'teacher'" 
      :columns="[
        'video_id',
        'title',
        'youtube_link',
        'grade_name',
        'class_name',
        'video_status'
      ]" 
      :data="teachContent" 
      :title="'Content'" 
      :isAdd="true"
      :isDelete="true"
      :stateColumns="['video_status']"
      @add-record="toggleModal"
      @delete-record="deleteContent"
      />
    <loaderComponent v-else />
    <ModalComponent
      v-if="isAddContent"
      :inputFields="teachInputFields"
      :dropdownOptions="dropdownOptions"
      :title="'Add Content'"
      @close-modal="toggleModal"
      @submited-data="addContent"
    />
  </div>
</template>
    
<script>
import TableComponent from "@/components/TableComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import loaderComponent from "@/components/loaderComponent.vue";
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
export default {
  name: "ContentPage",
  components: {
    TableComponent,
    loaderComponent,
    ModalComponent
  },
  data(){
    return {
      teachInputFields: [
        { id: 1, label: "title", value: "" },
        { id: 2, label: "YoutubeLink", value: "" },
        { id: 3, label: "category", value: "" },
      ],
      dropdownOptions: [],
      isAddContent: false
    }
  },
  computed: {
    contentData() {
      return useSchoolStore().getAllContent;
    },
    teachContent() {
      return useSchoolStore().getTeachContent;
    },
    isContent() {
      return useSchoolStore().getIsAllContentLoaded;
    },
    isTeachContent() {
      return useSchoolStore().getIsTeachContentLoaded;
    },
    userRole() {
      return useAuthStore().getUser.role
    },
  },
  methods: {
    toggleModal(){
      if(!this.isAddContent) this.generateDropDownOptions();
      this.isAddContent = !this.isAddContent
    },
    fetchContent() {
      useSchoolStore().fetchAllContent();
    },
    fetchTeachersContent(){
      useSchoolStore().fetchTeachersContent();
    },
    fetchTeachersClasses(){
      useSchoolStore().fetchTeachersClasses();
    },
    updateContent(content) {
      if (content) {
        if (content.video_status == 'approved') {
          useSchoolStore().approveDisapproveContent(content.video_id, 'approve')
        } else {
          useSchoolStore().approveDisapproveContent(content.video_id, 'disapprove')
        }
      }
    },
    generateDropDownOptions() {
      this.dropdownOptions = [];
      let classData = useSchoolStore().getTeacherClasses;
      const opt = classData.map((item) => ({
        label: item.grade_name,
        value: item.id,
      }));
      let option = {
        id: 1,
        label: "Classes",
        selectedOption: "",
        options: opt,
      };
      this.dropdownOptions.push(option);
    },
    addContent(content){
      if (content){
        let dData = content.dropDownData.pop();
        let params = {
          title: content.title,
          youtube_link: content.YoutubeLink,
          classes_id: dData.selectedOption,
          category: content.category
        };
        useSchoolStore().createContent(params);
      }
      this.toggleModal();
    },
    deleteContent(id){
      useSchoolStore().deleteContent(id);
    },
  },
  created() {
    if(this.userRole == 'content approver'){
      this.fetchContent();
    } else {
      this.fetchTeachersContent();
      this.fetchTeachersClasses();
    }
  },
};
</script>
    
<style></style>
    