<script lang="ts">
import type { CellSize } from 'vant'
import type { PropType } from 'vue'

import { Cell, Tag } from 'vant'
import { defineComponent } from 'vue'

import type { MovieRecordVM } from '@/view-models'

import { dayjs } from '@/plugins/dayjs'

export default defineComponent({
  components: {
    VanCell: Cell,
    VanTag: Tag,
  },
  props: {
    record: {
      type: Object as PropType<MovieRecordVM>,
      required: true,
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD HH:mm',
    },
    size: {
      type: String as PropType<CellSize>,
      default: 'large',
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
    index: { type: Number },
  },
  setup(props) {
    function formatDateTime(date: string | Date) {
      return dayjs(date).format(props.format)
    }
    return {
      formatDateTime,
    }
  },
})
</script>

<template>
  <VanCell center border :size="size">
    <template v-if="index" #icon>
      <span class="mr-3 bg-gray-100 rounded-full w-7 h-7 text-xs flex items-center justify-center font-medium">{{ index }}</span>
    </template>
    <template #title>
      <div v-if="!hideTitle" class="font-normal">
        {{ record.title }}
      </div>
    </template>
    <template #label>
      <div class="mb-2">
        <VanTag class="mr-2" plain type="default">
          {{ record.area }}
        </VanTag>
        <VanTag class="mr-2" plain type="primary">
          {{ record.version }}
        </VanTag>
        <VanTag plain type="success">
          {{ record.theater }}
        </VanTag>
      </div>
      <div class="text-sm">
        {{ record.memo }}
      </div>
      <div class="text-xs mt-2">
        {{ formatDateTime(record.date) }}
      </div>
    </template>
    <template #extra>
      <div class="text-right text-gray-500 ml-1">
        <div>x {{ record.tickets }}</div>
        <div class="text-xs">
          $ {{ record.cost }}
        </div>
      </div>
    </template>
  </VanCell>
</template>

<style lang="scss" scoped>
</style>
