<template>
  <div class="text-xs">
    看了 {{ totalCount }} 場電影，一共 {{ totalTicks }} 張電影票，花了 {{ totalCost.toLocaleString() }} 新台幣
  </div>
</template>

<script lang="ts">
import { MovieRecordVM } from '@/view-models';
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue';

export default defineComponent({
  props: {
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      totalCount: computed(() => props.records.length),
      totalCost: computed(() => props.records.reduce((total, item) => (total += item.cost), 0)),
      totalTicks: computed(() => props.records.reduce((total, item) => (total += item.tickets), 0)),
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
