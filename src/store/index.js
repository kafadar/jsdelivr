import Vue from "vue";
import Vuex from "vuex";

import search from "./search";
import notification from "./notification";
import modal from "./modal";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { search, notification, modal },
});
