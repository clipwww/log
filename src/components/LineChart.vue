<script lang="ts">
import type { ChartDataSets } from 'chart.js'
import type { PropType, Ref } from 'vue'

import { useMediaQuery } from '@vueuse/core'
import Chart from 'chart.js'
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'

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
    const lineInstance: Ref<Chart | null> = ref(null)
    const isLargeScreen = useMediaQuery('(min-width: 768px)')

    watch(
      () => props.datasets,
      () => {
        initChart()
      },
    )

    onMounted(() => {
      initChart()
    })

    async function initChart() {
      await nextTick()

      if (lineInstance.value) {
        lineInstance.value.clear()
      }

      const ctx = (document.getElementById(props.id) as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
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
      })
    }

    return {}
  },
})
</script>

<template>
  <canvas :id="id" :key="id" />
</template>

<style lang="scss" scoped>
</style>
