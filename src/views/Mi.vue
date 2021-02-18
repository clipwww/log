<template>
  <div class="pb-16">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <van-tabbar class="border-t" route fixed safe-area-inset-bottom>
      <van-tabbar-item class="bg-gray-200" :to="{ name: 'MiSport' }">Sport</van-tabbar-item>
      <van-tabbar-item class="bg-gray-200" :to="{ name: 'MiActivity' }">Activity</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Tabbar, TabbarItem } from 'vant';

export default defineComponent({
  components: {
    VanTabbar: Tabbar,
    VanTabbarItem: TabbarItem,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
</style>
