import { MutationTree } from 'vuex';
import { RouteRecordRaw } from 'vue-router';
import routes from 'src/router/routes';
import { PermissionStateInterface } from './state';

const mutation: MutationTree<PermissionStateInterface> = {
  SET_ROUTES(state: PermissionStateInterface, routeList: RouteRecordRaw[]) {
    state.addRoutes = routeList;
    state.routes = routes.concat(routeList);
  },
  SET_DEFAULT_ROUTES: (state, routeList: RouteRecordRaw[]) => {
    state.defaultRoutes = routes.concat(routeList);
  },
};
export default mutation;
