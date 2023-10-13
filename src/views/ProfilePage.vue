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
        <form class="flex flex-col items-center gap-12">
          <div class="flex flex-col gap-1">
            <label for="name" class="text-left">Name</label>
            <input
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
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="name" class="text-left">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              id="Confirm_password"
              class="border bg-[#F2F2F2] w-96 rounded-lg py-1"
            />
          </div>
          <div class="flex justify-between w-full">
            <router-link
              to="/"
              class="bg-black text-white pt-2 pb-1 px-6 rounded-lg"
            >
              Go Back
            </router-link>
            <button class="bg-blue-400 text-white pt-1 pb-1 px-6 rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ModalComponent
    :inputFields="inputFields"
    :radioButtons="radioButtons"
    :dropdownOptions="dropdownOptions"
  />
</template>

<script>
import ModalComponent from "@/components/ModalComponent.vue";
export default {
  name: "ProfilePage",
  components: {
    ModalComponent,
  },
  data() {
    return {
      inputFields: [
        { id: 1, label: "Name", value: "" },
        { id: 2, label: "Email", value: "" },
        { id: 3, label: "Phone", value: "" },
      ],
      // Define an array of objects for the radioButtons prop
      radioButtons: [
        {
          id: 1, // A unique identifier for each radio group
          label: "Choose your favorite color", // A label for the radio group
          options: [
            // An array of objects for each option
            {
              value: "red", // A value for the option
              label: "Red", // A label for the option
            },
            {
              value: "green",
              label: "Green",
            },
            {
              value: "blue",
              label: "Blue",
            },
          ],
          selectedOption: null, // A property to store the selected option
        },
        {
          id: 2,
          label: "Choose your favorite animal",
          options: [
            {
              value: "cat",
              label: "Cat",
            },
            {
              value: "dog",
              label: "Dog",
            },
            {
              value: "bird",
              label: "Bird",
            },
          ],
          selectedOption: null,
        },
      ],
      dropdownOptions: [
        {
          id: 1,
          label: "Select Color",
          selectedOption: "red",
          options: [
            { label: "Red", value: "red" },
            { label: "Green", value: "green" },
            { label: "Blue", value: "blue" },
          ],
        },
        {
          id: 2,
          label: "Select Size",
          selectedOption: "medium",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
