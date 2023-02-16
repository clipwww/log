<template>
  <div>
    <svg :id="id" class="w-full" :height="svgHeight"></svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, nextTick, onMounted } from 'vue';
import { dayjs } from '@/plugins/dayjs';
import * as d3 from 'd3';
import { useWindowSize, useDebounceFn } from '@vueuse/core';

export default defineComponent({
  props: {
    id: {
      type: String,
      default: 'js-heatmap',
    },
    dataset: {
      type: Array as PropType<{ weekday: number; hour: number; value: number }[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
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

    watch(
      () => props.dataset,
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

      if (svgWidth < 0 || chartWidth < 0 || rectWidth < 0) {
        return;
      }

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
        .tickFormat(d3.timeFormat('%H:%M'));

      heatMap.append('g').attr('class', 'timeLabel').call(yAxis);

      const color = d3
        .scaleQuantile()
        .domain([0, 8])
        .range(['#eee', '#d6e685', '#8cc665', '#44a340', '#1e6823', '#18541c', '#134016', '#0d2d0f']);

      const rects = heatMap
        .append('g')
        .attr('class', 'rect')
        .selectAll('rect')
        .data(props.dataset)
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
        .on('click', (e, d) => emit('block-click', d));

      heatMap
        .append('g')
        .selectAll('rect')
        .data(props.dataset)
        .enter()
        .append('text')
        .attr('x', (d) => d.weekday * rectWidth + rectWidth / 2)
        .attr('y', (d) => d.hour * rectHeight + rectHeight / 2 + 5)
        .text((d) => (d.value ? d.value : ''))
        .style('font-size', 12)
        .attr('fill', (d) => (d.value < 3 ? '#000' : '#fff'))
        .on('click', (e, d) => emit('block-click', d));

      rects
        .transition()
        .duration(400)
        .style('fill', (d) => color(d.value));
    }

    return {
      svgHeight,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>