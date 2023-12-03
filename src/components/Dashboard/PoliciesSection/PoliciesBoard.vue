<template>
  <div class="tile flex flex-wrap flex-col gap-6 h-44 px-4 md:w-[30rem] xl:w-[28.2rem]">
    <div class="flex justify-between">
      <p class="font-Montserrat text-center">Policies</p>
      <router-link to="/policies" class="rounded-lg text-white text-xs bg-blue-400 mt-1 px-3 py-1">Manage</router-link>
    </div>
    <div class="flex gap-10">
      <div class="flex flex-col gap-2">
        <div class="flex gap-3">
          <img src="@/assets/icons/block1.svg" alt="block">
          <p class="font-black">Block</p>
        </div>
        <div class="text-xs pl-5" v-for="blkPoliciy in blockedSchoolPolicies" :key="blkPoliciy">
          <p class="py-1 font-thin">{{ blkPoliciy.name }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-3">
          <img src="@/assets/icons/tick.svg" alt="block">
          <p class="font-black">Allow</p>
        </div>
        <div class="text-xs pl-5" v-for="allPoliciy in allowedSchoolPolicies" :key="allPoliciy">
          <p class="pt-1 font-thin">{{ allPoliciy.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
        
<script>
import { useSchoolStore } from '@/store/school';
export default {
  name: "DashboardNotifications",
  data() {
    return {
      allowedSchoolPolicies: [],
      blockedSchoolPolicies: []
    }
  },
  methods: {
    getSchoolPolicies() {
      return useSchoolStore().getDSchoolPolicies;
    },
    fliterPolicies() {
      let policies = this.getSchoolPolicies();
      let allowedPolicy = [];
      let blockedPolicy = [];
      policies.forEach(policy => {
        if (policy.policy_status === "whitelist") {
          allowedPolicy.push(policy);
        } else if (policy.policy_status === "blacklist") {
          blockedPolicy.push(policy);
        }
        this.allowedSchoolPolicies = allowedPolicy.splice(0,3);
        this.blockedSchoolPolicies = blockedPolicy.splice(0,3);
      });
    }
  },
  mounted(){
    this.fliterPolicies();
  }
};
</script>
        
<style scoped></style>
        