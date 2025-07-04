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
      default: 'js-line',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const arrayByYear = computed(() => {
      const group = _groupBy(props.records, (item) => {
        return dayjs(item.date).year()
      })

      return Object.keys(group).map((key) => {
        return {
          id: +key,
          records: group[key],
        }
      })
    })

    const datasets = computed(() => {
      return [
        // {
        //   type: 'line',
        //   label: '總花費',
        //   data: arrayByYear.value.map((item) => item.records.reduce((total, item) => (total += item.cost), 0)),
        //   borderColor: colors[0],
        //   backgroundColor: colors[0],
        //   fill: false,
        // },
        {
          type: 'line',
          label: '總票數',
          data: arrayByYear.value.map(item => item.records.reduce((total, item) => (total += item.tickets), 0)),
          borderColor: colors[3],
          backgroundColor: colors[3],
          fill: false,
        },
        {
          type: 'line',
          label: '總場數',
          data: arrayByYear.value.map(item => item.records.length),
          borderColor: colors[2],
          backgroundColor: colors[2],
          fill: false,
        },
        // {
        //   type: 'line',
        //   label: '平均每張票花費',
        //   data: arrayByYear.value.map((item) => {
        //     const records = item.records; // filter((item) => item.cost > 0)
        //     return (
        //       +(
        //         records.reduce((total, item) => (total += item.cost), 0) /
        //         records.reduce((total, item) => (total += item.tickets), 0)
        //       ).toFixed(2) || 0
        //     );
        //   }),
        //   borderColor: colors[1], // colors[Math.floor(Math.random() * colors.length)]
        //   backgroundColor: colors[1],
        //   fill: false,
        // },
        // {
        //   type: 'line',
        //   label: '平均每次花費',
        //   data: arrayByYear.value.map((item) => {
        //     const records = item.records; // filter((item) => item.cost > 0)
        //     return +(records.reduce((total, item) => (total += item.cost), 0) / records.length).toFixed(2) || 0;
        //   }),
        //   borderColor: colors[4], // colors[Math.floor(Math.random() * colors.length)]
        //   backgroundColor: colors[4],
        //   fill: false,
        // },
      ]
    })
    const labels = computed(() => arrayByYear.value.map(item => `${item.id}`))

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
