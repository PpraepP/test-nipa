<template>
  <v-list-item>
    <v-list-item-content v-for="(list, i) in valueDetech" :key="i">
      <v-list-item-title>{{ list.parent }} : {{ list.name }}</v-list-item-title>
      <div>{{ list.bounding_box }}</div>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  props: {
    valueDetech: {
      type: Array,
      require: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.v-list-item {
  flex-wrap: wrap;
  &__content {
    flex: 50%;
  }
}
</style>
