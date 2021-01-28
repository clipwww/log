<template>
  <BarChart :id="id" :data="dataset.data" :labels="dataset.labels" @bar-click="onClick" />
  <MovieRecordsPopup v-model:records="areaDetails.records">
    <template #title>
      <div class="text-center py-2">{{ areaDetails.label }}</div>
    </template>
  </MovieRecordsPopup>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue';
import _groupBy from 'lodash/groupBy';

import { MovieRecordVM } from '@/view-models';

import BarChart from './BarChart.vue';
import MovieRecordsPopup from './MovieRecordsPopup.vue';

export default defineComponent({
  components: {
    BarChart,
    MovieRecordsPopup,
  },
  props: {
    id: {
      type: String,
      default: 'js-area-bar',
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

    const areaDetails = reactive<{
      label: string;
      records: MovieRecordVM[];
    }>({
      label: '',
      records: [],
    });

    function onClick({ label }: { label: string }) {
      areaDetails.label = label;
      areaDetails.records = groupByArea.value[label];
    }

    return {
      dataset,
      areaDetails,

      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>