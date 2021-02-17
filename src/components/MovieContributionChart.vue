<template>
  <ContributionChart :id="id" :key="id" :contributions="contributions" @block-click="onClick" />

  <MovieRecordsPopup v-model:records="dayDetails.records">
    <template #title>
      <div class="text-center py-2">{{ formatDate(dayDetails.date, false) }}</div>
    </template>
  </MovieRecordsPopup>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType, toRefs } from 'vue';
import _groupBy from 'lodash/groupBy';
import { dayjs } from '@/plugins/dayjs';

import { MovieRecordVM } from '@/view-models';

import ContributionChart from '@/components/ContributionChart.vue';
import MovieRecordsPopup from '@/components/MovieRecordsPopup.vue';

export default defineComponent({
  components: {
    ContributionChart,
    MovieRecordsPopup,
  },
  props: {
    id: {
      type: String,
      default: 'js-contribution',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const groupByDate = computed(() => _groupBy(props.records, (item) => dayjs(item.date).dayOfYear()));

    const state = reactive({
      contributions: computed(() => {
        const dayObj = dayjs(props.records[0].date).startOf('year');
        const days = dayObj.isLeapYear() ? 366 : 365;
        const emptyBlocks = dayObj.isoWeekday() % 7;

        return Array(emptyBlocks)
          .fill('')
          .map(() => {
            return {
              date: '',
              value: -1,
              records: [] as MovieRecordVM[],
            };
          })
          .concat(
            Array(days)
              .fill('')
              .map((v, i) => {
                const thisDay = dayObj.add(i, 'day');
                const count = groupByDate.value[i + 1]?.length ?? 0;
                const records = groupByDate.value[i + 1] || [];

                return {
                  date: thisDay.toISOString(),
                  value: count,
                  records,
                };
              })
          );
      }),
    });

    const dayDetails = reactive<{
      date: string;
      records: MovieRecordVM[];
    }>({
      date: '',
      records: [],
    });

    function onClick({ date, records }: { date: string; records: MovieRecordVM[] }) {
      dayDetails.date = date;
      dayDetails.records = records;
    }

    function formatDate(date: string) {
      return dayjs(date).format('YYYY/MM/DD (ddd)');
    }

    return {
      ...toRefs(state),
      dayDetails,

      formatDate,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
