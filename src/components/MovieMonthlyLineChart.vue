<script lang="ts">
import type { PropType } from 'vue'

import _groupBy from 'lodash/groupBy'
import { computed, defineComponent } from 'vue'

import type { MovieRecordVM } from '@/view-models'

import LineChart from '@/components/LineChart.vue'
import { dayjs } from '@/plugins/dayjs'
import { colors } from '@/utils'

export default defineComponent({
  components: {
    LineChart,
  },
  props: {
    id: {
      type: String,
      default: 'js-monthly-line',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const months = Array.from({ length: 12 }, (_, i) => i)

    const labels = computed(() => months.map(m => dayjs().month(m).format('MMM')))

    const datasets = computed(() => {
      const groupByYear = _groupBy(props.records, item => dayjs(item.date).year())

      return Object.keys(groupByYear)
        .sort()
        .map((year, index) => {
          const groupByMonth = _groupBy(groupByYear[year], item => dayjs(item.date).month())
          const color = colors[index % colors.length]

          return {
            type: 'line' as const,
            label: year,
            data: months.map(m => groupByMonth[m]?.length ?? 0),
            borderColor: color,
            backgroundColor: color,
            fill: false,
          }
        })
    })

    return {
      datasets,
      labels,
    }
  },
})
</script>

<template>
  <LineChart
    :id="id"
    :key="id"
    :datasets="datasets"
    :labels="labels"
  />
</template>
