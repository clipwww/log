<template>
  <div class="bg-gray-400 lg:p-4 p-1 min-h-screen">
    <div v-show="!ready" class="bg-white p-8 rounded">
      <div v-for="n in 5" :key="n" class="animate-pulse space-x-4">
        <div class="flex-1 space-y-2 py-1">
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="ready" class="bg-white rounded lg:p-4 p-2">
      <div v-for="item in arrayByYear" :key="item.id">
        <h2 class="text-2xl text-center">{{ item.id }}</h2>

        <ContributionChart :id="`js-contribution-${item.id}`" class="my-4" :records="item.records" />

        <div class="lg:flex items-center my-4">
          <div class="lg:w-1/2 lg:mb-0 mb-4">
            <AreaPieChart :id="`js-area-pie-${item.id}`" :records="item.records" />
          </div>
          <div class="lg:w-1/2">
            <TheaterPieChart :id="`js-theater-pie-${item.id}`" :records="item.records" />
          </div>
        </div>

        <div class="lg:flex items-center my-4">
          <div class="lg:w-1/2 lg:mb-0 mb-4">
            <BarChart :id="`js-bar-${item.id}`" :records="item.records" />
          </div>
        </div>

        <TotalAnalytics :records="item.records" />
      </div>

      <div class="mt-8 border rounded p-4 bg-gray-100">
        <h2 class="text-2xl text-center">總共</h2>

        <div class="lg:flex items-center">
          <div class="lg:w-1/2 lg:mb-0 mb-4">
            <AreaPieChart id="js-area-pie-total" :records="records" />
          </div>
          <div class="lg:w-1/2">
            <TheaterPieChart id="js-theater-pie-total" :records="records" />
          </div>
        </div>

        <div class="lg:flex items-center my-4">
          <div class="lg:w-1/2 lg:mb-0 mb-4">
            <BarChart id="js-bar-total" :records="records" />
          </div>
        </div>

        <div>
          <h3 class="text-xl text-center mb-2">二刷以上的電影</h3>
          <div v-for="item in arrayByTitle" :key="item.title" class="border rounded mb-3 p-2">
            <div class="lg:flex items-center">
              <div class="mr-2">{{ item.title }}</div>
              <div class="text-xl text-red-600">{{ item.count }} 次</div>
            </div>
            <div class="lg:flex items-center my-4" v-for="record in item.records" :key="record.date">
              <div class="inline-block font-bold mr-2">{{ formatDate(record.date) }}</div>
              <div class="inline-block bg-gray-400 mr-2 rounded px-2">{{ record.version }}</div>
              <div class="mr-2 lg:mt-0 mt-1">{{ record.title }}</div>
              <div class="text-xs lg:mt-0 mt-1">{{ record.theater }}</div>
            </div>
          </div>
        </div>
        <TotalAnalytics :records="records" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import _groupBy from 'lodash/groupBy';
import { dayjs, formatDate } from '@/plugins/dayjs';

import { requestGET } from '@/services';
import { MovieRecordVM } from '@/view-models';

import ContributionChart from '@/components/ContributionChart.vue';
import AreaPieChart from '@/components/AreaPieChart.vue';
import TheaterPieChart from '@/components/TheaterPieChart.vue';
import BarChart from '@/components/BarChart.vue';
import TotalAnalytics from '@/components/TotalAnalytics.vue';

export default defineComponent({
  name: 'App',
  components: {
    ContributionChart,
    AreaPieChart,
    TheaterPieChart,
    BarChart,
    TotalAnalytics,
  },
  setup() {
    const { state, ready } = useAsyncState(
      requestGET<MovieRecordVM>('https://mechakucha-api.herokuapp.com/my-movie-record'),
      {
        success: false,
        resultMessage: '',
        resultCode: '',
        resultException: '',
        items: [],
      }
    );

    const records: Ref<MovieRecordVM[]> = computed(() => state.value.items);
    const arrayByYear = computed(() => {
      const group = _groupBy(records.value, (item) => {
        return dayjs(item.date).year();
      });

      return Object.keys(group)
        .sort((a, b) => (+a > +b ? -1 : 1))
        .map((key) => {
          return {
            id: key,
            records: group[key],
          };
        });
    });
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
      ready,
      records,
      arrayByYear,
      arrayByTitle,

      formatDate,
    };
  },
});
</script>

<style lang="scss">
</style>
