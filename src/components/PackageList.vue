<template>
  <div>
    <ul class="list-group">
      <package-item
        :key="name"
        v-for="{ package: { name, description, keywords } } in packages"
        :packageInfo="{ name, description, keywords }"
      />
    </ul>
  </div>
</template>

<script>
import PackageItem from "./PackageItem";
export default {
  name: "PackageList",
  components: { PackageItem },
  props: {
    packages: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
