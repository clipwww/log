<template>
  <BarChart :id="id" :data="data" :labels="labels" @bar-click="onClick" />
  <MovieRecordsPopup v-model:records="showRecords">
    <template #title>
      <div class="text-center py-2">{{ showMonth }}月</div>
    </template>
  </MovieRecordsPopup>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive, toRefs, ref, Ref } from 'vue';
import _groupBy from 'lodash/groupBy';

import { dayjs } from '@/plugins/dayjs';
import { MovieRecordVM } from '@/view-models';

import BarChart from './BarChart.vue';
import MovieRecordsPopup from './MovieRecordsPopup.vue';

export default defineComponent({
  components: {
    BarChart,
    MovieRecordsPopup,
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
  },
  setup(props) {
    const months = Array(12)
      .fill('')
      .map((_, i) => i);

    const showMonth: Ref<number> = ref(0);
    const showRecords: Ref<MovieRecordVM[]> = ref([]);
    const groupByMonth = computed(() => _groupBy(props.records, (item) => dayjs(item.date).month()));

    const dataset = reactive({
      data: computed(() => {
        const obj = Object.keys(groupByMonth.value).map((key) => {
          return {
            month: +key,
            value: groupByMonth.value[key].length,
          };
        });
        return months.map((m) => obj.find((item) => item.month === m)?.value ?? 0);
      }),
      labels: months.map((m) => dayjs().month(m).format('MMM')),
    });

    function onClick({ index }: { index: number }) {
      showMonth.value = index + 1;
      showRecords.value = groupByMonth.value[index];
    }

    return {
      ...toRefs(dataset),
      showMonth,
      showRecords,

      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>