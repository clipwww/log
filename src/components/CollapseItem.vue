<template>
  <div>
    <div class="flex items-center justify-between cursor-pointer px-2" @click="show = !show">
      <slot name="title"></slot>
      <div class="transition-transform duration-200 ease-linear" :class="{ 'is-active': show }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          focusable="false"
          role="img"
          class="iconify iconify--ph"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 256 256"
          style="transform: rotate(360deg)"
        >
          <path
            d="M96 220a12 12 0 0 1-8.485-20.485L159.029 128L87.515 56.485a12 12 0 0 1 16.97-16.97l80 80a12 12 0 0 1 0 16.97l-80 80A11.963 11.963 0 0 1 96 220z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
    <transition name="fade">
      <div v-show="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);

    return {
      show,
    };
  },
});
</script>

<style lang="scss" scoped>
.is-active {
  transform: rotate(90deg);
}
</style>
