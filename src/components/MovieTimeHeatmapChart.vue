<script lang="ts">
import type { PropType } from 'vue'

import _groupBy from 'lodash/groupBy'
import { computed, defineComponent, reactive } from 'vue'

import type { MovieRecordVM } from '@/view-models'

import MovieRecordsPopup from '@/components/MovieRecordsPopup.vue'
import TimeHeatmapChart from '@/components/TimeHeatmapChart.vue'
import { dayjs, formatDate } from '@/plugins/dayjs'

export default defineComponent({
  components: {
    TimeHeatmapChart,
    MovieRecordsPopup,
  },
  props: {
    id: {
      type: String,
      default: 'js-heatmap',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const dataset = computed(() => {
      const groupByWeekday = _groupBy(props.records, (item) => {
        return dayjs(item.date).weekday()
      })

      const dataset: { weekday: number, hour: number, value: number, records: MovieRecordVM[] }[] = []
      Array.from({ length: 7 })
        .fill('')
        .forEach((_, weekday) => {
          Array.from({ length: 24 })
            .fill('')
            .forEach((_, i) => {
              const records = groupByWeekday[weekday]?.filter(item =>
                dayjs(item.date).isSame(dayjs(item.date).hour(i), 'hour'),
              )
              const value = records?.length ?? 0
              dataset.push({ weekday: +weekday, hour: i, value, records })
            })
        })

      return dataset
    })

    const dayDetails: {
      weekday: number
      hour: number
      records: MovieRecordVM[]
    } = reactive({
      weekday: 0,
      hour: 0,
      records: [],
    })

    const weekdayDetails: {
      weekday: number
      records: MovieRecordVM[]
    } = reactive({
      weekday: 0,
      records: [],
    })

    function formatWeekDay(weekday: number) {
      return dayjs().weekday(weekday).format('ddd')
    }

    function formatHour(hour: number) {
      const dayObj = dayjs().startOf('day')
      return `${dayObj.hour(hour).format('HH:mm')}~${dayObj.hour(hour + 1).format('HH:mm')}`
    }

    function onClick(d: { weekday: number, hour: number, value: number, records: MovieRecordVM[] }) {
      dayDetails.weekday = d.weekday
      dayDetails.hour = d.hour
      dayDetails.records = d.records
    }

    function onWeekdayClick(d: { weekday: number, count: number }) {
      const groupByWeekday = _groupBy(props.records, (item) => {
        return dayjs(item.date).weekday()
      })
      weekdayDetails.weekday = d.weekday
      weekdayDetails.records = groupByWeekday[d.weekday] ?? []
    }

    const totalCount = computed(() => props.records.length)

    const weekdayStats = computed(() => {
      const groupByWeekday = _groupBy(props.records, (item) => {
        return dayjs(item.date).weekday()
      })

      return Array.from({ length: 7 }, (_, i) => ({
        weekday: i,
        count: groupByWeekday[i]?.length ?? 0,
      }))
    })

    return {
      dataset,
      dayDetails,
      weekdayDetails,
      totalCount,
      weekdayStats,

      formatDate,
      formatWeekDay,
      formatHour,
      onClick,
      onWeekdayClick,
    }
  },
})
</script>

<template>
  <TimeHeatmapChart
    :id="id"
    :dataset="dataset"
    :weekday-stats="weekdayStats"
    @block-click="onClick"
    @weekday-click="onWeekdayClick"
  />

  <MovieRecordsPopup v-model:records="dayDetails.records">
    <template #title>
      <div class="text-center py-2">
        <div>{{ formatWeekDay(dayDetails.weekday) }} {{ formatHour(dayDetails.hour) }}</div>
      </div>
    </template>
  </MovieRecordsPopup>

  <MovieRecordsPopup v-model:records="weekdayDetails.records">
    <template #title>
      <div class="text-center py-2">
        <div>{{ formatWeekDay(weekdayDetails.weekday) }}</div>
      </div>
    </template>
  </MovieRecordsPopup>
</template>

<style lang="scss" scoped>
</style>
