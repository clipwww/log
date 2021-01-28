<template>
  <van-popup v-model:show="show" round position="bottom" :style="{ height: '90%' }" closeable>
    <slot name="title"></slot>
    <MovieRecordCell v-for="record in records" :record="record" :key="`${record.date}_${record.title}`" />
  </van-popup>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Popup } from 'vant';

import { MovieRecordVM } from '@/view-models';

import MovieRecordCell from './MovieRecordCell.vue';

export default defineComponent({
  components: {
    VanPopup: Popup,
    MovieRecordCell,
  },
  props: {
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = computed({
      get() {
        return props.records.length > 0;
      },
      set(bool) {
        if (!bool) emit('update:records', []);
      },
    });
    return {
      show,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>