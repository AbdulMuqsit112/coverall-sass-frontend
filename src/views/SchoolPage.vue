<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Distict admin -->
    <TableComponent
      v-if="isDistictSchools"
      :columns="[
        'id',
        'name',
        'address',
        'school_type',
        'subscription_status',
        'subscription_date',
      ]"
      :data="distictSchools"
      :stateColumns="['subscription_status']"
      :editableColumns="['name', 'address']"
      :isDelete="true"
      :title="'School Teachers'"
      @delete-record="deleteDSchool"
      @update-record="updateDSchool"
      @add-record="toggleDSchoolModal"
    />

    <ModalComponent
      v-if="isAddDSchool"
      :inputFields="districtSchoolInputFields"
      :title="'Add Distict School'"
      @close-modal="toggleDSchoolModal"
      @submited-data="addDschool"
    />
  </div>
</template>

<script>
import ModalComponent from "@/components/ModalComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import { useSchoolStore } from "@/store/school";
export default {
  name: "SchoolPage",
  components: {
    TableComponent,
    ModalComponent,
  },
  data() {
    return {
      districtSchoolInputFields: [
        { id: 1, label: "name", value: "" },
        { id: 2, label: "address", value: "" },
      ],
      isAddDSchool: false,
    };
  },
  computed: {
    distictSchools() {
      return useSchoolStore().getDistictSchoolsData;
    },
    isDistictSchools() {
      return useSchoolStore().getIsDSchoolLoaded;
    },
  },
  methods: {
    toggleDSchoolModal() {
      this.isAddDSchool = !this.isAddDSchool;
    },
    fetchDSchools() {
      useSchoolStore().fetchDistrictSchoolsData();
    },
    deleteDSchool(id) {
      useSchoolStore().deleteDistrictSchool(id);
    },
    updateDSchool(school) {
      useSchoolStore().updateDistrictSchool({ ...school });
    },
    addDschool(school) {
      useSchoolStore().createDistrictSchool(school);
      this.toggleDSchoolModal();
    },
  },
  created() {
    this.fetchDSchools();
  },
};
</script>

<style></style>
