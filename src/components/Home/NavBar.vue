<template>
  <nav class="container mx-auto flex justify-between py-8 relative z-10">
    <div class="main-nav">
      <ul class="flex gap-x-16">
        <li>
          <router-link to="/"><img src="../../assets/icons/logo.svg" alt="Company Logo" class="w-28" /></router-link>
        </li>
        <li class="cursor-pointer">
          <router-link to="/product" active-class="border p-1">Product</router-link>
          </li>
        <li class="cursor-pointer">
          <router-link to="/pricing" active-class="border p-1">Pricing</router-link>
        </li>
        <li class="cursor-pointer">
          <router-link to="/contact" active-class="border p-1">Contact</router-link>
        </li>
      </ul>
    </div>
    <div class="flex gap-x-6">
      <button class="py-2 px-6 rounded hover:bg-blue-500 hover:text-white">
        <router-link to="/login">Log in</router-link>
      </button>
      <button class="primary-button px-6">
        <router-link to="/signup">Sign Up</router-link>
        </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
};
</script>

<style></style>
