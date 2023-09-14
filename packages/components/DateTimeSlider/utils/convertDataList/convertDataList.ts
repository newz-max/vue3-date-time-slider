import { DateTimeSliderPropsType, ScaleBarPropsType } from "@/components";
// types
import { YearSubset } from "@/utils";
import { ConvertDataListItemReturnType } from "./types";
// lodash
import { cloneDeep } from "lodash";

/** 将日期数据转换为符合控件组件设置类型对应的数据格式 */
export const convertDataList = (
  type: DateTimeSliderPropsType,
  dateList: YearSubset[]
) => {
  const res = fnObs[type](dateList);
  return res;
};

const fnObs = {
  /** 日模式数据 */
  day(dateList: YearSubset[]) {
    const tempData = cloneDeep(dateList);
    const res = tempData.reduce(
      (prev: ConvertDataListItemReturnType[], yearItem) => {
        const { year } = yearItem;
        // 月遍历
        yearItem.months.forEach((monthItem) => {
          const { month } = monthItem;
          const group: ConvertDataListItemReturnType = {
            groupLabel: `${year}-${month}`,
            groupItems: [],
          };
          // 周遍历
          monthItem.weeks.forEach((weekItem) => {
            // 日遍历
            weekItem.days.forEach((dayItem) => {
              const { day, weekDay } = dayItem;
              let scaleBarType: ScaleBarPropsType = "default";

              // 每个周一
              if (weekDay === 1) scaleBarType = "dayMiddle";

              // 每个月一号
              if (day === "01") scaleBarType = "start";

              group.groupItems.push({
                scaleLabel: `${year}-${month}-${day}`,
                scaleBarType,
              });
            });
          });

          prev.push(group);
        });
        return prev;
      },
      []
    );

    const resLastIndex = res.length - 1;
    if (resLastIndex < 0) return res;
    const groupLastIndex = res[resLastIndex].groupItems.length - 1;
    if (groupLastIndex < 0) return res;
    res[resLastIndex].groupItems[groupLastIndex].scaleBarType = "end";
    return res;
  },

  /** 月模式数据 */
  month(dateList: YearSubset[]): ConvertDataListItemReturnType[] {
    const tempData = cloneDeep(dateList);
    const res = tempData.reduce(
      (prev: ConvertDataListItemReturnType[], yearItem) => {
        const { year } = yearItem;
        const group: ConvertDataListItemReturnType = {
          groupLabel: year.toString(),
          groupItems: [],
        };
        yearItem.months.forEach((monthItem) => {
          const { month } = monthItem;

          let scaleBarType: ScaleBarPropsType = "default";
          if (month === "01") scaleBarType = "start";

          group.groupItems.push({
            scaleLabel: `${year}-${month}-01`,
            scaleBarType,
          });
        });

        prev.push(group);
        return prev;
      },
      []
    );
    return res;
  },
  time(dateList: YearSubset[]): ConvertDataListItemReturnType[] {
    const tempData = cloneDeep(dateList);
    return tempData;
  },
};
