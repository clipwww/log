<script setup lang="ts">
import { Cell as VanCell, Tag as VanTag } from 'vant'

import type { BaseballRecordVM } from '@/view-models'

import { dayjs } from '@/plugins/dayjs'

const { record, index, total } = defineProps<{
  record: BaseballRecordVM
  index: number
  total: number
}>()

const leagueLogos: Record<string, string> = {
  CPBL: 'https://www.cpbl.com.tw/theme/common/images/project/logo_new.png',
  MLB: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1280px-Major_League_Baseball_logo.svg.png',
  WBSC: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Wbsc-logo.svg',
}

function getWinner(score: string): 'away' | 'home' | 'tie' {
  const [away, home] = score.split(':').map(Number)
  if (away > home) {
    return 'away'
  }
  if (home > away) {
    return 'home'
  }
  return 'tie'
}

function formatDate(date: string) {
  return dayjs(date).format('YYYY/MM/DD (dd)')
}
</script>

<template>
  <VanCell>
    <template #icon>
      <div class="mr-3 bg-gray-50 rounded-xl flex items-center justify-center p-1">
        <img :src="leagueLogos[record.league]" alt="league logo" class="w-10">
      </div>
    </template>
    <template #title>
      <div class="text-xs">
        {{ record.gameName }}
      </div>
      <div class="inline-flex items-center font-semibold space-x-1">
        <span :class="getWinner(record.score) === 'away' ? 'winner-text' : 'text-gray-600'">
          {{ record.awayTeam }} {{ record.score.split(':')[0] }}
        </span>
        <!-- <span v-if="getWinner(record.score) === 'away'" class="winner-trophy">🏆</span> -->
        <span class="text-gray-400">vs</span>
        <span :class="getWinner(record.score) === 'home' ? 'winner-text' : 'text-gray-600'">
          {{ record.homeTeam }} {{ record.score.split(':')[1] }}
        </span>
        <!-- <span v-if="getWinner(record.score) === 'home'" class="winner-trophy">🏆</span> -->
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
        {{ total - index }}
      </div>
    </template>
  </VanCell>
</template>

<style scoped>
.winner-text {
  background: linear-gradient(135deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: winner-shimmer 5s ease-in-out infinite;
  font-weight: 700;
}

.winner-trophy {
  font-size: 12px;
  animation: trophy-glow 2s ease-in-out infinite;
}

@keyframes winner-shimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes trophy-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.9));
  }
}
</style>
