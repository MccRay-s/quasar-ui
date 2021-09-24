import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { SettingsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const SettingsModule: Module<SettingsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default SettingsModule;
