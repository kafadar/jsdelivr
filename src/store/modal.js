import {
  SHOW_MODAL,
  SET_MODAL_VISIBILITY,
  HIDE_MODAL,
  MODAL_VISIBILITY,
  GET_PACKAGE_DETAILS,
  RESET_MODAL_INFO,
  SET_MODAL_INFO,
  MODAL_INFO,
} from "./constants";
import http from "../services/http";

const state = {
  visible: false,
  packageInfo: null,
};

const getters = {
  [MODAL_VISIBILITY]: function (state) {
    return state.visible;
  },

  [MODAL_INFO]: function (state) {
    return state.packageInfo;
  },
};

const mutations = {
  [SET_MODAL_VISIBILITY]: function (state, status) {
    state.visible = status;
  },

  [SET_MODAL_INFO]: function (state, info) {
    state.packageInfo = info;
  },
  [RESET_MODAL_INFO]: function (state) {
    state.packageInfo = null;
  },
};

const actions = {
  [SHOW_MODAL]: function ({ commit }) {
    commit(SET_MODAL_VISIBILITY, true);
  },
  [HIDE_MODAL]: function ({ commit }) {
    commit(SET_MODAL_VISIBILITY, false);
    commit(RESET_MODAL_INFO);
  },

  [GET_PACKAGE_DETAILS]: function ({ commit }, { packageName }) {
    commit(SET_MODAL_VISIBILITY, true);
    Promise.all([
      http.getPackageVersions(packageName),
      http.getPackageStats(packageName),
    ]).then(function ([{ data: vData }, { data: sData }]) {
      commit(SET_MODAL_INFO, {
        packageName,
        tags: vData.tags,
        stats: sData,
      });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
