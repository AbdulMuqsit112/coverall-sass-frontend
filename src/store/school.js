import { defineStore } from 'pinia';

export const useSchoolStore = defineStore('school', {
  state: () => ({
    districtSchools: [],
    dSchoolPolicies: [],
    PeopleData: [],
    schoolStudents: [],
    studentClassTeachers: [],
    publishedContent: [],
    contentAwaitApproval: [],
    gradesData: [],
    isDSchoolsLoaded: false,
    isDSchoolPolicyLoaded: false,
    isPeopleDataLoaded: false,
    isSchoolStudentsLoaded: false,
    isStudentClassTeachersLoaded: false,
    isPublishedContentLoaded: false,
    isContentAwaitApprovalLoaded: false,
    isGradesDataLoaded: false

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
        const response = await this.$http.get('user/getUserInfo/all', {params: { user_type: userType},});
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
        const response = await this.$http.get('school/getStudentsClassTeachers');
        if (response.status == 200) {
          this.studentClassTeachers = response.data;
          this.isStudentClassTeachersLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching Students Class Teachers:', error);
      }
    },
    async fetchPublishedContent() {
      this.isPublishedContentLoaded = false;
      try {
        const response = await this.$http.get('video/getVideos/students');
        if (response.status == 200) {
          this.publishedContent = response.data;
          this.isPublishedContentLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching Published Content:', error);
      }
    },
    async fetchContentAwaitingApproval() {
      this.isContentAwaitApprovalLoaded = false;
      try {
        const response = await this.$http.get('video/getVideos/contentApprovers/contentWaitingApproval');
        if (response.status == 200) {
          this.contentAwaitApproval = response.data;
          this.isContentAwaitApprovalLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching Content Awaiting Approval:', error);
      }
    },
    async fetchGrades(schoolId) {
      this.isGradesDataLoaded = false;
      try {
        const response = await this.$http.get('grade/schoolAdmin/getGrades', {params: { school_id: schoolId},});
        if (response.status == 200) {
          this.gradesData = response.data;
          this.isGradesDataLoaded = true;
        }
      } catch (error) {
        console.error('Error fetching Grades:', error);
      }
    },
    // Delete Requests
    async deleteDistrictSchool(id) {
      try {
        const response = await this.$http.delete('school/delete', {params: { school_id: id,},});
        if (response.status == 200) {
          await this.fetchDistrictSchoolsData();
        }
      } catch (error) {
        console.error('Error Deleting School:', error);
      }
    },
    async deletePerson(id) {
      try {
        const response = await this.$http.delete('user/delete', {params: { user_id: id,},});
        if (response.status == 200) {
          await this.fetchPeopleData('school admin');
        }
      } catch (error) {
        console.error('Error Deleting Person:', error);
      }
    },
    async deletePolicy(id) {
      try {
        const response = await this.$http.delete('policy/delete', {params: { policy_id: id,},});
        if (response.status == 200) {
          await this.fetchDSchoolPolicies();
        }
      } catch (error) {
        console.error('Error Deleting Policies:', error);
      }
    },

    // Update Requests
    async updateDistrictSchool(school) {
      try {
        const response = await this.$http.put('school/update', school);
        if (response.status == 200) {
          await this.fetchDistrictSchoolsData();
        }
      } catch (error) {
        console.error('Error Updating School:', error);
      }
    },
    async updatePerson(person, personType) {
      try {
        const response = await this.$http.put('user/update', person);
        if (response.status == 200) {
          await this.fetchPeopleData(personType);
        }
      } catch (error) {
        console.error('Error Updating Person:', error);
      }
    },
    async updatePolicy(policy) {
      try {
        const response = await this.$http.put('policy/update', policy);
        if (response.status == 200) {
          await this.fetchDSchoolPolicies();
        }
      } catch (error) {
        console.error('Error Updating Policy:', error);
      }
    },
    async updateGrade(userId, gradeId, role, schoolId) {
      try {
        const response = await this.$http.put('user/update/gradeIdUserId', { 
          params: {
            user_id: userId,
            grade_id: gradeId,
            user_role: role
          },
        },);
        if (response.status === 200) {
          await this.fetchGrades(schoolId);
        }
      } catch (error) {
        console.error('Error Updating Grades:', error);
      }
    },

    // Create Requests
    async createDistrictSchool(school) {
      try {
        const response = await this.$http.post('school/create/districtAdmin', school);
        if (response.status == 200) {
          await this.fetchDistrictSchoolsData();
        }
      } catch (error) {
        console.error('Error Creating School:', error);
      }
    },
    async createPolicy(policy) {
      try {
        const response = await this.$http.post('policy/create', policy);
        if (response.status == 200) {
          await this.fetchDSchoolPolicies();
        }
      } catch (error) {
        console.error('Error Creating Policy:', error);
      }
    }

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
    getPublishedContent: (state) => state.publishedContent,
    getIsPublishedContentLoaded: (state) => state.isPublishedContentLoaded,
    getContentAwaitApproval: (state) => state.contentAwaitApproval,
    getIsContentAwaitApprovalLoaded: (state) => state.isContentAwaitApprovalLoaded,
    getGradesData: (state) => state.gradesData,
    getIsGradesDataLoaded: (state) => state.isGradesDataLoaded,
  },
});
