import { ActionTree } from 'vuex';
import { LoginBody } from 'src/models/common/BaseCommon';
import { login, getInfo } from 'src/api/login';
import { setToken } from 'src/utils/auth';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async Login(context, body: LoginBody) {
    const rest = await login(body);
    context.commit('SET_TOKEN', rest.token);
    setToken(rest.token);
    return 'SUCCESS';
  },
  async GetInfo({ commit }) {
    const userRest = await getInfo();
    const { user } = userRest;
    if (userRest.roles && userRest.roles.length) {
      commit('SET_ROLES', userRest.roles);
      commit('SET_PERMISSIONS', userRest.permissions);
    } else {
      commit('SET_ROLES', ['ROLE_DEFAULT']);
    }
    commit('SET_NAME', user.userName);
    commit('SET_AVATAR', user.avatar);
    return userRest;
  },

};

export default actions;
