<script lang="ts">
import type { ConfigType } from 'dayjs'
import type { Ref } from 'vue'

import { useAsyncState } from '@vueuse/core'
import _groupBy from 'lodash/groupBy'
import { Cell, CellGroup, Skeleton, Tab, Tabs } from 'vant'
import { computed, defineComponent } from 'vue'

import type { MiSportLogVM } from '@/view-models'

import SportContributionChart from '@/components/Mi/SportContributionChart.vue'
import SportTimeHeatmapChart from '@/components/Mi/SportTimeHeatmapChart.vue'
import { dayjs } from '@/plugins/dayjs'
import { requestGET } from '@/services'

export default defineComponent({
  components: {
    VanTabs: Tabs,
    VanTab: Tab,
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanSkeleton: Skeleton,
    SportContributionChart,
    SportTimeHeatmapChart,
  },
  setup() {
    const { state, isReady } = useAsyncState(requestGET<MiSportLogVM>('mi/sport'), {
      success: false,
      resultMessage: '',
      resultCode: '',
      resultException: '',
      items: [],
    })

    const logs: Ref<MiSportLogVM[]> = computed(() => state.value.items)
    const arrayByYear = computed(() => {
      const group = _groupBy(logs.value, (item) => {
        return dayjs(item.startTime).year()
      })
      console.log(group)

      return Object.keys(group)
        .sort((a, b) => (+a > +b ? -1 : 1))
        .map((key) => {
          return {
            id: +key,
            logs: group[key],
          }
        })
    })

    function formatDate(date: ConfigType, format: string) {
      return dayjs(date).format(format)
    }

    function formatType(type: number) {
      switch (type) {
        case 1:
          return '戶外跑'
        case 6:
          return '健走'
        case 9:
          return '戶外騎乘'
        case 14:
          return '游泳'
        case 16:
          return '自由訓練'
        default:
          return type
      }
    }

    function getAllSportTime(logs: MiSportLogVM[]) {
      const totalTitme = logs.reduce((sum, cur) => (sum += cur.sportTime), 0)

      const minMilliseconds = 60
      const hourMilliseconds = minMilliseconds * 60

      const s = Math.floor(totalTitme % 60)
      const m = Math.floor((totalTitme / minMilliseconds) % 60)
      const h = Math.floor(totalTitme / hourMilliseconds)

      return {
        h,
        m: `${m}`.padStart(2, '0'),
        s: `${s}`.padStart(2, '0'),
      }
    }

    function getAllCalories(logs: MiSportLogVM[]) {
      return logs.reduce((sum, cur) => (sum += cur.calories), 0)
    }

    function formatSportTime(time: number) {
      const m = Math.floor(time / 60)
      const s = time - m * 60
      return {
        m,
        s: `${s}`.padStart(2, '0'),
      }
    }

    return {
      isReady,
      arrayByYear,
      logs,

      formatDate,
      formatType,
      formatSportTime,
      getAllSportTime,
      getAllCalories,
    }
  },
})
</script>

<template>
  <div :class="isReady ? '' : 'py-4'">
    <VanSkeleton
      title
      :row="10"
      :loading="!isReady"
      round
    >
      <VanTabs type="card" :offset-top="5" sticky>
        <VanTab title="資料">
          <VanTabs
            :offset-top="35"
            :line-height="1"
            sticky
            border
          >
            <VanTab v-for="item in arrayByYear" :key="item.id" :title="`${item.id}`">
              <div class="max-w-2xl mx-auto">
                <VanCellGroup border>
                  <template #title>
                    <div class="text-center">
                      {{ item.id }}
                    </div>
                    <div class="mt-3 mb-1">
                      <SportContributionChart :id="`js-contribution-${item.id}`" :key="item.id" :logs="item.logs" />
                    </div>
                    <div class="text-center mt-4 text-gray-500">
                      <div class="mb-1">
                        累積時數:
                        <span>{{ getAllSportTime(item.logs).h }}</span>
                        <span class="ml-1 mr-2">時</span>
                        <span>{{ getAllSportTime(item.logs).m }}</span>
                        <span class="ml-1 mr-2">分</span>
                        <span>{{ getAllSportTime(item.logs).s }}</span>
                        <span class="ml-1 mr-2">秒</span>
                      </div>
                      <div>累積消耗熱量: {{ getAllCalories(item.logs) }} kcal</div>
                    </div>
                  </template>

                  <VanCell
                    v-for="log in item.logs"
                    :key="log.id"
                    center
                    border
                  >
                    <template #icon>
                      <div class="text-center pl-2 pr-5 border-r w-20">
                        <div class="text-xs text-gray-500">
                          {{ formatDate(log.startTime, 'YYYY') }}
                        </div>
                        <div class="text-gray-700 mb-1">
                          {{ formatDate(log.startTime, 'MMMM') }}
                        </div>
                        <div class="font-bold text-xl">
                          {{ formatDate(log.startTime, 'D') }}
                        </div>
                      </div>
                    </template>

                    <template #title>
                      <div class="text-center">
                        <span class="text-xs">{{ formatType(log.type) }}</span>
                        <span class="text-xs ml-2">{{ formatDate(log.startTime, 'HH:mm:ss') }}</span>
                      </div>
                      <div class="flex items-center justify-around">
                        <div class="flex flex-col items-center justify-center px-2">
                          <div class="flex items-center text-orange-500">
                            <svg
                              class="iconify iconify--mdi mr-1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              aria-hidden="true"
                              role="img"
                              width="1em"
                              height="1em"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19.03 7.39l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0 0 18c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V7h2v7m2-13H9v2h6V1z"
                                fill="currentColor"
                              />
                            </svg>
                            <span>時間</span>
                          </div>
                          <div class="text-center mt-1">
                            <span class="text-2xl font-bold mr-1">{{ formatSportTime(log.sportTime).m }}</span>
                            <span class="text-gray-500 mr-1">m</span>
                            <span class="text-2xl font-bold mr-1">{{ formatSportTime(log.sportTime).s }}</span>
                            <span class="text-gray-500 mr-1">s</span>
                          </div>
                        </div>
                        <div class="flex flex-col items-center justify-center px-2">
                          <div class="flex items-center text-orange-500">
                            <svg
                              class="iconify iconify--mdi mr-1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              aria-hidden="true"
                              role="img"
                              width="1em"
                              height="1em"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M17.66 11.2c-.23-.3-.51-.56-.77-.82c-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32c-2.59 2.08-3.61 5.75-2.39 8.9c.04.1.08.2.08.33c0 .22-.15.42-.35.5c-.23.1-.47.04-.66-.12a.58.58 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5c.14.6.41 1.2.71 1.73c1.08 1.73 2.95 2.97 4.96 3.22c2.14.27 4.43-.12 6.07-1.6c1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6c-1.12.4-2.24-.16-2.9-.82c1.19-.28 1.9-1.16 2.11-2.05c.17-.8-.15-1.46-.28-2.23c-.12-.74-.1-1.37.17-2.06c.19.38.39.76.63 1.06c.77 1 1.98 1.44 2.24 2.8c.04.14.06.28.06.43c.03.82-.33 1.72-.93 2.27z"
                                fill="currentColor"
                              />
                            </svg>
                            <span>熱量</span>
                          </div>
                          <div class="text-center mt-1">
                            <span class="text-2xl font-bold mr-1">{{ log.calories }}</span>
                            <span class="text-gray-500">kcal</span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </VanCell>
                </VanCellGroup>
              </div>
            </VanTab>
          </VanTabs>
        </VanTab>
        <VanTab title="時間熱圖">
          <div class="pt-4">
            <SportTimeHeatmapChart :logs="logs" />
          </div>
        </VanTab>
      </VanTabs>
    </VanSkeleton>
  </div>
</template>

<style lang="scss" scoped>
</style>
