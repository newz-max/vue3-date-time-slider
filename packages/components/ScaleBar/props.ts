import { ConvertDataListItemReturnTypeGroupItem } from "@/components";
export type ScaleBarPropsType = "default" | "dayMiddle" | "start" | "end";

export interface ScaleBarProps {
  type: ScaleBarPropsType;
  scaleLabel?: ConvertDataListItemReturnTypeGroupItem["scaleLabel"];
}

export const scaleBarPropstypes = {
  default: "v3date-time-slider-default-scale-bar",
  dayMiddle: "v3date-time-slider-day-middle-scale-bar",
  start: "v3date-time-slider-bar-start",
  end: "v3date-time-slider-bar-end",
};
