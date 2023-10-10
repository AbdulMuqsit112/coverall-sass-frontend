import { defineStore } from 'pinia';

export const useSchoolStore = defineStore('school', {
  state: () => ({
    districtSchools: [],
    dSchoolPolicies: [],
    schoolAdmins: [],
    isDSchoolsLoaded: false,
    isDSchoolPolicyLoaded: false,
    isSchoolAdminsLoaded: false,
  }),
  actions: {
    async fetchDistrictSchoolsData() {
      this.isDSchoolsLoaded = false;
      try {
        const response = await this.$http.get('school/districtSchools/all');
        if (response.status == 200) {
          this.districtSchools = response.data
          this.isDSchoolsLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching district Schools:', error);
      }
    },
    async fetchDSchoolPolicies() {
      this.isDSchoolPolicyLoaded = false;
      try {
        const response = await this.$http.get('policy/get');
        if (response.status == 200) {
          this.dSchoolPolicies = response.data
          this.isDSchoolPolicyLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching Policies:', error);
      }
    },
    async fetchSchoolAdmins() {
      this.isSchoolAdminsLoaded = false;
      try {
        const response = await this.$http.get('user/getUserInfo/all', {params: { user_type: 'school admin',},});
        if (response.status == 200) {
          this.schoolAdmins = response.data;
          this.isSchoolAdminsLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching School Admins:', error);
      }
    },
  },
  getters: {
    getDistictSchoolsData: (state) => state.districtSchools,
    getIsDSchoolLoaded: (state) => state.isDSchoolsLoaded,
    getDSchoolPolicies: (state) => state.dSchoolPolicies,
    getIsDSchoolPolicyLoaded: (state) => state.isDSchoolPolicyLoaded,
    getSchoolAdmins: (state) => state.schoolAdmins,
    getIsSchoolAdminsLoaded: (state) => state.isSchoolAdminsLoaded,
  },
});
