import { defineStore } from 'pinia';

export const useSchoolStore = defineStore('school', {
  state: () => ({
    districtSchools: [],
    dSchoolPolicies: [],
    PeopleData: [],
    schoolStudents: [],
    studentClassTeachers: [],
    isDSchoolsLoaded: false,
    isDSchoolPolicyLoaded: false,
    isPeopleDataLoaded: false,
    isSchoolStudentsLoaded: false,
    isStudentClassTeachersLoaded: false

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
    async fetchPeopleData(userType) {
      this.isPeopleDataLoaded = false;
      try {
        const response = await this.$http.get('user/getUserInfo/all', {params: { user_type: userType,},});
        if (response.status == 200) {
          this.PeopleData = response.data;
          this.isPeopleDataLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching School Admins:', error);
      }
    },
    async fetchSchoolStudents() {
      this.isSchoolStudentsLoaded = false;
      try {
        const response = await this.$http.get('school/getStudentsGradesCount');
        if (response.status == 200) {
          this.schoolStudents = response.data;
          this.isSchoolStudentsLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching School Students:', error);
      }
    },
    async fetchStudentsClassTeachers() {
      this.isStudentClassTeachersLoaded = false;
      try {
        const response = await this.$http.get('/school/getStudentsClassTeachers');
        if (response.status == 200) {
          this.studentClassTeachers = response.data;
          this.isStudentClassTeachersLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching Students Class Teachers:', error);
      }
    },
  },
  getters: {
    getDistictSchoolsData: (state) => state.districtSchools,
    getIsDSchoolLoaded: (state) => state.isDSchoolsLoaded,
    getDSchoolPolicies: (state) => state.dSchoolPolicies,
    getIsDSchoolPolicyLoaded: (state) => state.isDSchoolPolicyLoaded,
    getPeopleData: (state) => state.PeopleData,
    getIsPeopleDataLoaded: (state) => state.isPeopleDataLoaded,
    getSchoolStudents: (state) => state.schoolStudents,
    getIsSchoolStudentsLoaded: (state) => state.isSchoolStudentsLoaded,
    getStudentClassTeachers: (state) => state.studentClassTeachers,
    getIsStudentClassTeachersLoaded: (state) => state.isStudentClassTeachersLoaded,
  },
});
