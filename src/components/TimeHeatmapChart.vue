<script lang="ts">
import type { PropType } from 'vue'

import { useDebounceFn, useWindowSize } from '@vueuse/core'
import * as d3 from 'd3'
import { defineComponent, nextTick, onMounted, watch } from 'vue'

import { dayjs } from '@/plugins/dayjs'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: 'js-heatmap',
    },
    dataset: {
      type: Array as PropType<{ weekday: number, hour: number, value: number }[]>,
      required: true,
    },
    weekdayStats: {
      type: Array as PropType<{ weekday: number, count: number }[]>,
      default: () => [],
    },
  },
  emits: ['blockClick', 'weekdayClick'],
  setup(props, { emit }) {
    const margin = { top: 10, right: 20, bottom: 20, left: 45 }
    const hourStart = 0
    const hourEnd = 24
    const rectHeight = 22
    const svgHeight = rectHeight * (hourEnd - hourStart) + margin.top + margin.bottom + (props.weekdayStats.length > 0 ? 120 : 0)
    const chartHeight = rectHeight * (hourEnd - hourStart)
    const weekdayNames = Array.from({ length: 7 })
      .fill('')
      .map((_, i) => dayjs().weekday(i).format('ddd'))

    const { width: windowWidth } = useWindowSize()
    const debouncedDrawGraph = useDebounceFn(drawGraph, 1000)

    watch(
      () => props.dataset,
      () => {
        drawGraph()
      },
    )
    watch(windowWidth, () => {
      debouncedDrawGraph()
    })

    onMounted(() => {
      drawGraph()
    })

    async function drawGraph() {
      await nextTick()

      d3.selectAll(`#${props.id} > *`).remove()
      const svg = d3.select(`#${props.id}`)

      const svgWidth = (svg?.node() as Element)?.getBoundingClientRect()?.width
      const chartWidth = svgWidth - margin.left - margin.right
      const rectWidth = Math.floor(chartWidth / weekdayNames.length)

      if (svgWidth < 0 || chartWidth < 0 || rectWidth < 0) {
        return
      }

      const heatMap = svg
        .append('g')
        .attr('class', 'heatMap')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      heatMap
        .append('g')
        .attr('class', 'dayLabel')
        .selectAll('text')
        .data(weekdayNames)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', (d, i) => {
          return i * rectWidth + 5
        })
        .attr('y', chartHeight + rectHeight * 0.7)
        .style('text-anchor', 'middle')
        .style('font-size', 12)
        .attr('transform', `translate(${rectWidth / 2}, 0)`)

      const timeScale = d3
        .scaleTime()
        .domain([dayjs().startOf('day'), dayjs().add(1, 'day').startOf('day')])
        .range([0, chartHeight])

      const yAxis = d3
        .axisLeft(timeScale)
        .ticks(hourEnd - hourStart)
        // @ts-expect-error d3 axisLeft is not typed
        .tickFormat(d3.timeFormat('%H:%M'))

      // @ts-expect-error d3 axisLeft is not typed
      heatMap.append('g').attr('class', 'timeLabel').call(yAxis)

      const color = d3
        .scaleQuantile()
        .domain([0, 8])
        // @ts-expect-error d3 scaleQuantile is not typed
        .range(['#eee', '#d6e685', '#8cc665', '#44a340', '#1e6823', '#18541c', '#134016', '#0d2d0f'])

      const rects = heatMap
        .append('g')
        .attr('class', 'rect')
        .selectAll('rect')
        .data(props.dataset)
        .enter()
        .append('rect')
        .attr('x', d => d.weekday * rectWidth + 5)
        .attr('y', d => d.hour * rectHeight)
        .attr('weekday', d => d.weekday)
        .attr('hour', d => d.hour)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('stroke', '#fff')
        .attr('stroke-width', '2px')
        .style('fill', '#eee')
        .attr('cursor', d => (d.value >= 0 ? 'pointer' : 'initial'))
        .on('click', (e, d) => emit('blockClick', d))

      heatMap
        .append('g')
        .selectAll('rect')
        .data(props.dataset)
        .enter()
        .append('text')
        .attr('x', d => d.weekday * rectWidth + rectWidth / 2)
        .attr('y', d => d.hour * rectHeight + rectHeight / 2 + 5)
        .text(d => (d.value ? d.value : ''))
        .style('font-size', 12)
        .attr('fill', d => (d.value < 3 ? '#000' : '#fff'))
        .on('click', (e, d) => emit('blockClick', d))

      rects
        .transition()
        .duration(400)
        .style('fill', d => color(d.value))

      // Draw weekday statistics
      if (props.weekdayStats && props.weekdayStats.length > 0) {
        const statMargin = { top: 50, right: 20, bottom: 30, left: 45 }
        const statHeight = 70
        const statWidth = chartWidth
        const maxCount = Math.max(...props.weekdayStats.map(s => s.count), 1)
        const barSpacing = statWidth / 7
        const barActualWidth = Math.max(barSpacing * 0.6, 30)

        const statGroup = svg
          .append('g')
          .attr('class', 'weekdayStats')
          .attr('transform', `translate(${margin.left}, ${margin.top + chartHeight + margin.bottom + statMargin.top})`)

        // Y scale for stats
        const yScale = d3.scaleLinear().domain([0, maxCount]).range([statHeight, 0])

        // Draw bars
        statGroup
          .selectAll('rect')
          .data(props.weekdayStats)
          .enter()
          .append('rect')
          .attr('x', (d, i) => i * barSpacing + (barSpacing - barActualWidth) / 2)
          .attr('y', d => yScale(d.count))
          .attr('width', barActualWidth)
          .attr('height', d => statHeight - yScale(d.count))
          .attr('rx', 3)
          .attr('fill', '#8cc665')
          .attr('cursor', 'pointer')
          .on('click', (e, d) => emit('weekdayClick', d))

        // Draw labels (count on top of bars)
        statGroup
          .selectAll('text.count')
          .data(props.weekdayStats)
          .enter()
          .append('text')
          .attr('class', 'count')
          .attr('x', (d, i) => i * barSpacing + barSpacing / 2)
          .attr('y', d => yScale(d.count) - 8)
          .text(d => d.count)
          .style('font-size', 13)
          .style('font-weight', 'bold')
          .style('text-anchor', 'middle')
          .style('fill', '#333')
          .attr('cursor', 'pointer')
          .on('click', (e, d) => emit('weekdayClick', d))

        // Draw weekday labels (below bars)
        statGroup
          .selectAll('text.weekday')
          .data(props.weekdayStats)
          .enter()
          .append('text')
          .attr('class', 'weekday')
          .attr('x', (d, i) => i * barSpacing + barSpacing / 2)
          .attr('y', statHeight + 20)
          .text(d => dayjs().weekday(d.weekday).format('ddd'))
          .style('font-size', 12)
          .style('text-anchor', 'middle')
          .style('fill', '#666')
      }
    }

    return {
      svgHeight,
    }
  },
})
</script>

<template>
  <div>
    <svg :id="id" class="w-full" :height="svgHeight" />
  </div>
</template>

<style lang="scss" scoped>
</style>
