import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      districtId: '',
      schoolId: ''
    },
  }),
  actions: {
    async getUserDetails() {
      try {
        let token = localStorage.getItem("token")
        console.log("Token is :", token);
        if (!token){
          const urlParams = new URLSearchParams(window.location.search);
          token = urlParams.get("token");
          localStorage.setItem("token", token);
        }
        const response = await this.$http.get('user/getUserInfo');
        if (response.status == 200){
          const fetchedUser = response.data;
          this.user.firstName = fetchedUser.first_name;
          this.user.lastName = fetchedUser.last_name;
          this.user.email = fetchedUser.email;
          this.user.role = fetchedUser.role;
          this.user.districtId =  fetchedUser.district_id,
          this.user.schoolId =  fetchedUser.school_id,
          this.isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        this.user = {
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          districtId: '',
          schoolId: ''
        };
        this.isAuthenticated = false;
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.isAuthenticated = false;
      this.user = {
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          districtId: '',
          schoolId: ''
        };
    },
    async resetPassword(userID){
      try {
        const params = new URLSearchParams();
        params.append('user_id', userID);
        const response = await this.$http.post('user/schoolAdmin/passwordReset', null, {
          params: params
        });
        if (response.status == 200) {
          console.error('Password Reset Successful');
        }
      } catch (error) {
        console.error('Error Resetting Password:', error);
      }
    }
  },
  getters: {
    getUser: (state) =>state.user,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});
