<template>
  <div class="py-2 bg-gray-300 min-h-screen">
    <van-grid :column-num="2" :gutter="8" border>
      <van-grid-item icon="photo-o" text="看電影紀錄" :to="{ name: 'Movie' }" />
      <van-grid-item icon="photo-o" text="小米手環紀錄" :to="{ name: 'Mi' }" />
    </van-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Grid, GridItem } from 'vant';

export default defineComponent({
  components: {
    VanGrid: Grid,
    VanGridItem: GridItem,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
</style>