<template>
  <div class="mx-auto relative">
    <div class="w-full overflow-x-auto">
      <svg :id="id" :key="id" :width="62 * rectWidth" :height="10 * rectWidth"></svg>
    </div>
    <div v-show="dayDetails.show" class="border rounded">
      <div class="p-2 bg-gray-600 text-white rounded-t flex items-center justify-between">
        <div>{{ formatDate(dayDetails.date, false) }}</div>
        <div class="font-bold cursor-pointer text-xl" @click="dayDetails.show = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            focusable="false"
            role="img"
            class="iconify iconify--mdi"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            style="transform: rotate(360deg)"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <div class="px-2 rounded-b">
        <MovieRecordItem
          v-for="item in dayDetails.records"
          format="HH:mm"
          :key="`${item.date}_${item.title}`"
          :record="item"
        />
        <div class="p-2" v-if="!dayDetails.records.length">
          <div class="text-xs text-gray-400">這裡什麼都沒有唷</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType, watch, nextTick, toRefs, onMounted } from 'vue';
import _groupBy from 'lodash/groupBy';
import { dayjs, formatDate } from '@/plugins/dayjs';
import * as d3 from 'd3/index';

import { MovieRecordVM } from '@/view-models';

import MovieRecordItem from '@/components/MovieRecordItem.vue';

export default defineComponent({
  components: {
    MovieRecordItem,
  },
  props: {
    id: {
      type: String,
      default: 'js-contribution',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const rectWidth = 15;
    const svgPadding = rectWidth + 5;
    const svgFontSize = 12;

    const monthNames = Array(12)
      .fill('')
      .map((_, i) => dayjs().month(i).format('MMM'));
    const weekdayNames = Array(7)
      .fill('')
      .map((_, i) => dayjs().weekday(i).format('dd'))
      .filter((_, i) => i % 2 === 1);

    const arrayByDate = computed(() => _groupBy(props.records, (item) => dayjs(item.date).dayOfYear()));

    const state = reactive({
      contributions: computed(() => {
        const dayObj = dayjs(props.records[0].date).startOf('year');
        const days = dayObj.isLeapYear() ? 366 : 365;
        const emptyBlocks = dayObj.isoWeekday() % 7;

        return Array(emptyBlocks)
          .fill('')
          .map(() => {
            return {
              date: '',
              value: -1,
              records: [] as MovieRecordVM[],
            };
          })
          .concat(
            Array(days)
              .fill('')
              .map((v, i) => {
                const thisDay = dayObj.add(i, 'day');
                const count = arrayByDate.value[i + 1]?.length ?? 0;
                const records = arrayByDate.value[i + 1] || [];

                return {
                  date: thisDay.toISOString(),
                  value: count,
                  records,
                };
              })
          );
      }),
    });

    const dayDetails: {
      show: boolean;
      date: string;
      records: MovieRecordVM[];
    } = reactive({
      show: false,
      date: '',
      records: [],
    });

    watch(
      () => state.contributions,
      async () => {
        await nextTick();
        drawGraph();
      }
    );

    watch(
      () => dayDetails.show,
      (bool) => {
        if (!bool) {
          dayDetails.date = '';
          dayDetails.records = [];
        }
      }
    );

    onMounted(() => {
      drawGraph();
    });

    function drawGraph() {
      const svg = d3.select(`#${props.id}`);

      const heatMap = svg
        .append('g')
        .attr('class', 'mainChart')
        .attr('transform', `translate(${svgPadding}, ${svgPadding})`);

      const rect = heatMap.selectAll('rect').data(state.contributions);
      const color = d3
        .scaleQuantile()
        .domain([-1, 0, 1, 2, 3, 4, 5])
        // @ts-ignore
        .range(['#fff', '#eee', '#d6e685', '#8cc665', '#44a340', '#1e6823']);

      rect
        .enter()
        .append('rect')
        .attr('height', rectWidth)
        .attr('width', rectWidth)
        .attr('fill', (d) => {
          return color(d.value);
        })
        .attr('y', (_, i) => {
          return (i % 7) * (rectWidth + 2);
        })
        .attr('x', (_, i) => {
          return ~~(i / 7) * (rectWidth + 2);
        })
        .attr('title', (d) => d.date)
        .attr('cursor', (d) => (d.value >= 0 ? 'pointer' : 'initial'))
        .on('click', (e: Event, d) => {
          if (d.value < 0) {
            dayDetails.show = false;
            return;
          }

          dayDetails.show = true;
          dayDetails.date = d.date;
          dayDetails.records = [...d.records].reverse();
        });

      svg
        .append('g')
        .attr('class', 'xAxis')
        .selectAll('text')
        .data(monthNames)
        .enter()
        .append('text')
        .text((d) => d)
        .attr('x', (d, i) => {
          return i * (rectWidth + 2) * 4.333 + (svgFontSize + svgPadding);
        })
        .attr('y', svgFontSize)
        .style('text-anchor', 'middle')
        .style('font-size', svgFontSize);

      svg
        .append('g')
        .attr('class', 'yAxis')
        .selectAll('text')
        .data(weekdayNames)
        .enter()
        .append('text')
        .text((d) => d)
        .attr('y', (d, i) => {
          return i * ((rectWidth + 2) * 2) + (svgFontSize + svgPadding + rectWidth);
        })
        .attr('x', svgFontSize)
        .style('text-anchor', 'middle')
        .style('font-size', svgFontSize);
    }

    return {
      ...toRefs(state),
      rectWidth,
      dayDetails,

      formatDate,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
