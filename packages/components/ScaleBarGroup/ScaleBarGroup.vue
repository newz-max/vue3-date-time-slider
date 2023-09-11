<template>
  <div
    :class="[`${classPrefix}-scale-group`, groupTypeDivClass]"
    :style="[
      { '--group-width': `${groupWidth}px` },
      leftSpace ? `padding-left:${scaleBarSpaceWidth}px` : '',
    ]"
  >
    <slot></slot>

    <div :class="[`${classPrefix}-bottom-text`]">
      <slot name="bottomText"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { classPrefix } from "../htmlClass";
import {
  ScaleBarGroupProps,
  scaleBarGroupPropsTypes,
  scaleBarGroupPropsTypesWidth,
} from "./props";

const props = defineProps<ScaleBarGroupProps>();

/** 对应类型的 class */
const groupTypeDivClass = computed(() => {
  const res = scaleBarGroupPropsTypes[props.type];
  return res;
});

/** 对应类型的刻度间距 */
const scaleBarSpaceWidth = computed(() => {
  const res = scaleBarGroupPropsTypesWidth[props.type];
  return res;
});

/** 刻度组容器的宽度 */
const groupWidth = computed(() => {
  const res = scaleBarSpaceWidth.value * props.scaleBarLength;
  return res;
});
</script>

<style lang="scss" scoped>
.v3date-time-slider-scale-group {
  display: flex;
  justify-content: space-between;
  --month-width: 288px;
  --day-width: 76px;
  --time-width: 67px;
  --group-width: 0px;
  width: var(--group-width);
}

.v3date-time-slider-group-month {
  max-width: var(--month-width);
}
.v3date-time-slider-group-day {
  max-width: var(--day-width);
}
.v3date-time-slider-group-time {
  max-width: var(--time-width);
}
</style>
