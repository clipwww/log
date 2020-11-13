<template>
  <ContributionChart v-if="!hideContributionChart" :id="`js-contribution-${id}`" class="my-4" :records="records" />

  <div class="my-4 text-center">
    <TotalAnalytics :records="records" />
  </div>

  <div class="lg:flex items-center my-8">
    <div class="lg:w-1/2 lg:mb-0 mb-4 lg:p-4 p-0">
      <AreaPieChart :id="`js-area-pie-${id}`" :records="records" />
    </div>
    <div class="lg:w-1/2 lg:p-4 p-0">
      <TheaterPieChart :id="`js-theater-pie-${id}`" :records="records" />
    </div>
  </div>

  <div class="lg:flex items-center my-8">
    <div class="lg:w-1/2 lg:mb-0 mb-4 lg:p-4 p-0">
      <FrequencyBarChart :id="`js-frequency-${id}`" :records="records" />
    </div>
    <div class="lg:w-1/2 lg:p-4 p-0">
      <VersionBarChart :id="`js-version-${id}`" :records="records" />
    </div>
  </div>

  <div class="my-4">
    <TimeHeatmapChart :id="`js-heatmap-${id}`" :records="records" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { MovieRecordVM } from '@/view-models';

import ContributionChart from '@/components/ContributionChart.vue';
import AreaPieChart from '@/components/AreaPieChart.vue';
import TheaterPieChart from '@/components/TheaterPieChart.vue';
import FrequencyBarChart from '@/components/FrequencyBarChart.vue';
import VersionBarChart from '@/components/VersionBarChart.vue';
import TimeHeatmapChart from '@/components/TimeHeatmapChart.vue';
import TotalAnalytics from '@/components/TotalAnalytics.vue';

export default defineComponent({
  components: {
    ContributionChart,
    AreaPieChart,
    TheaterPieChart,
    FrequencyBarChart,
    VersionBarChart,
    TimeHeatmapChart,
    TotalAnalytics,
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
    hideContributionChart: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
</style>