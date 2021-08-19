<template>
  <canvas :id="id" :key="id"></canvas>
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
    type: {
      type: String as PropType<'bar' | 'horizontalBar'>,
      default: 'bar',
    },
  },
  setup(props, { emit }) {
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
        type: props.type,
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
          aspectRatio: isLargeScreen.value ? 1.5 : 0.8,
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
            xAxes: [
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
              textAlign: 'end',
              align: 'center',
              color: '#000000',
              textStrokeColor: '#ffffff',
              textStrokeWidth: 3,
              formatter(value) {
                return value > 0 ? value : '';
              },
            },
          },
          onClick(event, element) {
            const index = element?.[0]?.['_index'];
            const label = element?.[0]?.['_view']?.['label'];
            if (isNaN(index)) {
              return;
            }

            emit('bar-click', {
              index,
              label,
            });
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