<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <TableComponent
      v-if="isSchoolAdmins"
      :columns="['id', 'full_name', 'email', 'school_name', 'status']"
      :dropdownColumns="['status']"
      :data="schoolAdmins"
      :isDelete="true"
      :title="'School Administrators'"
      :isAdd="false"
      @delete-record="deleteAdmin"
      @update-record="updateAdmin"
    />
    <loaderComponent v-else/>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import loaderComponent from "@/components/loaderComponent.vue";
import { useSchoolStore } from "@/store/school";
export default {
  name: "AdminPage",
  components: {
    TableComponent,
    loaderComponent
  },
  computed: {
    schoolAdmins() {
      return useSchoolStore().getPeopleData;
    },
    isSchoolAdmins() {
      return useSchoolStore().getIsPeopleDataLoaded;
    },
  },
  methods: {
    fetchAdmin() {
      useSchoolStore().fetchPeopleData("school admin");
    },
    deleteAdmin(id) {
      useSchoolStore().deletePerson(id, "school admin");
    },
    updateAdmin(admin) {
      useSchoolStore().updatePerson({ ...admin }, 'school admin');
    },
  },
  created() {
    this.fetchAdmin();
  },
};
</script>

<style></style>
