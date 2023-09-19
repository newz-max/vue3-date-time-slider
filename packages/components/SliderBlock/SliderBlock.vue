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
  nextTick,
  watchEffect,
  watch,
} from "vue";
import { classPrefix } from "../htmlClass";
import { containerBoxKey, containerKey, offsetsKey } from "..";
import { baseLeftOffset } from "./utils";
import { useMouse } from "../../hooks/mouse";

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
    e.clientX - ((blockRef.value?.offsetLeft || baseLeftOffset) + 7);
};

/** 滑块 div */
const blockRef = ref<HTMLDivElement>();

/** 在滑块上按下时的 x 偏移量（已经过计算） */
const clickPosition = ref(0);
/** 鼠标拖动后抬起时的 x 偏移量（已经过计算） */
const mouseUpPosition = ref(0);

const rectForContainer = ref<DOMRect>();
onMounted(async () => {
  await nextTick();
  rectForContainer.value = container.value?.getBoundingClientRect();
});

/** 鼠标是否向右超出容器 */
const rightBeyond = computed(() => {
  const res = x.value + baseLeftOffset > (rectForContainer.value?.right || 0);
  return res && isMouseDown.value;
});

/** 鼠标是否向左超出容器 */
const leftByyond = computed(() => {
  const res = x.value <= (rectForContainer.value?.left || 0) + 7;

  return res && isMouseDown.value;
});

const { x } = useMouse();

/** 监听鼠标移动 */
watch(x, (n) => {
  const flag = isMouseDown.value;

  if (flag) {
    // 向右超出
    if (rightBeyond.value) {
      const nextX = n + scaleBarOffsets.value[1].offset;
      scrollToScale(nextX);
    }
    // 向左超出
    else if (leftByyond.value) {
    }
    // 范围内移动
    else {
      const blockDom = blockRef.value as HTMLDivElement;

      const scaleItem = getScale(calcMouseOffsetX(n));

      if (scaleItem) {
        blockDom.setAttribute(
          "style",
          `left:${scaleItem.offset + baseLeftOffset}px`
        );
      }
    }
  }
});

/** 滚动条到指定的刻度上 */
const scrollToScale = (x: number) => {
  const scaleItem = getScale(calcMouseOffsetX(x));
  scaleItem?.dom.scrollIntoView();
};

/** 模糊查询相近的刻度 */
const getScale = (x: number) => {
  const scaleIem = scaleBarOffsets.value.find((item, index, self) => {
    if (index === self.length - 1) return true;
    const nextItem = self[index + 1];
    const flag = x >= item.offset && x <= nextItem.offset;
    if (flag) {
      return true;
    }
  });

  return scaleIem;
};

/** 代入鼠标 x 位置得出减去了控件距离视窗左侧距离的结果 */
const calcMouseOffsetX = (mouseX: number) => {
  const res = mouseX - (rectForContainer.value?.left || 0);
  return res;
};

/** 处理鼠标从滑块抬起 */
const handleMouseUp = (e: MouseEvent) => {
  isMouseDown.value = false;
  const rect = (container.value as HTMLDivElement).getBoundingClientRect();

  mouseUpPosition.value = e.clientX - rect.left;
};

onMounted(() => {
  window.removeEventListener("mouseup", handleMouseUp);
  window.addEventListener("mouseup", handleMouseUp);
});

onBeforeUnmount(() => {
  window.removeEventListener("mouseup", handleMouseUp);
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
