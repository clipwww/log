<template>
  <div>
    <div>總共走了 {{ sumStep }} 步，消耗總熱量 {{ sumCalories }} kcal</div>
    <div>總距離 {{ sumDistance }} km</div>
    <div class="my-1">平均每天 {{ avgStep }} 步，消耗熱量 {{ avgCalories }} kcal</div>
    <div>走最多步的一天是 {{ maxStepLog.title }} ，共 {{ maxStepLog.steps }} 步</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import { MiActivityLogVM } from '@/view-models';

export default defineComponent({
  props: {
    logs: {
      type: Array as PropType<MiActivityLogVM[]>,
      required: true,
    },
  },
  setup(props) {
    const sumStep = computed(() => props.logs.reduce((sum, cur) => (sum += cur.steps), 0));
    const sumCalories = computed(() => props.logs.reduce((sum, cur) => (sum += cur.calories), 0));
    const sumDistance = computed(() => (props.logs.reduce((sum, cur) => (sum += cur.distance), 0) / 1000).toFixed(2));

    const maxStepLog = computed(() =>
      props.logs.reduce((max, cur) => {
        if (!max) return cur;

        return cur.steps > max?.steps ? cur : max;
      })
    );

    const avgStep = computed(() => Math.floor(sumStep.value / props.logs.length));
    const avgCalories = computed(() => Math.floor(sumCalories.value / props.logs.length));

    return {
      sumStep,
      sumCalories,
      sumDistance,
      maxStepLog,
      avgStep,
      avgCalories,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>