<template>
  <div class="mx-auto relative">
    <div class="w-full overflow-x-auto">
      <svg :id="id" :key="id" :width="62 * rectWidth" :height="10 * rectWidth"></svg>
    </div>
  </div>

  <MovieRecordsPopup v-model:records="dayDetails.records">
    <template #title>
      <div class="text-center py-2">{{ formatDate(dayDetails.date, false) }}</div>
    </template>
  </MovieRecordsPopup>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType, watch, nextTick, toRefs, onMounted } from 'vue';
import _groupBy from 'lodash/groupBy';
import { dayjs } from '@/plugins/dayjs';
import * as d3 from 'd3/index';

import { MovieRecordVM } from '@/view-models';

import MovieRecordsPopup from '@/components/MovieRecordsPopup.vue';

export default defineComponent({
  components: {
    MovieRecordsPopup,
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

    const dayDetails = reactive<{
      date: string;
      records: MovieRecordVM[];
    }>({
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

    function formatDate(date: string) {
      return dayjs(date).format('YYYY/MM/DD (ddd)');
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
