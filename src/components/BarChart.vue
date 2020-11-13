<template>
  <canvas :id="id"></canvas>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, onMounted, Ref, ref, watch } from 'vue';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useMediaQuery } from '@vueuse/core';

import { colors } from '@/utils';

Chart.plugins.unregister(ChartDataLabels);

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Array as PropType<number[]>,
      required: true,
    },
    labels: {
      type: Array as PropType<string[]>,
      required: true,
    },
    title: {
      type: String,
    },
  },
  setup(props) {
    const barInstance: Ref<Chart | null> = ref(null);
    const isLargeScreen = useMediaQuery('(min-width: 768px)');

    watch(
      () => props.data,
      () => {
        initChart();
      }
    );

    onMounted(() => {
      initChart();
    });

    async function initChart() {
      await nextTick();

      if (barInstance.value) {
        barInstance.value.clear();
      }

      const ctx = (document.getElementById(props.id) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
      barInstance.value = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
          datasets: [
            {
              data: props.data,
              backgroundColor: colors,
            },
          ],
          labels: props.labels,
        },
        options: {
          responsive: true,
          aspectRatio: isLargeScreen.value ? 1.5 : 1,
          title: {
            display: !!props.title,
            text: props.title,
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
              textAlign: 'start',
              align: 'top',
              color: '#000000',
              textStrokeColor: '#ffffff',
              textStrokeWidth: 3,
              formatter(value) {
                return value > 0 ? value : '';
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