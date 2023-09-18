<template>
  <!-- 滑动条上的滑块 -->
  <div
    ref="blockRef"
    @mousedown="handleMouseDown"
    :class="[`${classPrefix}-block-container`]"
  >
    <div :class="[`${classPrefix}-block`]"></div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watchEffect,
} from "vue";
import { classPrefix } from "../htmlClass";
import { containerBoxKey, containerKey, offsetsKey } from "..";
import { baseLeftOffset } from "./utils";

const { scaleBarOffsets } = inject(offsetsKey, { scaleBarOffsets: ref([]) });
const { container } = inject(containerKey, {
  container: ref<HTMLDivElement>(),
});
const { containerBox } = inject(containerBoxKey, {
  containerBox: ref<HTMLDivElement>(),
});

/** 容器的宽度 */
const containerMaxWidth = computed(() => {
  const res = container.value?.clientWidth || 0;
  return res;
});

/** 是否在滑块上点击鼠标 */
const isMouseDown = ref(false);
/** 处理鼠标在滑块上按下 */
const handleMouseDown = (e: MouseEvent) => {
  isMouseDown.value = true;

  clickPosition.value =
    e.clientX - ((blockRef.value?.offsetLeft || baseLeftOffset) + 7 || 0);
};

/** 滑块 div */
const blockRef = ref<HTMLDivElement>();

/** 在滑块上按下时的 x 偏移量（已经过计算） */
const clickPosition = ref(0);
/** 处理鼠标移动中 */
const handleMouseMove = (e: MouseEvent) => {
  if (isMouseDown.value) {
    const { clientX } = e;
    const x = clientX - clickPosition.value;

    /** 得到滑块应在的刻度位置 */
    const scalePosition =
      scaleBarOffsets.value.find((item, index) => {
        const nextScaleOffset = scaleBarOffsets.value[index + 1];

        if (nextScaleOffset !== undefined) {
          return x >= item && x < nextScaleOffset;
        } else {
          return x >= item;
        }
      }) || 0;

    const flag = scalePosition > containerMaxWidth.value;
    if (flag) {
      containerBox.value?.scrollTo({
        left: containerBox.value?.scrollLeft + scaleBarOffsets.value[1],
      });
    } else {
      blockRef.value?.setAttribute(
        "style",
        `left : ${scalePosition + baseLeftOffset}px`
      );
    }
  }
};

/** 处理鼠标从滑块抬起 */
const handleMouseUp = () => {
  isMouseDown.value = false;
  console.log(22);
};

onMounted(() => {
  document.removeEventListener("mouseup", handleMouseUp);
  document.removeEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("mousemove", handleMouseMove);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});
</script>

<style lang="scss" scoped>
.v3date-time-slider-block-container {
  cursor: pointer;
  position: absolute;
  top: 6.5px;
  left: -7px;
  .v3date-time-slider-block {
    width: 14px;
    height: 21px;
    background: #ededed;
    &::before {
      content: "";
      width: 0;
      height: 0;
      border-top-width: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid white;
      position: absolute;
      top: -7px;
      left: 0;
    }
  }
}
</style>
