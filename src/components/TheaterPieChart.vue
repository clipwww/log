<script lang="ts">
import type { PropType } from 'vue'

import _groupBy from 'lodash/groupBy'
import { computed, defineComponent, reactive } from 'vue'

import type { MovieRecordVM } from '@/view-models'

import PieChart from './PieChart.vue'

export default defineComponent({
  components: {
    PieChart,
  },
  props: {
    id: {
      type: String,
      default: 'js-theater-pie',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const groupByTheater = computed(() => _groupBy(props.records, item => item.theater))

    const dataset = reactive({
      data: computed(() => Object.keys(groupByTheater.value).map(key => groupByTheater.value[key].length)),
      labels: computed(() => Object.keys(groupByTheater.value)),
    })

    return {
      dataset,
    }
  },
})
</script>

<template>
  <h4 class="text-center">
    影城
  </h4>
  <PieChart
    :id="id"
    :key="id"
    :data="dataset.data"
    :labels="dataset.labels"
  />
</template>

<style lang="scss" scoped>
</style>
