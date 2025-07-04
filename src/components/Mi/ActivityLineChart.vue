<script lang="ts">
import type { PropType } from 'vue'

import _groupBy from 'lodash/groupBy'
import { computed, defineComponent } from 'vue'

import type { MiActivityLogVM } from '@/view-models'

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
      default: 'js-line',
    },
    logs: {
      type: Array as PropType<MiActivityLogVM[]>,
      required: true,
    },
  },
  setup(props) {
    const months = Array.from({ length: 12 })
      .fill('')
      .map((_, i) => i)

    const groupByYear = computed(() => {
      return _groupBy(props.logs, (item) => {
        return dayjs(item.date).year()
      })
    })

    const datasets = computed(() => {
      return Object.keys(groupByYear.value)
        .sort((a, b) => (+a > +b ? 1 : -1))
        .map((key, i) => {
          const groupByMonth = _groupBy(groupByYear.value[key], (item) => {
            return dayjs(item.date).month()
          })

          return {
            type: 'line',
            label: key,
            data: months.map(month => groupByMonth[month]?.reduce((sum, cur) => (sum += cur.steps), 0) ?? 0),
            borderColor: colors[i % colors.length],
            backgroundColor: colors[i % colors.length],
            fill: false,
          }
        })
    })
    const labels = months.map(m => dayjs().month(m).format('MMM'))

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

<style lang="scss" scoped>
</style>
