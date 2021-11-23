<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">SEARCH NPM PACKAGES</a>
        <div class="d-flex">
          <input
            v-model="searchText"
            class="form-control me-2"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-outline-primary" @click="search">
            Search
          </button>
        </div>
      </div>
    </nav>

    <ul v-show="gotPrev || gotNext" class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !gotPrev }">
        <a class="page-link pointer-cursor" @click="setPrevPage">Previous</a>
      </li>
      <li class="page-item" :class="{ disabled: !gotNext }">
        <a class="page-link pointer-cursor" @click="setNextPage">Next</a>
      </li>
    </ul>

    <div class="row"><PackageList :packages="results" /></div>
    <package-list-skeleton v-show="searchInProgress" />

    <footer class="text-center text-lg-start bg-light text-muted">
      <div class="text-center p-4">
        by Eldiiar Tabaldyev
        <a class="text-reset fw-bold" href="https://github.com/kafadar"
          >@github</a
        >
      </div>
    </footer>

    <package-detail-modal />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { isEmptyOrSpaces } from "./utils";

import PackageList from "./components/PackageList";

import {
  GOT_NEXT_PAGE,
  GOT_PREV_PAGE,
  CURRENT_PAGE_ITEMS,
  GET_NEXT_PAGE,
  GET_PREV_PAGE,
  GET_NEW_SEARCH,
  SEARCH_IN_PROGRESS,
} from "./store/constants";
import PackageListSkeleton from "./components/PackageListSkeleton";
import PackageDetailModal from "./components/PackageDetailModal";

export default {
  name: "App",
  components: { PackageDetailModal, PackageListSkeleton, PackageList },
  data: function () {
    return {
      searchText: "",
    };
  },
  computed: {
    ...mapGetters({
      searchInProgress: SEARCH_IN_PROGRESS,
      gotPrev: GOT_PREV_PAGE,
      gotNext: GOT_NEXT_PAGE,
      results: CURRENT_PAGE_ITEMS,
    }),
  },
  methods: {
    ...mapActions({
      getNewSearch: GET_NEW_SEARCH,
      getNextPage: GET_NEXT_PAGE,
      getPrevPage: GET_PREV_PAGE,
    }),
    search: function () {
      if (isEmptyOrSpaces(this.searchText.trim())) return;

      this.getNewSearch({ text: this.searchText.trim() });
    },
    setNextPage: function () {
      this.getNextPage();
    },
    setPrevPage: function () {
      this.getPrevPage();
    },
  },
};
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>
