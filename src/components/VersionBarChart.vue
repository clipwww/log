<template>
  <BarChart type="horizontalBar" :id="id" :data="data" :labels="labels" @bar-click="onClick" />
  <MovieRecordsPopup v-model:records="versionDetails.records">
    <template #title>
      <div class="text-center py-2">{{ versionDetails.label }}</div>
    </template>
  </MovieRecordsPopup>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive, toRefs } from 'vue';
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
      labels: computed(() => Object.keys(groupByVersion.value).map((version) => version)),
    });

    const versionDetails = reactive<{
      label: string;
      records: MovieRecordVM[];
    }>({
      label: '',
      records: [],
    });

    function onClick({ label }: { label: string }) {
      versionDetails.label = label;
      versionDetails.records = groupByVersion.value[label];
    }

    return {
      ...toRefs(dataset),
      versionDetails,

      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>