import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  SET_TOKEN(state: UserStateInterface, token: string) {
    state.token = token;
  },
  SET_NAME: (state: UserStateInterface, name: string) => {
    state.name = name;
  },
  SET_AVATAR: (state: UserStateInterface, avatar: string) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state: UserStateInterface, roles: string[]) => {
    state.roles = roles;
  },
  SET_PERMISSIONS: (state: UserStateInterface, permissions: string[]) => {
    state.permissions = permissions;
  },
};
export default mutation;
