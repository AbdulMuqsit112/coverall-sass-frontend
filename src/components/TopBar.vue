<template>
  <nav class="container mx-auto flex justify-between py-4">
    <div class="flex gap-6 w-28">
      <img src="@/assets/icons/dLogo.svg" alt="Company Logo" class="" />
      <img src="@/assets/icons/dLine1.svg" alt="line" />
      <img src="@/assets/icons/dTopIcon1.svg" alt="school logo" />
    </div>
    <button @click="signOut()">Log Out</button>
  </nav>
</template>

<script>
import { useAuthStore } from "@/store/auth";
export default {
  name: "TopBar",
  components: {},
  methods: {
    signOut() {
      useAuthStore().logout();
    },
  },
};
</script>

<style></style>
