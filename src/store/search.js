import searchAPI from "../services/http";

import {
  RESET_SEARCH,
  SET_SEARCH_TEXT,
  PUSH_SEARCH_RESULTS,
  SET_SEARCH_STATUS,
  GOT_NEXT_PAGE,
  GOT_PREV_PAGE,
  GET_NEXT_PAGE,
  GET_NEW_SEARCH,
  GET_PREV_PAGE,
  CURRENT_PAGE_ITEMS,
  INCREMENT_CURRENT_PAGE,
  DECREMENT_CURRENT_PAGE,
  NEXT_PAGE_CACHED,
  SEARCH_IN_PROGRESS,
} from "./constants";

/**
 * STATE
 */
const state = {
  searchPaginationSize: 10,

  searchInProgress: false,

  searchText: null,

  searchResults: null,
  searchResultsTotal: 0,

  searchCurrentPage: 0,
  searchMaxPage: 0,
};

/**
 * GETTERS
 */
const getters = {
  [SEARCH_IN_PROGRESS]: function (state) {
    return state.searchInProgress;
  },
  [NEXT_PAGE_CACHED]: function (state) {
    return state.searchMaxPage > state.searchCurrentPage + 1;
  },

  [GOT_NEXT_PAGE]: function (state) {
    if (!state.searchResults) return false;

    return state.searchResultsTotal > state.searchResults.length;
  },
  [GOT_PREV_PAGE]: function (state) {
    if (!state.searchResults) return false;

    return state.searchCurrentPage > 1;
  },

  [CURRENT_PAGE_ITEMS]: function (state) {
    if (!state.searchResults || state.searchInProgress) return [];

    const index = (state.searchCurrentPage - 1) * state.searchPaginationSize;
    return state.searchResults.slice(index, index + state.searchPaginationSize);
  },
};

/**
 * MUTATIONS
 */
const mutations = {
  [RESET_SEARCH]: function (state) {
    state.searchResults = null;
    state.searchResultsTotal = 0;
    state.searchCurrentPage = 0;
    state.searchMaxPage = 0;
  },
  [SET_SEARCH_STATUS]: function (state, status) {
    state.searchInProgress = status;
  },
  [SET_SEARCH_TEXT]: function (state, text) {
    state.searchText = text.toLowerCase();
  },

  [PUSH_SEARCH_RESULTS]: function (state, { results, total }) {
    state.searchResults =
      state.searchResults === null
        ? results
        : [...state.searchResults, ...results];

    state.searchCurrentPage++;
    state.searchMaxPage++;

    state.searchResultsTotal = total;
  },

  [INCREMENT_CURRENT_PAGE]: function (state) {
    state.searchCurrentPage++;
  },
  [DECREMENT_CURRENT_PAGE]: function (state) {
    state.searchCurrentPage--;
  },
};

/**
 * ACTIONS
 */
const actions = {
  [GET_PREV_PAGE]: function ({ commit, getters }) {
    if (!getters[GOT_PREV_PAGE]) return;

    commit(DECREMENT_CURRENT_PAGE);
  },
  [GET_NEW_SEARCH]: function ({ commit, state, getters }, { text }) {
    if (getters[SEARCH_IN_PROGRESS]) return;

    commit(RESET_SEARCH);
    commit(SET_SEARCH_TEXT, text);

    if (!getters[GOT_NEXT_PAGE] && state.searchResults !== null) return;

    commit(SET_SEARCH_STATUS, true);
    searchAPI
      .searchPackageByText(
        text,
        state.searchPaginationSize,
        state.searchMaxPage * state.searchPaginationSize
      )
      .then(function ({ data }) {
        if (!data.objects || !Array.isArray(data.objects)) return;

        commit(PUSH_SEARCH_RESULTS, {
          results: data.objects,
          total: data.total,
        });

        commit(SET_SEARCH_STATUS, false);
      });
  },
  [GET_NEXT_PAGE]: function ({ commit, state, getters }) {
    if (getters[SEARCH_IN_PROGRESS]) return;

    if (getters[NEXT_PAGE_CACHED]) {
      commit(INCREMENT_CURRENT_PAGE);
      return;
    }

    commit(SET_SEARCH_STATUS, true);
    searchAPI
      .searchPackageByText(
        state.searchText,
        state.searchPaginationSize,
        state.searchMaxPage * state.searchPaginationSize
      )
      .then(function ({ data }) {
        if (!data.objects || !Array.isArray(data.objects)) return;

        commit(PUSH_SEARCH_RESULTS, {
          results: data.objects,
          total: data.total,
        });

        commit(SET_SEARCH_STATUS, false);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
