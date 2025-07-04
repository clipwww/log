<script lang="ts">
import type { PropType } from 'vue'

import { Popup } from 'vant'
import { computed, defineComponent } from 'vue'

import type { MovieRecordVM } from '@/view-models'

import MovieRecordCell from './MovieRecordCell.vue'

export default defineComponent({
  components: {
    VanPopup: Popup,
    MovieRecordCell,
  },
  props: {
    records: {
      type: Array as PropType<MovieRecordVM[]>,
      required: true,
    },
  },
  emits: ['update:records'],
  setup(props, { emit }) {
    const show = computed({
      get() {
        return props.records.length > 0
      },
      set(bool) {
        if (!bool) {
          emit('update:records', [])
        }
      },
    })
    return {
      show,
    }
  },
})
</script>

<template>
  <VanPopup
    v-model:show="show"
    round
    position="bottom"
    :style="{ height: '90%' }"
    closeable
  >
    <slot name="title" />
    <div class="pb-8 overflow-y-auto h-calc">
      <MovieRecordCell
        v-for="(record, idx) in records"
        :key="`${record.date}_${record.title}`"
        :record="record"
        :index="records.length - idx"
      />
    </div>
  </VanPopup>
</template>

<style lang="scss" scoped>
.h-calc {
  height: calc(100% - 40px);
}
</style>
