import { ActionTree } from 'vuex';
// import { LoginBody } from 'src/models/common/BaseCommon';
import { getRouters } from 'src/api/menu';
import { RouteRecordRaw } from 'vue-router';
import { SysMenu } from 'src/models/menu/Menu';
import MainLayout from 'layouts/MainLayout.vue';
import { StateInterface } from '../index';
import { PermissionStateInterface } from './state';

/**
 * 菜单转换路由
 * @param menu 菜单
 * @returns
 */
const convertToTouterRecord = (menu: SysMenu): RouteRecordRaw => {
  const routeItem:RouteRecordRaw = {
    path: menu.path,
    redirect: menu.redirect,
    name: menu.name,
    meta: {
      title: menu.meta.title,
      icon: menu.meta.icon,
      link: menu.meta.link,
    },
    component: menu.component === 'Layout' ? MainLayout : import(`src/pages/${menu.component}`),
  };
  if (menu.children && menu.children.length) {
    routeItem.children = menu.children.map((o) => convertToTouterRecord(o));
  }
  return routeItem;
};

function filterAsyncRouter(menuList: SysMenu[]):RouteRecordRaw[] {
  return menuList.filter((menuItem) => menuItem.component)
    .map((menu) => convertToTouterRecord(menu));
}

const actions: ActionTree<PermissionStateInterface, StateInterface> = {
  /**
   * 生成路由
   */
  async GenerateRoutes({ commit }) {
    const menuList = await getRouters();
    commit('SET_ROUTES', filterAsyncRouter(menuList));
  },
};

export default actions;
