<template>
  <h4 class="text-center">各版本的次數</h4>
  <BarChart :id="id" :data="data" :labels="labels" />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive, toRefs } from 'vue';
import _groupBy from 'lodash/groupBy';

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
    const groupByVersion = computed(() => _groupBy(props.records, (item) => item.version));

    const dataset = reactive({
      data: computed(() => Object.keys(groupByVersion.value).map((version) => groupByVersion.value[version].length)),
      labels: Object.keys(groupByVersion.value).map((version) => version),
    });

    return {
      ...toRefs(dataset),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>