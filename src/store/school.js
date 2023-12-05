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
    classes: [],
    gradesTeacher: [],
    allContent: [],
    teachContent: [],
    teacherClasses: [],
    menuList: [],
    teacherGrades: [],
    alertText: '',
    alertColor: '',
    showAlert: false,
    isDSchoolsLoaded: false,
    isDSchoolPolicyLoaded: false,
    isPeopleDataLoaded: false,
    isSchoolStudentsLoaded: false,
    isStudentClassTeachersLoaded: false,
    isPublishedContentLoaded: false,
    isContentAwaitApprovalLoaded: false,
    isGradesDataLoaded: false,
    isClassesLoaded: false,
    isGradesTeacherLoaded: false,
    isAllContentLoaded: false,
    isTeachContentLoaded: false,
    isTeacherClassesLoaded: false,
    isMenuListLoaded: false,
    isTeacherGradesLoaded: false,

  }),
  actions: {
    toggleAlert(){
      this.showAlert = !this.showAlert
    },
    setAlert(msg,color){
      this.alertText = msg;
      this.alertColor = color;
      this.toggleAlert();
    },

    async fetchMenuList() {
      this.isMenuListLoaded = false;
      try {
        const response = await this.$http.get('user/get/userInfo/menuItems');
        if (response.status == 200) {
          this.menuList = response.data
          this.isMenuListLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching Menu:', error);
      }
    },
    async fetchDistrictSchoolsData() {
      this.isDSchoolsLoaded = false;
      try {
        const response = await this.$http.get('school/get/districtSchools/all');
        if (response.status == 200) {
          this.districtSchools = response.data
          this.isDSchoolsLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
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
        this.setAlert(error.message,'error')
        console.error('Error fetching Policies:', error);
      }
    },
    async fetchPeopleData(userType) {
      this.isPeopleDataLoaded = false;
      try {
        const response = await this.$http.get('user/get/userInfo/all', {params: { user_type: userType},});
        if (response.status == 200) {
          this.PeopleData = response.data;
          this.isPeopleDataLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching School Admins:', error);
      }
    },
    async fetchSchoolStudents() {
      this.isSchoolStudentsLoaded = false;
      try {
        const response = await this.$http.get('school/get/studentsGradesCount');
        if (response.status == 200) {
          this.schoolStudents = response.data;
          this.isSchoolStudentsLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching School Students:', error);
      }
    },
    async fetchStudentsClassTeachers() {
      this.isStudentClassTeachersLoaded = false;
      try {
        const response = await this.$http.get('school/get/studentsClassTeachers');
        if (response.status == 200) {
          this.studentClassTeachers = response.data;
          this.isStudentClassTeachersLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching Students Class Teachers:', error);
      }
    },
    async fetchPublishedContent() {
      this.isPublishedContentLoaded = false;
      try {
        const response = await this.$http.get('video/get/students');
        if (response.status == 200) {
          this.publishedContent = response.data;
          this.isPublishedContentLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching Published Content:', error);
      }
    },
    async fetchContentAwaitingApproval() {
      this.isContentAwaitApprovalLoaded = false;
      try {
        const response = await this.$http.get('video/get/contentApprovers/contentWaitingApproval');
        if (response.status == 200) {
          this.contentAwaitApproval = response.data;
          this.isContentAwaitApprovalLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
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
        this.setAlert(error.message,'error')
        console.error('Error fetching Grades:', error);
      }
    },
    async fetchClasses() {
      this.isClassesLoaded = false;
      try {
        const response = await this.$http.get('class/get/schoolAdmin');
        if (response.status == 200) {
          this.classes = response.data;
          this.isClassesLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching Classes:', error);
      }
    },
    async fetchGradesTeacher(id) {
      this.isGradesTeacherLoaded = false;
      try {
        const response = await this.$http.get('grade/schoolAdmin/getGradesTeachers', {params: { grade_id: id},});
        if (response.status == 200) {
          this.gradesTeacher = response.data;
          this.isGradesTeacherLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching This grade Teacher:', error);
      }
    },
    async fetchAllContent() {
      this.isAllContentLoaded = false;
      try {
        const response = await this.$http.get('video/get/contentApprovers');
        if (response.status == 200) {
          this.allContent = response.data;
          this.isAllContentLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching Content:', error);
      }
    },
    async fetchTeachersContent() {
      this.isTeachContentLoaded = false;
      try {
        const response = await this.$http.get('video/get/teachers');
        if (response.status == 200) {
          this.teachContent = response.data;
          this.isTeachContentLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching Content:', error);
      }
    },
    async fetchTeachersClasses() {
      this.isTeacherClassesLoaded = false;
      try {
        const response = await this.$http.get('class/get/teachers');
        if (response.status == 200) {
          this.teacherClasses = response.data;
          this.isTeacherClassesLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching Classes:', error);
      }
    },
    async fetchTeachersGrades() {
      this.isTeacherGradesLoaded = false;
      try {
        const response = await this.$http.get('grade/getGrades');
        if (response.status == 200) {
          this.teacherGrades = response.data;
          this.isTeacherGradesLoaded = true;
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error fetching Grades:', error);
      }
    },



    // Delete Requests
    async deleteDistrictSchool(id) {
      try {
        const response = await this.$http.delete('school/delete', {params: { school_id: id,},});
        if (response.status == 200) {
          this.setAlert('Successfully Deleted', 'info');
          await this.fetchDistrictSchoolsData();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Deleting School:', error);
      }
    },
    async deletePerson(id, userType) {
      try {
        const response = await this.$http.delete('user/delete', {params: { user_id: id,},});
        if (response.status == 200) {
          this.setAlert('Successfully Deleted', 'info');
          await this.fetchPeopleData(userType);
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Deleting Person:', error);
      }
    },
    async deletePolicy(id) {
      try {
        const response = await this.$http.delete('policy/delete', {params: { policy_id: id,},});
        if (response.status == 200) {
          this.setAlert('Successfully Deleted', 'info');
          await this.fetchDSchoolPolicies();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Deleting Policies:', error);
      }
    },
    async deleteClass(id) {
      try {
        const response = await this.$http.delete('class/delete', {params: { class_id: id,},});
        if (response.status == 200) {
          this.setAlert('Successfully Deleted', 'info');
          await this.fetchClasses();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Deleting Class:', error);
      }
    },
    async deleteContent(id) {
      try {
        const response = await this.$http.delete('video/delete', {params: { video_id: id,},});
        if (response.status == 200) {
          this.setAlert('Successfully Deleted', 'info');
          await this.fetchTeachersContent();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Deleting Content:', error);
      }
    },


    // Update Requests
    async updateDistrictSchool(school) {
      try {
        const response = await this.$http.put('school/update', school);
        if (response.status == 200) {
          this.setAlert('Successfully Updated', 'success');
          await this.fetchDistrictSchoolsData();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Updating School:', error);
      }
    },
    async updatePerson(person, personType) {
      try {
        const response = await this.$http.put('user/update', person);
        if (response.status == 200) {
          this.setAlert('Successfully Updated', 'success');
          await this.fetchPeopleData(personType);
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Updating Person:', error);
      }
    },
    async updatePolicy(policy) {
      try {
        const response = await this.$http.put('policy/update', policy);
        if (response.status == 200) {
          this.setAlert('Successfully Updated', 'success');
          await this.fetchDSchoolPolicies();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Updating Policy:', error);
      }
    },
    async updateGrade(userId, gradeId, role, schoolId) {
      try {
        const params = new URLSearchParams();
        params.append('user_id', userId);
        params.append('grade_id', gradeId);
        params.append('user_role', role);
        const response = await this.$http.put('user/update/grade', null, {
          params: params
        });
        if (response.status === 200) {
          this.setAlert('Successfully Updated', 'success');
          await this.fetchGrades(schoolId);
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Updating Grades:', error);
      }
    },
    async approveDisapproveContent(id, reqType){
      try {
        const params = new URLSearchParams();
        params.append('video_id', id);
        const response = await this.$http.put(`video/${reqType}`, null, {
          params: params
        });
        if (response.status === 200) {
          this.setAlert('Successfully Updated', 'success');
          await this.fetchAllContent();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Updating Content Status:', error);
      }
    },    

    // Create Requests
    async createDistrictSchool(school) {
      try {
        const response = await this.$http.post('school/create/districtSchool', school);
        if (response.status == 200) {
          this.setAlert('Successfully Added', 'success');
          await this.fetchDistrictSchoolsData();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Creating School:', error);
      }
    },
    async createPolicy(policy) {
      try {
        const response = await this.$http.post('policy/create', policy);
        if (response.status == 200) {
          this.setAlert('Successfully Added', 'success');
          await this.fetchDSchoolPolicies();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Creating Policy:', error);
      }
    },
    async createClasses(classObj) {
      try {
        const response = await this.$http.post('class/create', classObj);
        if (response.status == 200) {
          this.setAlert('Successfully Added', 'success');
          await this.fetchClasses();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Creating Class:', error);
      }
    },
    async createGrades(gradeObj) {
      try {
        const response = await this.$http.post('grade/create', gradeObj);
        if (response.status == 200) {
          this.setAlert('Successfully Added', 'success');
          await this.fetchSchoolStudents();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Creating Grade:', error);
      }
    },
    async createContent(contentObj) {
      try {
        const response = await this.$http.post('video/create', contentObj);
        if (response.status == 200) {
          this.setAlert('Successfully Added', 'success');
          await this.fetchTeachersContent();
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Creating Content:', error);
      }
    },
    async createUser(useObj, userType) {
      try {
        const response = await this.$http.post('user/signup', useObj);
        if (response.status == 200) {
          this.setAlert('Successfully Added', 'success');
          await this.fetchPeopleData(userType);
        }
      } catch (error) {
        this.setAlert(error.message,'error')
        console.error('Error Creating User:', error);
      }
    }

  },
  getters: {
    getAlertVal: (state) => state.showAlert,
    getAlertColor: (state) => state.alertColor,
    getAlertText: (state) => state.alertText,
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
    getclassesData: (state) => state.classes,
    getIsClassesLoaded: (state) => state.isClassesLoaded,
    getGradesTeachers: (state) => state.gradesTeacher,
    getIsGradesTeachersLoaded: (state) => state.isGradesTeacherLoaded,    
    getAllContent: (state) => state.allContent,
    getIsAllContentLoaded: (state) => state.isAllContentLoaded,    
    getTeachContent: (state) => state.teachContent,
    getIsTeachContentLoaded: (state) => state.isTeachContentLoaded,    
    getTeacherClasses: (state) => state.teacherClasses,
    getIsTeacherClassesLoaded: (state) => state.isTeacherClassesLoaded,
    getMenuList: (state) => state.menuList,
    getIsMenuListLoaded: (state) => state.isMenuListLoaded,
    getTeacherGrades: (state) => state.teacherGrades,
    getIsTeacherGradesLoaded: (state) => state.isTeacherGradesLoaded,
  },
});
