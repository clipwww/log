<script lang="ts">
import type { PropType } from 'vue'

import _groupBy from 'lodash/groupBy'
import { computed, defineComponent, reactive, toRefs } from 'vue'

import type { MiSportLogVM } from '@/view-models'

import ContributionChart from '@/components/ContributionChart.vue'
import { dayjs } from '@/plugins/dayjs'

export default defineComponent({
  components: {
    ContributionChart,
  },
  props: {
    id: {
      type: String,
      default: 'js-contribution',
    },
    logs: {
      type: Array as PropType<MiSportLogVM[]>,
      required: true,
    },
  },
  setup(props) {
    const groupByDate = computed(() => _groupBy(props.logs, item => dayjs(item.startTime).dayOfYear()))

    const state = reactive({
      contributions: computed(() => {
        const dayObj = dayjs(props.logs[0].startTime).startOf('year')
        const days = dayObj.isLeapYear() ? 366 : 365
        const emptyBlocks = dayObj.isoWeekday() % 7

        return Array.from({ length: emptyBlocks })
          .fill('')
          .map(() => {
            return {
              date: '',
              value: -1,
              items: [] as MiSportLogVM[],
            }
          })
          .concat(
            Array.from({ length: days })
              .fill('')
              .map((v, i) => {
                const thisDay = dayObj.add(i, 'day')
                const count = groupByDate.value[i + 1]?.length ?? 0
                const items = groupByDate.value[i + 1] || []

                return {
                  date: thisDay.toISOString(),
                  value: count,
                  items,
                }
              }),
          )
      }),
    })

    const dayDetails = reactive<{
      date: string
      items: MiSportLogVM[]
    }>({
      date: '',
      items: [],
    })

    function onClick({ date, items }: { date: string, items: MiSportLogVM[] }) {
      dayDetails.date = date
      dayDetails.items = items
    }

    function formatDate(date: string) {
      return dayjs(date).format('YYYY/MM/DD (ddd)')
    }

    return {
      ...toRefs(state),
      dayDetails,

      formatDate,
      onClick,
    }
  },
})
</script>

<template>
  <ContributionChart
    :id="id"
    :key="id"
    :contributions="contributions"
    @block-click="onClick"
  />
</template>

<style lang="scss" scoped>
</style>
