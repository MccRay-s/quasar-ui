import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SettingsStateInterface } from './state';

const actions: ActionTree<SettingsStateInterface, StateInterface> = {
  /**
   * 设置网页标题
   */
  setTitle({ commit }, title:string) {
    commit('SET_TITLE', title);
  },
};

export default actions;
