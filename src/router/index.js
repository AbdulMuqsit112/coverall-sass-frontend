import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    exact: true,
    name: 'DashBoardPage',
    component: () => import("@/views/DashboardPage.vue"),
    props: (route) => ({
      token: route.query.token,
    }),
  },
  {
    path: '/profile',
    exact: true,
    name: 'ProfilePage',
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: '/schools',
    exact: true,
    name: 'SchoolPage',
    component: () => import("@/views/SchoolPage.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;