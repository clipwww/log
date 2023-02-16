<template>
  <div :class="isReady ? 'pb-16' : 'py-4'">
    <van-skeleton title :row="10" :loading="!isReady" round>
      <van-tabs v-model:active="activeTab" sticky border>
        <van-tab title="資料" name="data">
          <div class="text-center my-2">
            <TotalAnalytics :records="records" />
          </div>
          <van-tabs :offset-top="44" :line-height="1" scrollspy sticky border>
            <van-tab v-for="item in arrayByYear" :title="`${item.id}`" :key="item.id">
              <div class="max-w-2xl mx-auto">
                <van-cell-group border>
                  <template #title>
                    <div class="text-center">{{ item.id }}</div>
                    <div class="mt-3 mb-1">
                      <MovieContributionChart :id="`js-contribution-${item.id}`" :records="item.records" />
                    </div>
                    <TotalAnalytics :records="item.records" />
                  </template>
                  <MovieRecordCell
                    v-for="record in item.records"
                    :record="record"
                    :key="`${record.date}_${record.title}`"
                  />
                </van-cell-group>
              </div>
            </van-tab>
          </van-tabs>
        </van-tab>
        <van-tab title="場數" name="frequency">
          <div class="max-w-2xl mx-auto px-2">
            <van-tabs :line-height="1" border>
              <van-tab title="全部">
                <MovieLineChart id="total" :records="records" />
                <div class="text-center text-xs my-2">累積下來每個月各看了幾場電影</div>
                <FrequencyBarChart :id="`js-frequency-all`" :records="records" />
              </van-tab>
              <van-tab v-for="item in arrayByYear" :title="`${item.id}`" :key="item.id">
                <div class="text-center text-xs my-2">{{ item.id }} 每個月各看了幾場電影</div>
                <FrequencyBarChart :id="`js-frequency-${item.id}`" :records="item.records" />
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
        <van-tab title="時間" name="time">
          <div class="max-w-2xl mx-auto px-2">
            <van-tabs :line-height="1" border>
              <van-tab title="全部">
                <MovieTimeHeatmapChart :id="`js-heatmap-all`" :records="records" />
              </van-tab>
              <van-tab v-for="item in arrayByYear" :title="`${item.id}`" :key="item.id">
                <MovieTimeHeatmapChart :id="`js-heatmap-${item.id}`" :records="item.records" />
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
        <van-tab title="影廳" name="theater">
          <div class="max-w-2xl mx-auto px-2">
            <van-tabs :line-height="1" border>
              <van-tab title="全部">
                <TheaterBarChart :id="`js-theater-bar-all`" :records="records" />
              </van-tab>
              <van-tab v-for="item in arrayByYear" :title="`${item.id}`" :key="item.id">
                <TheaterBarChart :id="`js-theater-bar-${item.id}`" :records="item.records" />
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
        <van-tab title="版本" name="version">
          <div class="max-w-2xl mx-auto px-2">
            <van-tabs :line-height="1" border>
              <van-tab title="全部">
                <VersionBarChart :id="`js-version-bar-all`" :records="records" />
              </van-tab>
              <van-tab v-for="item in arrayByYear" :title="`${item.id}`" :key="item.id">
                <VersionBarChart :id="`js-version-bar-${item.id}`" :records="item.records" />
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
        <van-tab title="國別" name="area">
          <div class="max-w-2xl mx-auto px-2">
            <van-tabs :line-height="1" border>
              <van-tab title="全部">
                <AreaPieChart :id="`js-area-pie-all`" :records="records" />
              </van-tab>
              <van-tab v-for="item in arrayByYear" :title="`${item.id}`" :key="item.id">
                <AreaPieChart :id="`js-area-pie-${item.id}`" :records="item.records" />
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
        <van-tab title="多刷" name="secondtime">
          <div class="max-w-2xl mx-auto">
            <van-collapse v-model="activeCollapse" accordion>
              <van-collapse-item v-for="item in arrayByTitle" :key="item.title" :name="item.title">
                <template #title>
                  <div class="flex items-center">
                    <van-tag class="mr-2" type="primary" plain size="medium">x {{ item.count }}</van-tag>
                    <span class="text-xs">{{ item.title }}</span>
                  </div>
                </template>
                <div class="-mx-3 -my-4">
                  <MovieRecordCell
                    v-for="record in item.records"
                    :record="record"
                    :key="`${record.date}_${record.title}`"
                    hideTitle
                    size="mini"
                  />
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
      </van-tabs>
    </van-skeleton>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import _groupBy from 'lodash/groupBy';
import { dayjs, formatDate } from '@/plugins/dayjs';
import { Tabs, Tab, Skeleton, CellGroup, Collapse, CollapseItem, Tag } from 'vant';

import { requestGET } from '@/services';
import { MovieRecordVM } from '@/view-models';

import MovieLineChart from '@/components/MovieLineChart.vue';
import MovieRecordCell from '@/components/MovieRecordCell.vue';
import FrequencyBarChart from '@/components/FrequencyBarChart.vue';
import MovieTimeHeatmapChart from '@/components/MovieTimeHeatmapChart.vue';
import TotalAnalytics from '@/components/TotalAnalytics.vue';
import AreaPieChart from '@/components/AreaPieChart.vue';
import TheaterBarChart from '@/components/TheaterBarChart.vue';
import VersionBarChart from '@/components/VersionBarChart.vue';
import MovieContributionChart from '@/components/MovieContributionChart.vue';

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
    const { state, isReady } = useAsyncState(requestGET<MovieRecordVM>('movie'), {
      success: false,
      resultMessage: '',
      resultCode: '',
      resultException: '',
      items: [],
    });

    const activeTab = ref('data');
    const activeCollapse = ref('');
    const filterYear = ref(dayjs().year());
    const records: Ref<MovieRecordVM[]> = computed(() => state.value.items);
    const arrayByYear = computed(() => {
      const group = _groupBy(records.value, (item) => {
        return dayjs(item.date).year();
      });

      return Object.keys(group)
        .sort((a, b) => (+a > +b ? -1 : 1))
        .map((key) => {
          return {
            id: +key,
            records: group[key],
          };
        });
    });
    const filterArrayByYear: Ref<{ id: number; records: MovieRecordVM[] } | undefined> = computed(() =>
      arrayByYear.value.find((item) => item.id === filterYear.value)
    );

    const arrayByTitle = computed(() => {
      const groupByTitle = _groupBy(records.value, (item) => {
        return item.title;
      });

      return Object.keys(groupByTitle)
        .map((key) => {
          return {
            title: key,
            count: groupByTitle[key].length,
            records: records.value.filter((item) => key === item.title),
          };
        })
        .filter((item) => item.count > 1)
        .sort((a, b) => (a.count > b.count ? -1 : 1));
    });

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
    };
  },
});
</script>

<style lang="scss">
</style>
