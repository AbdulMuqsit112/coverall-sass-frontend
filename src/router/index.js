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
  {
    path: '/admin',
    exact: true,
    name: 'AdminPage',
    component: () => import("@/views/AdminPage.vue"),
  },
  {
    path: '/policies',
    exact: true,
    name: 'PoliciesPage',
    component: () => import("@/views/PoliciesPage.vue"),
  },
  {
    path: '/teachers',
    exact: true,
    name: 'TeachersPage',
    component: () => import("@/views/TeachersPage.vue"),
  },
  {
    path: '/students',
    exact: true,
    name: 'StudentPage',
    component: () => import("@/views/StudentsPage.vue"),
  },
  {
    path: '/classes',
    exact: true,
    name: 'ClassesPage',
    component: () => import("@/views/ClassesPage.vue"),
  },
  {
    path: '/grades',
    exact: true,
    name: 'GradesPage',
    component: () => import("@/views/GradesPage.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;