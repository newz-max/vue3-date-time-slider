<template>
  <div :class="[`${classPrefix}-scale-group`]">
    <slot></slot>

    <div :class="[`${classPrefix}-bottom-text`]">
      <slot name="bottomText"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { classPrefix } from "../htmlClass";
</script>

<style lang="scss" scoped>
.v3date-time-slider-scale-group {
  display: flex;
  justify-content: space-between;
}
</style>
