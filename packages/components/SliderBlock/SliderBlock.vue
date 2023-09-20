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
// utils
import { baseLeftOffset } from "./utils";
// hooks
import { useMouse } from "../../hooks/mouse";
// types
import { ScaleBarOffsetsItem } from "@/components";
// lodash
import { delay } from "lodash";

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

/** 容器滚动条距离左侧距离 */
const getBoxScrollLeft = () => {
  const dom = containerBox.value;
  const res = dom?.scrollLeft || 0;
  return res;
};

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
      // const nextX = n + scaleBarOffsets.value[1].offset;
      if (!autoScrollMoveing.value) {
        const offsetX = scaleBarOffsets.value[currentScaleIndex.value].offset;
        setBlockOffset(containerMaxWidth.value);

        autoScrollToScale(offsetX);
      }
    }
    // 向左超出
    else if (leftByyond.value) {
      if (!autoScrollMoveing.value) {
        const offsetX =
          scaleBarOffsets.value[currentScaleIndex.value].offset + 7;
        setBlockOffset(0);
        autoScrollToScale(offsetX, "left");
      }
    }
    // 范围内移动
    else {
      stopAutoScrollToScale();
      const scaleItem = getScale(calcMouseOffsetX(n));

      if (scaleItem.offset !== undefined) {
        setBlockOffset(scaleItem.offset);

        const realScaleItem = getScale(
          calcMouseOffsetX(n) + getBoxScrollLeft()
        );

        currentScaleIndex.value = realScaleItem.index;
      }
    }
  }
});

/** 设置 */
const setBlockOffset = (x: number) => {
  const dom = blockRef.value as HTMLDivElement;
  dom.setAttribute("style", `left : ${x + baseLeftOffset}px`);
};

/** 滚动条到指定的刻度上 */
const scrollToScale = (x: number) => {
  const scaleItem = getScale(x);
  scaleItem?.dom?.scrollIntoView();
  nextTick(() => {
    prevSelectScaleItem.value?.ref?.usePopperRes?.hide();
  });
  return scaleItem;
};

const baseScaleOffset = computed(() => {
  const res = scaleBarOffsets.value[1];
  return res;
});

/** 当前选中刻度的索引 */
const currentScaleIndex = ref(0);
/** 自动滚动刻度定时器时间 */
const autoScrollTimeout = ref(500);
/** 自动滚动定时器 */
let autoScrollTimer: null | number = null;
/** 自动滚动定时器执行中 */
const autoScrollMoveing = ref(false);
/** 通过定时器自动向下一个刻度滚动 */
const autoScrollToScale = (
  startX: number,
  type: "left" | "right" = "right"
) => {
  autoScrollMoveing.value = true;
  const getNextX = () => {
    let res = startX;
    if (type === "right") {
      res = startX += baseScaleOffset.value.offset;
    } else if (type === "left") {
      res = startX -= baseScaleOffset.value.offset;
      if (res < 0) res = 0;
    }

    return res;
  };

  const scrollToNextScale = () => {
    const nextX = getNextX();
    scrollToScale(nextX);

    const scaleItem = getScale(nextX);

    if (scaleItem.index !== -1) {
      currentScaleIndex.value = scaleItem.index;
    } else {
      throw new Error("没找到index");
    }
  };

  if (autoScrollTimer) clearInterval(autoScrollTimer);

  scrollToNextScale();
  autoScrollTimer = setInterval(scrollToNextScale, autoScrollTimeout.value);
};

/** 停止自动滚动到下个刻度 */
const stopAutoScrollToScale = () => {
  if (autoScrollTimer) clearInterval(autoScrollTimer);
  autoScrollMoveing.value = false;
};

/** 模糊查询相近的刻度 */
const getScale = (x: number) => {
  let i = -1;
  const scaleIem = scaleBarOffsets.value.find((item, index, self) => {
    if (index === self.length - 1) return true;
    const nextItem = self[index + 1];
    const flag = x >= item.offset && x <= nextItem.offset;
    if (flag) {
      i = index;
      return true;
    }
  });

  const res = {
    ...scaleIem,
    index: i,
  };
  return res;
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
  stopAutoScrollToScale();
};

/** 滑块选中的选项（上一个） */
const prevSelectScaleItem = ref<ScaleBarOffsetsItem>();

/** 上一个选中的选项关闭提示 */
const closePrevSelectTooltip = () => {
  // scaleBarOffsets.value.forEach((item) => {
  //   item.ref?.usePopperRes?.hideIsCall();
  // });
  prevSelectScaleItem.value?.ref?.usePopperRes?.hideIsCall();
};

/** 当前滑块选中的选项 */
const currentSelectScaleItem = computed(() => {
  const index = currentScaleIndex.value;

  const item = scaleBarOffsets.value[index];
  return item;
});

/** 当前选中的选项开启提示 */
const openCurrentSelectTooltip = () => {
  currentSelectScaleItem.value.ref?.usePopperRes?.show();
};

watch(currentScaleIndex, () => {
  openCurrentSelectTooltip();
  nextTick().then(() => {
    closePrevSelectTooltip();
  });
});

watch(currentSelectScaleItem, (_n, o) => {
  prevSelectScaleItem.value = o;
});

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
