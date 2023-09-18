<template>
  <div
    scale-bar
    ref="scaleBarRef"
    :class="[classByType, `${classPrefix}-scale-bar`]"
  >
    <div
      :id="`${classPrefix}-scale-label`"
      ref="scaleLabelRef"
      :style="{ '--arrow-left': `${arrowLeft}px` }"
      :class="[`${classPrefix}-scale-label`]"
    >
      {{ scaleLabel }}
      <div :id="`${classPrefix}-scale-label-arrow`" data-popper-arrow></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { ScaleBarProps, scaleBarPropstypes } from ".";
import { classPrefix } from "../htmlClass";
// scss
import "./styles/index.scss";
// hooks
import { usePopper, UsePopperReturnType } from "./hooks";

const props = withDefaults(defineProps<ScaleBarProps>(), {
  type: "default",
});

/** 对应刻度类型的css类名 */
const classByType = computed(() => {
  const res = scaleBarPropstypes[props.type];
  return res;
});

/** 整个刻度块标签 */
const scaleBarRef = ref<HTMLDivElement>();

/** 提示文字 */
const scaleLabel = computed(() => {
  if (props.scaleLabel) {
    return props.scaleLabel;
  }
  return "无";
});

/** 提示内容标签 */
const scaleLabelRef = ref<HTMLDivElement>();

/** 箭头左偏移量 */
const arrowLeft = computed(() => {
  const res = -(scaleBarRef.value?.offsetWidth || 0) / 2 - 1;
  return res;
});

/** 存储提示hook */
const usePopperRes = ref<UsePopperReturnType>();

usePopper(scaleBarRef, scaleLabelRef).then((res) => {
  usePopperRes.value = res;
});

/** 获取该刻度值 */
const getScaleVal = () => {
  const res = scaleLabel.value;

  return res;
};

/** 获取该刻度定位值 */
const getScalePosition = () => {
  const offsetLeft = scaleBarRef.value?.offsetLeft || null;
  console.log(offsetLeft, "offsetLeft");
  return offsetLeft;
};

onMounted(() => {
  console.log(333);
});

defineExpose({
  getScaleVal,
  getScalePosition,
});
</script>

<style lang="scss" scoped>
.v3date-time-slider-scale-bar {
  flex: 1;
  border-left: 1px solid transparent;
  position: relative;
}

.v3date-time-slider-default-scale-bar {
  height: 20px;
  border-color: #808080;
}

.v3date-time-slider-day-middle-scale-bar {
  height: 24px;
  border-color: #cbc9c9;
}

.v3date-time-slider-bar-start,
.v3date-time-slider-bar-end {
  height: 40px;
  border-color: white;
}
</style>
