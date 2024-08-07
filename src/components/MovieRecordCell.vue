<template>
  <van-cell center border :size="size">
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
        <van-tag class="mr-2" plain type="default">{{ record.area }}</van-tag>
        <van-tag class="mr-2" plain type="primary">{{ record.version }}</van-tag>
        <van-tag plain type="success">{{ record.theater }}</van-tag>
      </div>
      <div class="text-sm">{{ record.memo }}</div>
      <div class="text-xs mt-2">{{ formatDateTime(record.date) }}</div>
    </template>
    <template #extra>
      <div class="text-right text-gray-500 ml-1">
        <div>x {{ record.tickets }}</div>
        <div class="text-xs">$ {{ record.cost }}</div>
      </div>
    </template>
  </van-cell>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Cell, Tag, CellSize } from 'vant';

import { dayjs } from '@/plugins/dayjs';
import { MovieRecordVM } from '@/view-models';

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
    index: { type: Number }
  },
  setup(props) {
    function formatDateTime(date: string | Date) {
      return dayjs(date).format(props.format);
    }
    return {
      formatDateTime,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>