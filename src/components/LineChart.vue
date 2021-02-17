<template>
  <canvas :id="id" :key="id"></canvas>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, onMounted, Ref, ref, watch } from 'vue';
import Chart, { ChartDataSets } from 'chart.js';
import { useMediaQuery } from '@vueuse/core';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    datasets: {
      type: Array as PropType<ChartDataSets[]>,
      required: true,
    },
    labels: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const lineInstance: Ref<Chart | null> = ref(null);
    const isLargeScreen = useMediaQuery('(min-width: 768px)');

    watch(
      () => props.datasets,
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
          datasets: props.datasets,
          labels: props.labels,
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