<template>
  <div>
    <svg :id="id" class="w-full" :height="svgHeight"></svg>
  </div>

  <MovieRecordsPopup v-model:records="dayDetails.records">
    <template #title>
      <div class="text-center py-2">
        <div>{{ formatWeekDay(dayDetails.weekday) }} {{ formatHour(dayDetails.hour) }}</div>
      </div>
    </template>
  </MovieRecordsPopup>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType, watch, nextTick, onMounted } from 'vue';
import _groupBy from 'lodash/groupBy';
import { dayjs, formatDate } from '@/plugins/dayjs';
import * as d3 from 'd3/index';
import { useWindowSize, useDebounceFn } from '@vueuse/core';

import { MovieRecordVM } from '@/view-models';

import MovieRecordsPopup from '@/components/MovieRecordsPopup.vue';

export default defineComponent({
  components: {
    MovieRecordsPopup,
  },
  props: {
    id: {
      type: String,
      default: 'js-heatmap',
    },
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  setup(props) {
    const margin = { top: 10, right: 20, bottom: 20, left: 45 };
    const hourStart = 0;
    const hourEnd = 24;
    const rectHeight = 22;
    const svgHeight = rectHeight * (hourEnd - hourStart) + margin.top + margin.bottom;
    const chartHeight = svgHeight - margin.top - margin.bottom;
    const weekdayNames = Array(7)
      .fill('')
      .map((_, i) => dayjs().weekday(i).format('ddd'));

    const { width: windowWidth } = useWindowSize();
    const debouncedDrawGraph = useDebounceFn(drawGraph, 1000);

    const state = reactive({
      dataset: computed(() => {
        const groupByWeekday = _groupBy(props.records, (item) => {
          return dayjs(item.date).weekday();
        });

        const dataset: { weekday: number; hour: number; value: number; records: MovieRecordVM[] }[] = [];
        Array(7)
          .fill('')
          .forEach((_, weekday) => {
            Array(24)
              .fill('')
              .forEach((_, i) => {
                const records = groupByWeekday[weekday]?.filter((item) =>
                  dayjs(item.date).isSame(dayjs(item.date).hour(i), 'hour')
                );
                const value = records?.length ?? 0;
                dataset.push({ weekday: +weekday, hour: i, value, records });
              });
          });

        return dataset;
      }),
    });

    const dayDetails: {
      weekday: number;
      hour: number;
      records: MovieRecordVM[];
    } = reactive({
      weekday: 0,
      hour: 0,
      records: [],
    });

    watch(
      () => state.dataset,
      () => {
        drawGraph();
      }
    );
    watch(windowWidth, () => {
      debouncedDrawGraph();
    });

    onMounted(() => {
      drawGraph();
    });

    async function drawGraph() {
      await nextTick();

      d3.selectAll(`#${props.id} > *`).remove();
      const svg = d3.select(`#${props.id}`);
      const svgWidth = (svg?.node() as Element)?.getBoundingClientRect()?.width;
      const chartWidth = svgWidth - margin.left - margin.right;
      const rectWidth = Math.floor(chartWidth / weekdayNames.length);

      const heatMap = svg
        .append('g')
        .attr('class', 'heatMap')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      heatMap
        .append('g')
        .attr('class', 'dayLabel')
        .selectAll('text')
        .data(weekdayNames)
        .enter()
        .append('text')
        .text((d) => d)
        .attr('x', (d, i) => {
          return i * rectWidth + 5;
        })
        .attr('y', chartHeight + rectHeight * 0.7)
        .style('text-anchor', 'middle')
        .style('font-size', 12)
        .attr('transform', `translate(${rectWidth / 2}, 0)`);

      const timeScale = d3
        .scaleTime()
        .domain([dayjs().startOf('day'), dayjs().add(1, 'day').startOf('day')])
        .range([0, chartHeight]);

      const yAxis = d3
        .axisLeft(timeScale)
        .ticks(hourEnd - hourStart)
        // @ts-ignore
        .tickFormat(d3.timeFormat('%H:%M'));

      heatMap.append('g').attr('class', 'timeLabel').call(yAxis);

      const color = d3
        .scaleQuantile()
        .domain([0, 8])
        // @ts-ignore
        .range(['#eee', '#d6e685', '#8cc665', '#44a340', '#1e6823', '#18541c', '#134016', '#0d2d0f']);

      function onClick(e: Event, d: { weekday: number; hour: number; value: number; records: MovieRecordVM[] }) {
        dayDetails.weekday = d.weekday;
        dayDetails.hour = d.hour;
        dayDetails.records = d.records;
      }

      const rects = heatMap
        .append('g')
        .attr('class', 'rect')
        .selectAll('rect')
        .data(state.dataset)
        .enter()
        .append('rect')
        .attr('x', (d) => d.weekday * rectWidth + 5)
        .attr('y', (d) => d.hour * rectHeight)
        .attr('weekday', (d) => d.weekday)
        .attr('hour', (d) => d.hour)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('stroke', '#fff')
        .attr('stroke-width', '2px')
        .style('fill', '#eee')
        .attr('cursor', (d) => (d.value >= 0 ? 'pointer' : 'initial'))
        .on('click', onClick);

      heatMap
        .append('g')
        .selectAll('rect')
        .data(state.dataset)
        .enter()
        .append('text')
        .attr('x', (d) => d.weekday * rectWidth + rectWidth / 2)
        .attr('y', (d) => d.hour * rectHeight + rectHeight / 2 + 5)
        .text((d) => (d.value ? d.value : ''))
        .style('font-size', 12)
        .style('text-shadow', '1px 1px #fff, -1px -1px #fff , 0 -1px #fff, -1px 0 #fff, 1px 0 #fff, 0 1px #fff')
        .attr('fill', '#000')
        .on('click', onClick);

      rects
        .transition()
        .duration(400)
        .style('fill', (d) => color(d.value));
    }

    function formatWeekDay(weekday: number) {
      return dayjs().weekday(weekday).format('ddd');
    }

    function formatHour(hour: number) {
      const dayObj = dayjs().startOf('day');
      return dayObj.hour(hour).format('HH:mm') + '~' + dayObj.hour(hour + 1).format('HH:mm');
    }

    return {
      svgHeight,
      dayDetails,

      formatDate,
      formatWeekDay,
      formatHour,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>