<script lang="ts">
import { Tabbar, TabbarItem } from 'vant'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="pb-16">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <VanTabbar
      class="border-t"
      route
      fixed
      safe-area-inset-bottom
    >
      <VanTabbarItem class="bg-gray-200" :to="{ name: 'MiSport' }">
        Sport
      </VanTabbarItem>
      <VanTabbarItem class="bg-gray-200" :to="{ name: 'MiActivity' }">
        Activity
      </VanTabbarItem>
    </VanTabbar>
  </div>
</template>

<style lang="scss" scoped>
</style>
