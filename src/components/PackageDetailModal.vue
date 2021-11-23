<template>
  <div v-show="modalVisible" class="custom-modal_backdrop" @click="hideModal">
    <div v-if="modalInfo" class="custom-modal_body">
      <h4>{{ modalInfo.packageName }}</h4>
      <h5>versions</h5>
      <ul>
        <li :key="tag" v-for="tag in modalInfo.tags">{{ tag }}</li>
      </ul>
      <h5>rank</h5>
      <p>{{ modalInfo.stats.rank }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import {
  HIDE_MODAL,
  MODAL_INFO,
  MODAL_VISIBILITY,
  SHOW_MODAL,
} from "../store/constants";

export default {
  computed: {
    ...mapGetters({
      modalVisible: MODAL_VISIBILITY,
      modalInfo: MODAL_INFO,
    }),
  },
  methods: {
    ...mapActions({
      showModal: SHOW_MODAL,
      hideModal: HIDE_MODAL,
    }),
  },
};
</script>

<style lang="scss">
.custom-modal_backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1055;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;

  background-color: rgba(0, 0, 0, 0.3);
}

.custom-modal_body {
  padding: 20px;
  width: 40%;

  border-radius: 6px;
  background: #eee;
}
</style>
