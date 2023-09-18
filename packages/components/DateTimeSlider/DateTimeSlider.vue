<template>
  <div
    :class="[`${classPrefix}-container`]"
    :style="{ '--max-width': maxWidth }"
    ref="container"
  >
    <div ref="containerBox" :class="[`${classPrefix}-container-body`]">
      <ScaleBarGroup
        v-for="(groupItem, groupIndex) in currentTypeData"
        :type="props.type"
        :scale-bar-length="groupItem.groupItems.length"
      >
        <ScaleBar
          v-for="barItem in groupItem.groupItems"
          :type="barItem.scaleBarType"
          :scaleLabel="barItem.scaleLabel"
        />

        <template #bottomText>
          <div v-show="textVisible(groupIndex)">
            {{ groupItem.groupLabel }}
          </div>
        </template>
      </ScaleBarGroup>
    </div>

    <div :class="`${classPrefix}-block-move-bar-container`">
      <SliderBlock />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ScaleBar, ScaleBarGroup, SliderBlock } from "@/components";
import { classPrefix } from "@/components/htmlClass";
// dayjs
import dayjs from "dayjs";
// utils
import { generateSliderData } from "@/utils";
import { computed, nextTick, onMounted, provide, ref } from "vue";
import { convertDataList } from "./utils";
// provide
import { containerBoxKey, containerKey, offsetsKey } from "./injectProvide";

interface DateTimeSliderProps {
  /**
   * 三种控件类型 日模式 月模式 时间模式
   */
  type?: "day" | "month" | "time";
  /**
   * 开始日期,如不传入开始日期则默认以当前日期为开始节点
   * 可以是 Date 对象，可以是字符串日期 : 2023-01-01 00:00:00,可以是数字类型的时间戳
   */
  startDate?: Date | string | number;
  /**
   * 结束日期
   * 可以是 Date 对象，可以是字符串日期 : 2023-01-01 00:00:00,可以是数字类型的时间戳
   */
  endDate?: Date | string | number;
  /**
   * 最大宽度
   * 按照正常的css值填入即可
   */
  maxWidth?: string;
}

const props = withDefaults(defineProps<DateTimeSliderProps>(), {
  type: "day",
  maxWidth: "80vw",
});

/** 传入的开始时间 */
const startDate = computed(() => {
  if (props.startDate) {
    return props.startDate;
  }

  return Date.now();
});

/** 传入的结束时间 */
const endDate = computed(() => {
  if (props.endDate) return props.endDate;

  const currentDate = dayjs(Date.now());
  let endDate = currentDate.add(3, "month").valueOf();
  const type = props.type;
  if (type === "day") {
    return endDate;
  } else if (type === "month") {
    endDate = currentDate.add(3, "year").valueOf();
  } else if (type === "time") {
    endDate = currentDate.add(15, "day").valueOf();
  }

  return endDate;
});

const dateList = computed(() => {
  const res = generateSliderData(startDate.value, endDate.value);
  return res;
});

const currentTypeData = computed(() => {
  const res = convertDataList(props.type, dateList.value);

  return res;
});
currentTypeData.value;

const textVisible = computed(() => {
  return (index: number) => {
    if (props.type === "time") {
      return index % 2 === 0;
    }
    return true;
  };
});

/** 最大容器标签 */
const container = ref<HTMLDivElement>();
/** 刻度组容器盒子 */
const containerBox = ref<HTMLDivElement>();

const scaleBarOffsets = ref<number[]>([]);
provide(offsetsKey, { scaleBarOffsets });
provide(containerKey, { container });
provide(containerBoxKey, { containerBox });

onMounted(() => {
  nextTick(() => {
    const scaleGroupBox = document.querySelectorAll(
      ".v3date-time-slider-scale-group-box"
    ) as NodeListOf<HTMLDivElement>;
    const offsets = Array.from(scaleGroupBox).reduce((prev: number[], item) => {
      const scaleBars = item.children as unknown as NodeListOf<HTMLDivElement>;
      const groupLeft = item.parentElement?.offsetLeft;

      Array.from(scaleBars).forEach((scaleItem) => {
        const offset = scaleItem.offsetLeft + groupLeft;
        prev.push(offset);
      });
      return prev;
    }, []);

    scaleBarOffsets.value = offsets;
  });
});
</script>

<style lang="scss" scoped>
.v3date-time-slider-container {
  div {
    user-select: none;
  }
  display: flex;
  --max-width: 80vw;
  max-width: var(--max-width);
  background-color: white;
  height: 40px;
  position: relative;
}
.v3date-time-slider-container-body {
  width: auto;
  overflow-x: auto;
  display: flex;
  overflow-y: hidden;
  position: relative;
  // border-right: 1px solid white;
  &::-webkit-scrollbar {
    display: none;
    // height: 0;
  }
}

.v3date-time-slider-block-move-bar-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  box-sizing: border-box;
  z-index: 20;
}
</style>
