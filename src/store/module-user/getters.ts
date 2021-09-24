import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  token: (context) => context.token,
  avatar: (context) => context.avatar,
  name: (context) => context.name,
  // introduction: (context) => context.introduction,
  roles: (context) => context.roles,
  permissions: (context) => context.permissions,
  // permission_routes: (context) => context.permissions,
};

export default getters;
