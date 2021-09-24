import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: import('layouts/MainLayout.vue'),
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('pages/Index.vue'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
  {
    path: '/login',
    component: () => import('src/pages/login.vue'),
  },

];

export default routes;
