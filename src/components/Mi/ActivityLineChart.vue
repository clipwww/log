<template>
  <LineChart :id="id" :key="id" :datasets="datasets" :labels="labels" />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import _groupBy from 'lodash/groupBy';

import { dayjs } from '@/plugins/dayjs';
import { colors } from '@/utils';
import { MiActivityLogVM } from '@/view-models';

import LineChart from '@/components/LineChart.vue';

export default defineComponent({
  components: {
    LineChart,
  },
  props: {
    id: {
      type: String,
      default: 'js-line',
    },
    logs: {
      type: Array as PropType<MiActivityLogVM[]>,
      required: true,
    },
  },
  setup(props) {
    const months = Array(12)
      .fill('')
      .map((_, i) => i);

    const groupByYear = computed(() => {
      return _groupBy(props.logs, (item) => {
        return dayjs(item.date).year();
      });
    });

    const datasets = computed(() => {
      return Object.keys(groupByYear.value)
        .sort((a, b) => (+a > +b ? 1 : -1))
        .map((key, i) => {
          const groupByMonth = _groupBy(groupByYear.value[key], (item) => {
            return dayjs(item.date).month();
          });

          return {
            type: 'line',
            label: key,
            data: months.map((month) => groupByMonth[month]?.reduce((sum, cur) => (sum += cur.steps), 0) ?? 0),
            borderColor: colors[i % colors.length],
            backgroundColor: colors[i % colors.length],
            fill: false,
          };
        });
    });
    const labels = months.map((m) => dayjs().month(m).format('MMM'));

    return {
      datasets,
      labels,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>