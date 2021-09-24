import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { getToken } from 'src/utils/auth';
import { LoadingBar } from 'quasar';
import { StateInterface } from '../store';
import routes from './routes';

// 声明RouteMeta 属性
declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title?: string;
    // 图标
    icon?: string;
    // 地址
    link?: string;
  }
}
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE,
    ),
  });

  Router.beforeEach((to, from, next) => {
    LoadingBar.start();
    if (getToken()) {
      // to.meta.title 如果存在就设置网站标题
      if (to.path === '/login') {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      // LoadingBar.increment(50);
      // setTimeout(() => {
      //   LoadingBar.increment(100);
      // }, 5000);
      LoadingBar.stop();
      next();
    }
  });

  return Router;
});
