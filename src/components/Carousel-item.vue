<template>
  <div class="v-carousel">
    <img :src="item_data" />
  </div>
</template>
<script>
export default {
  name: "v-carousel",
  props: {
    item_data: null
  },
  data() {
    return {};
  },
  computed: {}
};
</script>
<style scoped>
.v-carousel {
}
/* img {
  height: 200px;
} */
</style>