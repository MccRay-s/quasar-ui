import { RouteRecordRaw } from 'vue-router';

export interface PermissionStateInterface {
  routes: RouteRecordRaw[];
  addRoutes: RouteRecordRaw[],
  defaultRoutes: RouteRecordRaw[],
}

function state(): PermissionStateInterface {
  return {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
  };
}
export default state;
