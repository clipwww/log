<script setup lang="ts">
import type { PropType } from 'vue'

import { useDateFormat } from '@vueuse/core'
import { computed, defineProps } from 'vue'

import type { MiActivityLogVM } from '@/view-models'

const props = defineProps({
  logs: {
    type: Array as PropType<MiActivityLogVM[]>,
    required: true,
  },
})

const sumStep = computed(() => props.logs.reduce((sum, cur) => (sum += cur.steps), 0))
const sumCalories = computed(() => props.logs.reduce((sum, cur) => (sum += cur.calories), 0))
const sumDistance = computed(() => (props.logs.reduce((sum, cur) => (sum += cur.distance), 0) / 1000).toFixed(2))

const maxStepLog = computed(() =>
  props.logs.reduce((max, cur) => {
    if (!max) {
      return cur
    }

    return cur.steps > max?.steps ? cur : max
  }),
)
const maxStepDate = useDateFormat(maxStepLog.value.date, 'YYYY/MM/DD')

const avgStep = computed(() => Math.floor(sumStep.value / props.logs.length))
const avgCalories = computed(() => Math.floor(sumCalories.value / props.logs.length))
</script>

<template>
  <div>
    <div>總共走了 {{ sumStep }} 步，消耗總熱量 {{ sumCalories }} kcal</div>
    <div>總距離 {{ sumDistance }} km</div>
    <div class="my-1">
      平均每天 {{ avgStep }} 步，消耗熱量 {{ avgCalories }} kcal
    </div>
    <div>走最多步的一天是 {{ maxStepDate }} ，共 {{ maxStepLog.steps }} 步</div>
  </div>
</template>

<style lang="scss" scoped>
</style>
