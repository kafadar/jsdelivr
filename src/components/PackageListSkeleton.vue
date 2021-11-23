<template>
  <div class="package-list">
    <div :key="id" v-for="id in dummyArray" class="package-list_item-skeleton">
      <div class="header"></div>
      <div class="text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PackageListSkeleton",
  data: function () {
    return {
      dummyArray: [...Array(10).keys()],
    };
  },
};
</script>

<style lang="scss" scoped>
.package-list_item-skeleton {
  padding: 20px;

  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }

  background: #eef1f3;

  border-radius: 6px;

  .header {
    margin-bottom: 10px;

    height: 30px;
    width: 200px;

    background: #c9d0d0;
    border-radius: 4px;
  }

  .text {
    height: 20px;

    background: #c9d0d0;
    border-radius: 4px;
  }
}
</style>
