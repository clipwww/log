<script lang="ts">
import { Grid, GridItem } from 'vant'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    VanGrid: Grid,
    VanGridItem: GridItem,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="py-2 bg-gray-200 min-h-screen">
    <VanGrid :column-num="2" :gutter="8" border>
      <VanGridItem icon="video-o" text="看電影紀錄" :to="{ name: 'Movie' }" />
      <VanGridItem icon="records-o" text="棒球紀錄" :to="{ name: 'Baseball' }" />
      <VanGridItem icon="fire-o" text="小米手環紀錄" :to="{ name: 'Mi' }" />
    </VanGrid>
  </div>
</template>

<style lang="scss" scoped>
</style>
