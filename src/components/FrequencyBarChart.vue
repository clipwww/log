<template>
  <h4 class="text-center">各月看電影的次數</h4>
  <BarChart :id="id" :data="data" :labels="labels" />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive, toRefs } from 'vue';
import _groupBy from 'lodash/groupBy';

import { dayjs } from '@/plugins/dayjs';
import { MovieRecordVM } from '@/view-models';

import BarChart from './BarChart.vue';

export default defineComponent({
  components: {
    BarChart,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const months = Array(12)
      .fill('')
      .map((_, i) => i);

    const groupByMonth = computed(() => _groupBy(props.records, (item) => dayjs(item.date).month()));

    const dataset = reactive({
      data: computed(() => {
        const obj = Object.keys(groupByMonth.value).map((key) => {
          return {
            month: +key,
            value: groupByMonth.value[key].length,
          };
        });
        return months.map((m) => obj.find((item) => item.month === m)?.value ?? 0);
      }),
      labels: months.map((m) => dayjs().month(m).format('MMM')),
    });

    return {
      ...toRefs(dataset),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>