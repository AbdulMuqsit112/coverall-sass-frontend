<template>
  <div class="main-tile flex pl-4 xl:pl-10 pr-4 py-6 xl:w-[70rem]">
    <div class="flex-col rounded-lg items-center bg-white w-full p-4">
      <p class="font-black pl-0">Profile Settings</p>
      <div class="flex flex-col">
        <div class="flex items-center justify-center mr-20 mb-8 gap-4">
          <img
            src="@/assets/icons/Avatar.svg"
            class="w-[5.5rem]"
            alt="avatar"
          />
          <button class="bg-blue-400 rounded-lg py-1.5 px-3 text-white">
            Upload Image
          </button>
        </div>
        <form class="flex flex-col items-center gap-12" @submit.prevent="submit()">
          <div class="flex flex-col gap-1">
            <label for="name" class="text-left">First Name</label>
            <input
              v-model="fName"
              type="text"
              name="name"
              id="name"
              class="border bg-[#F2F2F2] w-96 rounded-lg py-1"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="name" class="text-left">Last Name</label>
            <input
              v-model="lName"
              type="text"
              name="name"
              id="name"
              class="border bg-[#F2F2F2] w-96 rounded-lg py-1"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="name" class="text-left">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              class="border bg-[#F2F2F2] w-96 rounded-lg py-1"
              v-model="password"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="name" class="text-left">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              id="Confirm_password"
              class="border bg-[#F2F2F2] w-96 rounded-lg py-1"
              v-model="cPassword"
            />
          </div>
          <div class="flex justify-between w-full">
            <router-link
              to="/"
              class="bg-black text-white pt-2 pb-1 px-6 rounded-lg"
            >
              Go Back
            </router-link>
            <button action="submit" class="bg-blue-400 text-white pt-1 pb-1 px-6 rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { useSchoolStore } from '@/store/school';
export default {
  name: "ProfilePage",
  components: {
  },
  data(){
    return {
      fName: useAuthStore().getUser.firstName,
      lName: useAuthStore().getUser.lastName,
      cPassword: "",
      password: "",
    }
  },
  methods:{
    submit(){
      if (this.cPassword == this.password){
        let user = {
          password: this.password,
          fName: this.fName,
          lName: this.lName
        }
        useAuthStore().updateUserInfo(user);
        return;
      }
      useSchoolStore().setAlert("Password Mismatched", "error")
    },
  },


};
</script>

<style></style>
