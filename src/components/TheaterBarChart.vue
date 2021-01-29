<template>
  <BarChart
    type="horizontalBar"
    :id="id"
    :key="id"
    :data="dataset.data"
    :labels="dataset.labels"
    @bar-click="onClick"
  />
  <MovieRecordsPopup v-model:records="theaterDetails.records">
    <template #title>
      <div class="text-center py-2">{{ theaterDetails.label }}</div>
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
      default: 'js-theater-bar',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const groupByTheater = computed(() => _groupBy(props.records, (item) => item.theater));
    const arrayByTheater = computed(() =>
      Object.keys(groupByTheater.value)
        .map((key) => {
          return {
            label: key,
            data: groupByTheater.value[key].length,
          };
        })
        .sort((a, b) => (a.data < b.data ? 1 : -1))
    );

    const dataset = reactive({
      data: computed(() => arrayByTheater.value.map((item) => item.data)),
      labels: computed(() => arrayByTheater.value.map((item) => item.label)),
    });

    const theaterDetails = reactive<{
      label: string;
      records: MovieRecordVM[];
    }>({
      label: '',
      records: [],
    });

    function onClick({ label }: { label: string }) {
      theaterDetails.label = label;
      theaterDetails.records = groupByTheater.value[label];
    }

    return {
      dataset,
      theaterDetails,

      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>