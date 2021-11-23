<template>
  <figure class="package-item cursor-pointer" @click="getPackageDetails">
    <blockquote class="blockquote">
      <p>{{ packageInfo.name }}</p>
    </blockquote>
    <figcaption class="blockquote-footer">
      {{ packageInfo.description }}
    </figcaption>
    <div>
      <span :key="keyword" v-for="keyword in keywords" class="keyword">{{
        keyword
      }}</span>
    </div>
  </figure>
</template>

<script>
import { mapActions } from "vuex";
import { GET_PACKAGE_DETAILS } from "../store/constants";

export default {
  props: {
    packageInfo: Object,
  },
  computed: {
    keywords: function () {
      return this.packageInfo.keywords
        ? this.packageInfo.keywords.slice(0, 10)
        : [];
    },
  },
  methods: {
    ...mapActions({
      dispatchPackageDetails: GET_PACKAGE_DETAILS,
    }),
    getPackageDetails: function () {
      this.dispatchPackageDetails({ packageName: this.packageInfo.name });
    },
  },
};
</script>

<style lang="scss" scoped>
.package-item {
  padding: 10px;

  border-radius: 6px;
  border: 1px solid #bdc3c7;

  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.009);
  }
}

.keyword {
  padding: 5px;
  font-size: 10px;
}
</style>
