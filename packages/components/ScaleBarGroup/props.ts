export type ScaleBarGroupPropsType = "month" | "day" | "time";
export interface ScaleBarGroupProps {
  /** 刻度组容器内放入的刻度长度 用于计算刻度组容器宽度 */
  scaleBarLength: number;
  /** 刻度组容器类型用于区分不同类型刻度的间距 */
  type: ScaleBarGroupPropsType;
  /** 是否在此分组中左侧增加一个刻度的间距 */
  leftSpace?: boolean;
}

export const scaleBarGroupPropsTypes = {
  month: "v3date-time-slider-group-month",
  day: "v3date-time-slider-group-day",
  time: "v3date-time-slider-group-time",
};

export const scaleBarGroupPropsTypesWidth = {
  month: 23,
  day: 10,
  time: 16,
};
