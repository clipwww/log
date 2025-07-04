<script lang="ts">
import type { Ref } from 'vue'

import { useAsyncState, useTitle } from '@vueuse/core'
import _groupBy from 'lodash/groupBy'
import { CellGroup, Collapse, CollapseItem, Skeleton, Tab, Tabs, Tag } from 'vant'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import type { MovieRecordVM } from '@/view-models'

import AreaPieChart from '@/components/AreaPieChart.vue'
import FrequencyBarChart from '@/components/FrequencyBarChart.vue'
import MovieContributionChart from '@/components/MovieContributionChart.vue'
import MovieLineChart from '@/components/MovieLineChart.vue'
import MovieRecordCell from '@/components/MovieRecordCell.vue'
import MovieTimeHeatmapChart from '@/components/MovieTimeHeatmapChart.vue'
import TheaterBarChart from '@/components/TheaterBarChart.vue'
import TotalAnalytics from '@/components/TotalAnalytics.vue'
import VersionBarChart from '@/components/VersionBarChart.vue'
import { dayjs, formatDate } from '@/plugins/dayjs'
import { requestGET } from '@/services'

export default defineComponent({
  components: {
    VanTabs: Tabs,
    VanTab: Tab,
    VanSkeleton: Skeleton,
    VanCellGroup: CellGroup,
    VanCollapse: Collapse,
    VanCollapseItem: CollapseItem,
    VanTag: Tag,

    MovieRecordCell,
    FrequencyBarChart,
    MovieTimeHeatmapChart,
    TotalAnalytics,
    AreaPieChart,
    TheaterBarChart,
    VersionBarChart,
    MovieContributionChart,
    MovieLineChart,
  },
  setup() {
    const route = useRoute()
    const title = useTitle()

    const { state, isReady } = useAsyncState(requestGET<MovieRecordVM>('movie'), {
      success: false,
      resultMessage: '',
      resultCode: '',
      resultException: '',
      items: [],
    })

    const activeTab = ref(route.query.tab?.toString() || 'data')
    const activeCollapse = ref('')
    const filterYear = ref(dayjs().year())
    const records: Ref<MovieRecordVM[]> = computed(() => state.value.items)
    const arrayByYear = computed(() => {
      const group = _groupBy(records.value, (item) => {
        return dayjs(item.date).year()
      })

      return Object.keys(group)
        .sort((a, b) => (+a > +b ? -1 : 1))
        .map((key) => {
          return {
            id: +key,
            records: group[key],
          }
        })
    })
    const filterArrayByYear: Ref<{ id: number, records: MovieRecordVM[] } | undefined> = computed(() =>
      arrayByYear.value.find(item => item.id === filterYear.value),
    )

    const arrayByTitle = computed(() => {
      const groupByTitle = _groupBy(records.value, (item) => {
        return item.title
      })

      return Object.keys(groupByTitle)
        .map((key) => {
          return {
            title: key,
            count: groupByTitle[key].length,
            records: records.value.filter(item => key === item.title),
          }
        })
        .filter(item => item.count > 1)
        .sort((a, b) => (a.count > b.count ? -1 : 1))
    })

    watchEffect(() => {
      title.value = `Log | Movie | ${activeTab.value}`
    })

    return {
      isReady,
      activeTab,
      activeCollapse,
      records,
      arrayByYear,
      arrayByTitle,
      filterYear,
      filterArrayByYear,

      formatDate,
    }
  },
})
</script>

<template>
  <div :class="isReady ? 'pb-16' : 'py-4'">
    <VanSkeleton
      title
      :row="10"
      :loading="!isReady"
      round
    >
      <VanTabs v-model:active="activeTab" sticky border>
        <VanTab title="資料" name="data" :to="{ query: { tab: 'data' }, replace: true }">
          <div class="text-center my-2">
            <TotalAnalytics :records="records" />
          </div>
          <VanTabs
            :offset-top="44"
            :line-height="1"
            scrollspy
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
                      <MovieContributionChart :id="`js-contribution-${item.id}`" :records="item.records" />
                    </div>
                    <TotalAnalytics :records="item.records" />
                  </template>
                  <MovieRecordCell
                    v-for="record in item.records"
                    :key="`${record.date}_${record.title}`"
                    :record="record"
                  />
                </VanCellGroup>
              </div>
            </VanTab>
          </VanTabs>
        </VanTab>
        <VanTab title="場數" name="frequency" :to="{ query: { tab: 'frequency' }, replace: true }">
          <div class="max-w-2xl mx-auto px-2">
            <VanTabs :line-height="1" border>
              <VanTab title="全部">
                <MovieLineChart id="total" :records="records" />
                <div class="text-center text-xs my-2">
                  累積下來每個月各看了幾場電影
                </div>
                <FrequencyBarChart id="js-frequency-all" :records="records" />
              </VanTab>
              <VanTab v-for="item in arrayByYear" :key="item.id" :title="`${item.id}`">
                <div class="text-center text-xs my-2">
                  {{ item.id }} 每個月各看了幾場電影
                </div>
                <FrequencyBarChart :id="`js-frequency-${item.id}`" :records="item.records" />
              </VanTab>
            </VanTabs>
          </div>
        </VanTab>
        <VanTab title="時間" name="time" :to="{ query: { tab: 'time' }, replace: true }">
          <div class="max-w-2xl mx-auto px-2">
            <VanTabs :line-height="1" border>
              <VanTab title="全部">
                <MovieTimeHeatmapChart id="js-heatmap-all" :records="records" />
              </VanTab>
              <VanTab v-for="item in arrayByYear" :key="item.id" :title="`${item.id}`">
                <MovieTimeHeatmapChart :id="`js-heatmap-${item.id}`" :records="item.records" />
              </VanTab>
            </VanTabs>
          </div>
        </VanTab>
        <VanTab title="影廳" name="theater" :to="{ query: { tab: 'theater' }, replace: true }">
          <div class="max-w-2xl mx-auto px-2">
            <VanTabs :line-height="1" border>
              <VanTab title="全部">
                <TheaterBarChart id="js-theater-bar-all" :records="records" />
              </VanTab>
              <VanTab v-for="item in arrayByYear" :key="item.id" :title="`${item.id}`">
                <TheaterBarChart :id="`js-theater-bar-${item.id}`" :records="item.records" />
              </VanTab>
            </VanTabs>
          </div>
        </VanTab>
        <VanTab title="版本" name="version" :to="{ query: { tab: 'version' }, replace: true }">
          <div class="max-w-2xl mx-auto px-2">
            <VanTabs :line-height="1" border>
              <VanTab title="全部">
                <VersionBarChart id="js-version-bar-all" :records="records" />
              </VanTab>
              <VanTab v-for="item in arrayByYear" :key="item.id" :title="`${item.id}`">
                <VersionBarChart :id="`js-version-bar-${item.id}`" :records="item.records" />
              </VanTab>
            </VanTabs>
          </div>
        </VanTab>
        <VanTab title="國別" name="area" :to="{ query: { tab: 'area' }, replace: true }">
          <div class="max-w-2xl mx-auto px-2">
            <VanTabs :line-height="1" border>
              <VanTab title="全部">
                <AreaPieChart id="js-area-pie-all" :records="records" />
              </VanTab>
              <VanTab v-for="item in arrayByYear" :key="item.id" :title="`${item.id}`">
                <AreaPieChart :id="`js-area-pie-${item.id}`" :records="item.records" />
              </VanTab>
            </VanTabs>
          </div>
        </VanTab>
        <VanTab title="多刷" name="secondtime" :to="{ query: { tab: 'secondtime' }, replace: true }">
          <div class="max-w-2xl mx-auto">
            <VanCollapse v-model="activeCollapse" accordion>
              <VanCollapseItem v-for="item in arrayByTitle" :key="item.title" :name="item.title">
                <template #title>
                  <div class="flex items-center">
                    <VanTag
                      class="mr-2"
                      type="primary"
                      plain
                      size="medium"
                    >
                      x {{ item.count }}
                    </VanTag>
                    <span class="text-xs">{{ item.title }}</span>
                  </div>
                </template>
                <div class="-mx-3 -my-4">
                  <MovieRecordCell
                    v-for="record in item.records"
                    :key="`${record.date}_${record.title}`"
                    :record="record"
                    hide-title
                    size="normal"
                  />
                </div>
              </VanCollapseItem>
            </VanCollapse>
          </div>
        </VanTab>
      </VanTabs>
    </VanSkeleton>
  </div>
</template>

<style lang="scss">
</style>
