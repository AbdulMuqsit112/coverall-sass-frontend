import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    exact: true,
    name: 'DashBoardPage',
    component: () => import("@/views/Dashboard/DashboardPage.vue"),
    props: (route) => ({
      token: route.query.token,
    }),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;