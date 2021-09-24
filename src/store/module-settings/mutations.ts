import { MutationTree } from 'vuex';
import { SettingsStateInterface } from './state';

const mutation: MutationTree<SettingsStateInterface> = {
  SET_TITLE(state: SettingsStateInterface, title:string) {
    state.title = title;
  },
};
export default mutation;
