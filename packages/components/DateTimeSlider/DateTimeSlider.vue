<template>
  <div :class="[`${classPrefix}-container`]">
    <ScaleBarGroup
      v-for="groupItem in currentTypeData"
      :type="props.type"
      :scale-bar-length="groupItem.groupItems.length"
    >
      <ScaleBar
        v-for="barItem in groupItem.groupItems"
        :type="barItem.scaleBarType"
      />

      <template #bottomText>
        <div>
          {{ groupItem.groupLabel }}
        </div>
      </template>
    </ScaleBarGroup>
  </div>
</template>

<script lang="ts" setup>
import { ScaleBar, ScaleBarGroup } from "@/components";
import { classPrefix } from "@/components/htmlClass";
// dayjs
import dayjs from "dayjs";
// utils
import { generateSliderData } from "@/utils";
import { computed } from "vue";
import { convertDataList } from "./utils";

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
}

const props = withDefaults(defineProps<DateTimeSliderProps>(), {
  type: "day",
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
console.log(dateList.value, "dateList");

const currentTypeData = computed(() => {
  const res = convertDataList(props.type, dateList.value);
  console.log(res, "res");

  return res;
});
currentTypeData.value;
</script>

<style lang="scss" scoped>
.v3date-time-slider-container {
  display: flex;
  width: auto;
  background-color: white;
}
</style>
