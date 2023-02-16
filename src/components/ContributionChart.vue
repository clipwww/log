<template>
  <div class="mx-auto relative">
    <div class="w-full overflow-x-auto">
      <svg :id="id" :key="id" :width="62 * rectWidth" :height="10 * rectWidth"></svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, nextTick, onMounted } from 'vue';
import { dayjs } from '@/plugins/dayjs';
import * as d3 from 'd3';

export default defineComponent({
  props: {
    id: {
      type: String,
      default: 'js-contribution',
    },
    range: {
      type: Array as PropType<number[]>,
      default: () => ([-1, 0, 1, 2, 3, 4, 5]),
    },
    contributions: {
      type: Array as PropType<{ value: number; date: string }[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
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

    watch(
      () => props.contributions,
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

      const rect = heatMap.selectAll('rect').data(props.contributions);
      const color = d3
        .scaleQuantile()
        .domain(props.range)
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
          if (d.value) {
            emit('block-click', d);
          }
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
      rectWidth,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
