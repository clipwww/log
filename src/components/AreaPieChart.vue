<script lang="ts">
import type { PropType } from 'vue'

import _groupBy from 'lodash/groupBy'
import { computed, defineComponent, reactive } from 'vue'

import type { MovieRecordVM } from '@/view-models'

import MovieRecordsPopup from './MovieRecordsPopup.vue'
import PieChart from './PieChart.vue'

export default defineComponent({
  components: {
    PieChart,
    MovieRecordsPopup,
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
    const groupByArea = computed(() => _groupBy(props.records, item => item.area))

    const dataset = reactive({
      data: computed(() => Object.keys(groupByArea.value).map(key => groupByArea.value[key].length)),
      labels: computed(() => Object.keys(groupByArea.value)),
    })

    const areaDetails = reactive<{
      label: string
      records: MovieRecordVM[]
    }>({
      label: '',
      records: [],
    })

    function onClick({ label }: { label: string }) {
      areaDetails.label = label
      areaDetails.records = groupByArea.value[label]
    }

    return {
      dataset,
      areaDetails,

      onClick,
    }
  },
})
</script>

<template>
  <PieChart
    :id="id"
    :data="dataset.data"
    :labels="dataset.labels"
    @pie-click="onClick"
  />
  <MovieRecordsPopup v-model:records="areaDetails.records">
    <template #title>
      <div class="text-center py-2">
        {{ areaDetails.label }}
      </div>
    </template>
  </MovieRecordsPopup>
</template>

<style lang="scss" scoped>
</style>
