import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { PermissionStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const PermissionModule: Module<PermissionStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default PermissionModule;
