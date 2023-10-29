<template>
  <div class="main-tile flex p-4 w-[68rem]">
    <!-- Distict admin -->
    <TableComponent
      v-if="isPolicies && (userRole == 'school admin' || userRole == 'district admin')"
      :columns="[
        'id',
        'name',
        'description',
        'policy_type',
        'policy_status',
      ]"
      :data="policies"
      :dropdownColumns="['policy_status']"
      :editableColumns="['name', 'description']"
      :isDelete="true"
      :title="'Policies'"
      :disableSomeFields="userRole == 'school admin'"
      @delete-record="deletePolicy"
      @update-record="updatePolicy"
      @add-record="toggleAdminModal"
    />
    <TableComponent
      v-else-if="isPolicies && (userRole == 'teacher' || userRole == 'content approver')"
      :columns="[
        'id',
        'name',
        'description',
        'policy_type',
        'policy_status',
      ]"
      :data="policies"
      :stateColumns="userRole == 'teacher'? ['policy_status'] : []"
      :dropdownColumns="userRole == 'content approver'? ['policy_status'] : []"
      :isDelete="false"
      :title="'Policies'"
      :isAdd="false"
      @update-record="updatePolicy"
    />

    <ModalComponent
      v-if="isAddPolicy"
      :inputFields="policyInputFields"
      :title="'Add Policy'"
      @close-modal="toggleAdminModal"
      @submited-data="addPolicy"
    />
  </div>
</template>

<script>
import ModalComponent from "@/components/ModalComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import { useSchoolStore } from "@/store/school";
import { useAuthStore } from "@/store/auth";
export default {
  name: "PoliciesPage",
  components: {
    TableComponent,
    ModalComponent,
  },
  data() {
    return {
      policyInputFields: [
        { id: 1, label: "name", value: "" },
        { id: 2, label: "description", value: "" },
      ],
      isAddPolicy: false,
    };
  },
  computed: {
    policies() {
      return useSchoolStore().getDSchoolPolicies;
    },
    isPolicies() {
      return useSchoolStore().getIsDSchoolPolicyLoaded;
    },
    userRole(){
      return useAuthStore().getUser.role;
    }
  },
  methods: {
    toggleAdminModal() {
      this.isAddPolicy = !this.isAddPolicy;
    },
    fetchPolicies() {
      useSchoolStore().fetchDSchoolPolicies();
    },
    deletePolicy(id) {
      useSchoolStore().deletePolicy(id);
    },
    updatePolicy(policy) {
      useSchoolStore().updatePolicy({ ...policy });
    },
    addPolicy(policy) {
      let authStore = useAuthStore()
      let plType = "district";
      let schoolDistrictId = authStore.getUser.districtId;
      if (authStore.getUser.role == "school admin"){
        plType = "school";
        schoolDistrictId = authStore.getUser.schoolId
      }
      let policyObj = {
        ...policy,
        policy_type: plType,
        policy_status: "blacklist",
        id_school_district: schoolDistrictId,
      };
      useSchoolStore().createPolicy(policyObj);
      this.toggleAdminModal();
    },
  },
  created() {
    this.fetchPolicies();
  },
};
</script>

<style></style>
