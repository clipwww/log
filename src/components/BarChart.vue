<template>
  <canvas :id="id"></canvas>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, onMounted, Ref, ref, watch, computed, reactive } from 'vue';
import _groupBy from 'lodash/groupBy';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { dayjs } from '@/plugins/dayjs';
import { MovieRecordVM } from '@/view-models';
import { colors } from '@/utils';

Chart.plugins.unregister(ChartDataLabels);

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
    const months = Array(12)
      .fill('')
      .map((_, i) => i);

    const barInstance: Ref<Chart | null> = ref(null);
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
    });

    watch(
      () => props.records,
      async () => {
        await nextTick();
        initChart();
      }
    );

    onMounted(() => {
      initChart();
    });

    function initChart() {
      const ctx = (document.getElementById(props.id) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
      barInstance.value = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
          datasets: [
            {
              data: dataset.data,
              backgroundColor: colors,
            },
          ],
          labels: months.map((m) => dayjs().month(m).format('MMM')),
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: '每個月看電影的次數',
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  stepSize: 1,
                },
              },
            ],
          },
          plugins: {
            datalabels: {
              textAlign: 'center',
              align: 'center',
              color: '#ffffff',
              formatter(value) {
                return value > 0 ? `${value}次` : '';
              },
            },
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