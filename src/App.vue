<template>
  <div class="bg-gray-400 lg:p-4 p-1 min-h-screen">
    <div v-if="!ready" class="bg-white p-8 rounded">
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
    <div v-else class="bg-white rounded lg:p-4 p-2">
      <div class="flex mb-8">
        <div class="border border-r-0 px-4 p-3 whitespace-no-wrap bg-gray-700 text-white rounded-l">選擇年份</div>
        <select v-model.number="filterYear" class="w-full border p-2 rounded-none bg-white rounded-r">
          <option value="">全部</option>
          <option v-for="item in arrayByYear" :key="item.id" :value="item.id">{{ item.id }}</option>
        </select>
      </div>

      <div v-if="filterArrayByYear">
        <h2 class="text-2xl text-center">{{ filterArrayByYear.id }}</h2>

        <Dashboard :id="`${filterArrayByYear.id}`" :records="filterArrayByYear.records" />
      </div>

      <div v-else>
        <h2 class="text-2xl text-center">總共</h2>

        <Dashboard id="total" :records="records" hideContributionChart />

        <div class="lg:flex items-start my-8">
          <div class="lg:w-1/2 lg:mb-0 mb-4 lg:p-4 p-0">
            <LineChart id="total" :records="records" />
          </div>
          <div class="lg:w-1/2 lg:p-4 p-0">
            <h4 class="text-center mb-2">二刷以上的電影</h4>
            <div v-for="item in arrayByTitle" :key="item.title" class="border rounded mb-3 p-2">
              <CollapseItem>
                <template v-slot:title>
                  <div class="lg:flex items-center">
                    <div class="mr-2">{{ item.title }}</div>
                    <div class="text-xl text-red-600">{{ item.count }} 次</div>
                  </div>
                </template>
                <MovieRecordItem
                  v-for="record in item.records"
                  :key="`${record.date}_${record.title}`"
                  :record="record"
                  hideTitle
                />
              </CollapseItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import _groupBy from 'lodash/groupBy';
import { dayjs, formatDate } from '@/plugins/dayjs';

import { requestGET } from '@/services';
import { MovieRecordVM } from '@/view-models';

import Dashboard from '@/components/Dashboard.vue';
import MovieRecordItem from '@/components/MovieRecordItem.vue';
import CollapseItem from '@/components/CollapseItem.vue';
import LineChart from '@/components/LineChart.vue';

export default defineComponent({
  name: 'App',
  components: {
    Dashboard,
    MovieRecordItem,
    CollapseItem,
    LineChart,
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
      ready,
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
