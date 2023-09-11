<template>
  <div
    ref="scaleBarRef"
    :class="[classByType, `${classPrefix}-scale-bar`]"
  ></div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { ScaleBarProps, scaleBarPropstypes } from ".";
import { classPrefix } from "../htmlClass";

const props = defineProps<ScaleBarProps>();

const classByType = computed(() => {
  const res = scaleBarPropstypes[props.type];
  return res;
});

const scaleBarRef = ref<HTMLDivElement>();
</script>

<style lang="scss" scoped>
.v3date-time-slider-scale-bar {
  width: 1px;
}

.v3date-time-slider-default-scale-bar {
  height: 20px;
  background-color: #808080;
}

.v3date-time-slider-day-middle-scale-bar {
  height: 28px;
  background-color: #cbc9c9;
}

.v3date-time-slider-bar-start,
.v3date-time-slider-bar-end {
  height: 40px;
  background-color: white;
}
</style>
