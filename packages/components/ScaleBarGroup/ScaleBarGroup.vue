<template>
  <div
    :class="[`${classPrefix}-scale-group`, groupTypeDivClass]"
    :style="[
      {
        '--group-width': `${groupWidth}px`,
        '--scale-bar-space-width': `${leftSpace ? scaleBarSpaceWidth : 0}px`,
      },
      leftSpace ? `padding-left:${scaleBarSpaceWidth}px` : '',
    ]"
  >
    <!-- 刻度容器盒 -->
    <div :class="[`${classPrefix}-scale-group-box`]">
      <slot></slot>
    </div>
    <!-- 背景色 -->
    <div :class="[`${classPrefix}-backgroup-color-div`]"></div>

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
  const spaceWidth = scaleBarSpaceWidth.value || 0;
  const barLength = props.scaleBarLength || 0;

  const res = spaceWidth * barLength;

  return res;
});
</script>

<style lang="scss" scoped>
.v3date-time-slider-scale-group {
  display: flex;
  --month-width: 288px;
  --day-width: 380px;
  --time-width: 67px;
  --group-width: 0px;
  width: var(--group-width);
  min-width: var(--group-width);
  position: relative;
  height: 40px;
  background-color: #585858;
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
.v3date-time-slider-bottom-text {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  height: 13px;
  margin-left: calc(var(--scale-bar-space-width) + 9px);
  padding-bottom: 3px;
}

.v3date-time-slider-backgroup-color-div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  z-index: 0;
  background-color: #4f4f4f;
}

.v3date-time-slider-scale-group-box {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
