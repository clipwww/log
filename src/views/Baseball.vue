<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Cell as VanCell, List as VanList, NavBar as VanNavBar, Skeleton as VanSkeleton, SkeletonImage as VanSkeletonImage, Tag as VanTag } from 'vant'
import { computed, nextTick, onMounted, ref } from 'vue'

import type { BaseballRecordVM } from '@/view-models'

import { dayjs } from '@/plugins/dayjs'
import { requestGET } from '@/services'

const records = ref<BaseballRecordVM[]>([])
const loading = ref(true)

const venueCoords: Record<string, [number, number]> = {
  台北大巨蛋: [25.042327, 121.5601],
  台中洲際棒球場: [24.200083, 120.685861],
  台北天母棒球場: [25.114639, 121.535167],
  台中棒球場: [24.148583, 120.688917],
  澄清湖棒球場: [22.654414, 120.359086],
  東京巨蛋: [35.705556, 139.751944],
  // 添加更多如果需要
}

const mapIcon = L.icon({
  iconUrl: `${import.meta.env.BASE_URL}images/marker-icon.png`,
  iconSize: [41, 41],
  iconAnchor: [20, 41],
  popupAnchor: [0, -35],
})

const leagueLogos: Record<string, string> = {
  CPBL: 'https://www.cpbl.com.tw/theme/common/images/project/logo_new.png',
  MLB: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1280px-Major_League_Baseball_logo.svg.png',
  WBSC: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Wbsc-logo.svg',
}

function initMap() {
  const map = L.map('map').setView([23.5, 121], 7)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

  // Group records by venue
  const recordsByVenue: Record<string, BaseballRecordVM[]> = {}
  records.value.forEach((r) => {
    if (!recordsByVenue[r.venue]) {
      recordsByVenue[r.venue] = []
    }
    recordsByVenue[r.venue].push(r)
  })

  // Add markers for each venue
  Object.entries(recordsByVenue).forEach(([venue, venueRecords]) => {
    const coord = venueCoords[venue]
    if (coord) {
      const popupContent = venueRecords.map((r, idx) => `
        <div class="mb-2 ${idx > 0 ? 'border-t pt-2' : ''}">
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <strong>${r.gameName}</strong><br>
              ${r.awayTeam} ${r.score.split(':')[0]} vs ${r.homeTeam} ${r.score.split(':')[1]}<br>
              <small>${formatDate(r.date)}</small>
            </div>
            <div class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">
              ${venueRecords.length - idx}
            </div>
          </div>
        </div>
      `).join('')

      L.marker(coord, { icon: mapIcon }).addTo(map).bindPopup(`
        <div class="max-w-xs">
          <h3 class="font-bold mb-2 border-b border-solid pb-2">${venue}</h3>
          <div class="max-h-64 overflow-y-auto">
            ${popupContent}
          </div>
        </div>
      `)
    }
  })
}

onMounted(async () => {
  const result = await requestGET<BaseballRecordVM>('baseball')
  if (result.success) {
    records.value = result.items
    loading.value = false
    nextTick(() => {
      initMap()
    })
  } else {
    loading.value = false
  }
})

const homeWinRate = computed(() => {
  let wins = 0
  let total = 0
  records.value.forEach((r) => {
    const [away, home] = r.score.split(':').map(Number)
    if (home > away) {
      wins++
    }
    total++
  })
  return total ? `${(wins / total * 100).toFixed(1)}%` : '0%'
})

function formatDate(date: string) {
  return dayjs(date).format('YYYY/MM/DD (dd)')
}
</script>

<template>
  <VanNavBar title="進場看球紀錄" />

  <div class="max-w-2xl mx-auto pb-20">
    <VanSkeleton
      :loading="loading"
      title
      :row="2"
      class="p-4"
    >
      <div class="p-4">
        <h2 class="text-lg font-bold">
          統計數據
        </h2>
        <p>總場次: {{ records.length }}</p>
        <p>主場勝率: {{ homeWinRate }}</p>
      </div>
    </VanSkeleton>
    <div id="map" style="height: 400px; margin: 16px;" class="bg-gray-100 rounded" />
    <VanSkeleton
      :loading="loading"
      title
      avatar
      :row="3"
    >
      <VanList>
        <VanCell
          v-for="(record, index) in records"
          :key="record.id"
        >
          <template #icon>
            <div class="mr-3 bg-gray-50 rounded-xl flex items-center justify-center p-1">
              <img :src="leagueLogos[record.league]" alt="league logo" class="w-10">
            </div>
          </template>
          <template #title>
            <div class="text-xs">
              {{ record.gameName }}
            </div>
            <div class="inline-flex items-center justify-center font-semibold space-x-1">
              <div>{{ record.awayTeam }} <span>{{ record.score.split(':')[0] }}</span> vs {{ record.homeTeam }} <span>{{ record.score.split(':')[1] }}</span></div>
            </div>
            <div>{{ formatDate(record.date) }}</div>
          </template>
          <template #label>
            <span class="mr-3">{{ record.memo }}</span>
            <VanTag
              type="success"
              plain
            >
              {{ record.venue }}
            </VanTag>
            <a
              v-if="record.recordLink"
              class="ml-3 text-xs text-blue-300"
              :href="record.recordLink"
              target="_blank"
            >
              賽事連結
            </a>
          </template>
          <template #extra />
          <template #right-icon>
            <div class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">
              {{ records.length - index }}
            </div>
          </template>
        </VanCell>
      </VanList>
    </VanSkeleton>
  </div>
</template>

<style lang="scss"></style>
