<template>
  <div
    ref="scalBarRef"
    class="v3date-time-slider-scale-bar"
    :class="[classByType]"
  ></div>
  <div style="display: none">{{ scalBar }}</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { ScaleBarProps } from ".";

const props = defineProps<ScaleBarProps>();

const classKeyVal = {
  default: "v3date-time-slider-default-scale-bar",
  dayMiddle: "v3date-time-slider-day-middle-scale-bar",
};
const classByType = computed(() => {
  const res = classKeyVal[props.type];
  return res;
});

const scalBarRef = ref<HTMLDivElement>();
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
</style>
