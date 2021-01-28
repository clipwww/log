<template>
  <canvas :id="id" :key="id"></canvas>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, onMounted, Ref, ref, watch, computed } from 'vue';
import _groupBy from 'lodash/groupBy';
import Chart from 'chart.js';
import { useMediaQuery } from '@vueuse/core';

import { dayjs } from '@/plugins/dayjs';
import { colors } from '@/utils';
import { MovieRecordVM } from '@/view-models';

export default defineComponent({
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
    const lineInstance: Ref<Chart | null> = ref(null);
    const isLargeScreen = useMediaQuery('(min-width: 768px)');

    const arrayByYear = computed(() => {
      const group = _groupBy(props.records, (item) => {
        return dayjs(item.date).year();
      });

      return Object.keys(group).map((key) => {
        return {
          id: +key,
          records: group[key],
        };
      });
    });

    watch(
      () => props.records,
      () => {
        initChart();
      }
    );

    onMounted(() => {
      initChart();
    });

    async function initChart() {
      await nextTick();

      if (lineInstance.value) {
        lineInstance.value.clear();
      }

      const ctx = (document.getElementById(props.id) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
      lineInstance.value = new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [
            // {
            //   type: 'line',
            //   label: '總花費',
            //   data: arrayByYear.value.map((item) => item.records.reduce((total, item) => (total += item.cost), 0)),
            //   borderColor: colors[0],
            //   backgroundColor: colors[0],
            //   fill: false,
            // },
            // {
            //   type: 'line',
            //   label: '總票數',
            //   data: arrayByYear.value.map((item) => item.records.reduce((total, item) => (total += item.tickets), 0)),
            //   borderColor: colors[3],
            //   backgroundColor: colors[3],
            //   fill: false,
            // },
            {
              type: 'line',
              label: '總場數',
              data: arrayByYear.value.map((item) => item.records.length),
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
          ],
          labels: arrayByYear.value.map((item) => item.id),
        },
        options: {
          responsive: true,
          aspectRatio: isLargeScreen.value ? 1.5 : 1,
          title: {
            display: false,
          },
          legend: {
            display: true,
          },
          tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              // label() {
              //   return 'RR';
              // },
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                },
              },
            ],
          },
        },
      });
    }

    return {};
  },
});
</script>

<style lang="scss" scoped>
</style>