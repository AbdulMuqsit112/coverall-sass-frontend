<template>
  <transition name="fade">
    <div :class="`alert ${color} z-20`">
      <p>{{ text }}</p>
    </div>
  </transition>
</template>
<script>
import { useSchoolStore } from '@/store/school';
export default {
  mounted() {
    setTimeout(() => {
      useSchoolStore().toggleAlert();
    }, 1300);
  },
  props: ['text', 'alertColor'],
  computed: {
    color(){
      let colorVal = this.alertColor;
      switch (colorVal) {
        case "error":
          return "bg-red-400";
        case "success":
          return "bg-green-500";
        default:
          return "bg-blue-500";
      }
    },
  }
};
</script>
<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 4px;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
