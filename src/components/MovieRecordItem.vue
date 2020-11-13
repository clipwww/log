<template>
  <div class="my-4">
    <div class="flex items-center">
      <div class="inline-block font-bold mr-2">{{ formatDateTime(record.date) }}</div>
      <div class="inline-block bg-gray-400 mr-2 rounded px-2 text-xs">{{ record.version }}</div>
      <div class="text-xs">{{ record.theater }}</div>
    </div>
    <div v-if="!hideTitle" class="mr-2">{{ record.title }}</div>

    <div class="text-xs text-gray-500">{{ record.memo }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { dayjs } from '@/plugins/dayjs';
import { MovieRecordVM } from '@/view-models';

export default defineComponent({
  props: {
    record: {
      type: Object as PropType<MovieRecordVM>,
      required: true,
    },
    format: {
      type: String,
      default: 'YYYY/MM/DD HH:mm',
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
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