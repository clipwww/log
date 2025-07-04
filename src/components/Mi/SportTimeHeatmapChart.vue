<script lang="ts">
import type { PropType } from 'vue'

import _groupBy from 'lodash/groupBy'
import { computed, defineComponent } from 'vue'

import type { MiSportLogVM } from '@/view-models'

import TimeHeatmapChart from '@/components/TimeHeatmapChart.vue'
import { dayjs, formatDate } from '@/plugins/dayjs'

export default defineComponent({
  components: {
    TimeHeatmapChart,
  },
  props: {
    id: {
      type: String,
      default: 'js-heatmap',
    },
    logs: {
      type: Array as PropType<MiSportLogVM[]>,
      required: true,
    },
  },
  setup(props) {
    const dataset = computed(() => {
      const groupByWeekday = _groupBy(props.logs, (item) => {
        return dayjs(item.startTime).weekday()
      })

      const dataset: { weekday: number, hour: number, value: number, logs: MiSportLogVM[] }[] = []
      Array.from({ length: 7 })
        .fill('')
        .forEach((_, weekday) => {
          Array.from({ length: 24 })
            .fill('')
            .forEach((_, i) => {
              const logs = groupByWeekday[weekday]?.filter(item =>
                dayjs(item.startTime).isSame(dayjs(item.startTime).hour(i), 'hour'),
              )
              const value = logs?.length ?? 0
              dataset.push({ weekday: +weekday, hour: i, value, logs })
            })
        })

      return dataset
    })

    function formatWeekDay(weekday: number) {
      return dayjs().weekday(weekday).format('ddd')
    }

    function formatHour(hour: number) {
      const dayObj = dayjs().startOf('day')
      return `${dayObj.hour(hour).format('HH:mm')}~${dayObj.hour(hour + 1).format('HH:mm')}`
    }

    return {
      dataset,

      formatDate,
      formatWeekDay,
      formatHour,
    }
  },
})
</script>

<template>
  <TimeHeatmapChart :id="id" :dataset="dataset" />
</template>

<style lang="scss" scoped>
</style>
