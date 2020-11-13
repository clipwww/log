<template>
  <h4 class="text-center">電影國別</h4>
  <PieChart :id="id" :data="dataset.data" :labels="dataset.labels" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue';
import _groupBy from 'lodash/groupBy';

import { MovieRecordVM } from '@/view-models';

import PieChart from './PieChart.vue';

export default defineComponent({
  components: {
    PieChart,
  },
  props: {
    id: {
      type: String,
      default: 'js-area-pie',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const groupByArea = computed(() => _groupBy(props.records, (item) => item.area));

    const dataset = reactive({
      data: computed(() => Object.keys(groupByArea.value).map((key) => groupByArea.value[key].length)),
      labels: computed(() => Object.keys(groupByArea.value)),
    });

    return {
      dataset,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>