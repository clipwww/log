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
    title: {
      type: String,
    },
    data: {
      type: Array as PropType<number[]>,
      required: true,
    },
    labels: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const pieInstance: Ref<Chart | null> = ref(null);
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

      if (pieInstance.value) {
        pieInstance.value.clear();
      }

      const ctx = (document.getElementById(props.id) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
      pieInstance.value = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'pie',
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
          aspectRatio: isLargeScreen.value ? 1.5 : props.labels.length > 10 ? 0.7 : 1,
          title: {
            display: !!props.title,
            text: props.title,
          },
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                const index = tooltipItem.index as number;
                const value = props.data[index];
                const total = props.data.reduce((total, val) => (total += +val), 0);
                const percentage = (value / total) * 100;
                return `${data.labels?.[index]}: ${value} (${percentage.toFixed(0)}%)`;
              },
            },
          },
          plugins: {
            datalabels: {
              color: '#000000',
              textStrokeColor: '#ffffff',
              textStrokeWidth: 3,
              formatter(value) {
                const total = props.data.reduce((total, val) => (total += +val), 0);
                const percentage = (value / total) * 100;
                return percentage < 10 ? '' : value;
              },
            },
          },
          onClick(event, element) {
            const index = element?.[0]?.['_index'];
            const label = element?.[0]?.['_view']?.['label'];
            if (isNaN(index)) {
              return;
            }

            emit('pie-click', {
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