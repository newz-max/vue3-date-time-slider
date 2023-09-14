import { DateTimeSliderProps } from "..";
// dyajs
import dayjs from "dayjs";
// utils
import { generateDateSubset } from "./generateData";

/** 生成控件数据 */
export const generateSliderData = (
  startDate: DateTimeSliderProps["startDate"],
  endDate: DateTimeSliderProps["endDate"]
) => {
  const startDayjs = dayjs(startDate);
  const endDayjs = dayjs(endDate);

  // const res = generateDate(startDayjs.toDate(), endDayjs.toDate());

  const res = generateDateSubset(startDayjs.toDate(), endDayjs.toDate());

  return res;
};
