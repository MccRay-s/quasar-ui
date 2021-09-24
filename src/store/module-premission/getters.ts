import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PermissionStateInterface } from './state';

const getters: GetterTree<PermissionStateInterface, StateInterface> = {
  routers: (context) => context.routes,
  defaultRoutes: (context) => context.defaultRoutes,
};

export default getters;
