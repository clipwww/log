<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Cell as VanCell, List as VanList, NavBar as VanNavBar, Popup as VanPopup, Skeleton as VanSkeleton, Tab as VanTab, Tabs as VanTabs, Tag as VanTag } from 'vant'
import { computed, nextTick, onMounted, ref } from 'vue'

import type { BaseballRecordVM } from '@/view-models'

import BarChart from '@/components/BarChart.vue'
import { dayjs } from '@/plugins/dayjs'
import { requestGET } from '@/services'

const records = ref<BaseballRecordVM[]>([])
const loading = ref(true)
const activeTab = ref('map')
const listFilter = ref<'all' | 'intl' | 'cpbl'>('all')
const showVenuePopup = ref(false)
const popupVenue = ref('')
const popupRecords = ref<BaseballRecordVM[]>([])

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

let mapInstance: L.Map | null = null

function initMap() {
  if (!document.getElementById('map')) {
    return
  }

  if (mapInstance) {
    return
  }

  mapInstance = L.map('map')
  mapInstance.fitBounds([
    [21.5, 118.0],
    [36.8, 141.5],
  ])
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance)

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

      L.marker(coord, { icon: mapIcon }).addTo(mapInstance!).bindPopup(`
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
      if (activeTab.value === 'map') {
        initMap()
      }
    })
  } else {
    loading.value = false
  }
})

function isIntlRecord(r: BaseballRecordVM) {
  return r.homeTeam.includes('台灣') || r.awayTeam.includes('台灣')
}

const filteredRecords = computed(() => {
  if (listFilter.value === 'intl') {
    return records.value.filter(r => isIntlRecord(r))
  }
  if (listFilter.value === 'cpbl') {
    return records.value.filter(r => r.league === 'CPBL')
  }
  return records.value
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

const intlGameCount = computed(() => {
  return records.value.filter(r => isIntlRecord(r)).length
})

const taiwanIntlStats = computed(() => {
  let wins = 0
  let total = 0
  records.value.forEach((r) => {
    if (!isIntlRecord(r)) {
      return
    }
    const [away, home] = r.score.split(':').map(Number)
    const isHome = r.homeTeam.includes('台灣')
    const taiwanScore = isHome ? home : away
    const oppScore = isHome ? away : home
    if (taiwanScore > oppScore) {
      wins++
    }
    total++
  })

  return {
    total,
    winRate: total ? `${((wins / total) * 100).toFixed(1)}%` : '0%',
  }
})

const venueStats = computed(() => {
  const counts = new Map<string, number>()
  records.value.forEach((record) => {
    counts.set(record.venue, (counts.get(record.venue) ?? 0) + 1)
  })
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1])

  return {
    labels: sorted.map(([venue]) => venue),
    data: sorted.map(([, count]) => count),
  }
})

const venueListInPopup = computed(() => {
  return [...popupRecords.value].sort((a, b) => (a.date > b.date ? -1 : 1))
})

function handleBarClick(payload: { index: number, label: string }) {
  const venue = payload.label
  if (!venue) {
    return
  }
  popupVenue.value = venue
  popupRecords.value = records.value.filter(record => record.venue === venue)
  showVenuePopup.value = true
}

function handleTabChange(name: string) {
  if (name === 'map') {
    nextTick(() => {
      initMap()
    })
  }
}

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
        <div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div class="rounded-xl border border-solid border-gray-200 bg-white p-4 shadow-sm">
            <div class="text-xs text-gray-500">
              總場次
            </div>
            <div class="mt-1 text-2xl font-semibold text-gray-900">
              {{ records.length }}
            </div>
          </div>
          <div class="rounded-xl border border-solid border-gray-200 bg-white p-4 shadow-sm">
            <div class="text-xs text-gray-500">
              主場勝率
            </div>
            <div class="mt-1 text-2xl font-semibold text-gray-900">
              {{ homeWinRate }}
            </div>
          </div>
          <div class="rounded-xl border border-solid border-gray-200 bg-white p-4 shadow-sm">
            <div class="text-xs text-gray-500">
              國際賽場次
            </div>
            <div class="mt-1 text-2xl font-semibold text-gray-900">
              {{ intlGameCount }}
            </div>
          </div>
          <div class="rounded-xl border border-solid border-gray-200 bg-white p-4 shadow-sm">
            <div class="text-xs text-gray-500">
              國際賽事台灣勝率
            </div>
            <div class="inline-block mt-1 text-2xl font-semibold text-gray-900">
              {{ taiwanIntlStats.winRate }}
            </div>
            <div class="inline-block text-xs text-gray-500">
              （共 {{ taiwanIntlStats.total }} 場）
            </div>
          </div>
        </div>
      </div>
    </VanSkeleton>
    <VanTabs
      v-model:active="activeTab"
      sticky
      border
      @change="handleTabChange"
    >
      <VanTab title="地圖" name="map">
        <div id="map" style="height: 400px; margin: 16px;" class="bg-gray-100 rounded" />
      </VanTab>
      <VanTab title="球場次數" name="chart">
        <div v-if="venueStats.labels.length" class="p-4">
          <BarChart
            id="baseball-venue-count"
            :labels="venueStats.labels"
            :data="venueStats.data"
            title="各球場看球次數"
            type="horizontalBar"
            @bar-click="handleBarClick"
          />
        </div>
      </VanTab>
    </VanTabs>
    <VanSkeleton
      :loading="loading"
      title
      avatar
      :row="3"
    >
      <div class="flex gap-2 px-4 py-2">
        <VanTag
          :type="listFilter === 'all' ? 'primary' : 'default'"
          size="medium"
          @click="listFilter = 'all'"
        >
          全部
        </VanTag>
        <VanTag
          :type="listFilter === 'intl' ? 'primary' : 'default'"
          size="medium"
          @click="listFilter = 'intl'"
        >
          國際賽
        </VanTag>
        <VanTag
          :type="listFilter === 'cpbl' ? 'primary' : 'default'"
          size="medium"
          @click="listFilter = 'cpbl'"
        >
          中華職棒
        </VanTag>
      </div>
      <VanList>
        <VanCell
          v-for="(record, index) in filteredRecords"
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
              {{ filteredRecords.length - index }}
            </div>
          </template>
        </VanCell>
      </VanList>
    </VanSkeleton>
    <VanPopup
      v-model:show="showVenuePopup"
      round
      position="bottom"
      :style="{ height: '85%' }"
      closeable
    >
      <div class="px-4 py-3 text-sm font-semibold">
        {{ popupVenue }} ({{ popupRecords.length }})
      </div>
      <div class="pb-8 overflow-y-auto h-calc">
        <VanList>
          <VanCell
            v-for="(record, index) in venueListInPopup"
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
            <template #right-icon>
              <div class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                {{ venueListInPopup.length - index }}
              </div>
            </template>
          </VanCell>
        </VanList>
      </div>
    </VanPopup>
  </div>
</template>

<style lang="scss">
.h-calc {
  height: calc(100% - 40px);
}
</style>
