import dayjs from "dayjs";
import { DaySubset, MonthSubset, WeekSubset, YearSubset } from "./types";

/**
 * 生成指定时间范围内的数据
 * @param {Date} startDate - 开始日期
 * @param {Date} endDate - 结束日期
 * @returns {YearObj[]} 生成的数据数组
 */
export function generateDateSubset(
  startDate: Date,
  endDate: Date
): YearSubset[] {
  const dateSubset: YearSubset[] = [];

  // 获取起始日期和结束日期的年份和月份
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  // 循环遍历每一年
  for (let year = startYear; year <= endYear; year++) {
    const yearSubset: YearSubset = {
      year: year,
      months: [],
    };

    // 确定每一年的起始月份和结束月份
    let monthStart = 0;
    let monthEnd = 11;
    if (year === startYear) {
      monthStart = startMonth;
    }
    if (year === endYear) {
      monthEnd = endMonth;
    }

    // 循环遍历每个月
    for (let month = monthStart; month <= monthEnd; month++) {
      const tempMonth = month + 1;
      const monthSubset: MonthSubset = {
        month: `${tempMonth < 10 ? "0" + tempMonth : tempMonth}`,
        weeks: [],
      };

      // 获取每个月的第一天和最后一天
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      // 循环遍历每一周
      let weekStart = 1;
      let weekEnd = Math.floor((lastDay.getDate() + firstDay.getDay()) / 7);
      for (let week = weekStart; week <= weekEnd; week++) {
        const weekSubset: WeekSubset = {
          week: week,
          days: [],
        };

        // 确定每一周的起始日期和结束日期
        let dayStart =
          week === 1
            ? firstDay.getDate()
            : (week - 1) * 7 - firstDay.getDay() + 2;
        let dayEnd =
          week === weekEnd
            ? lastDay.getDate()
            : week * 7 - firstDay.getDay() + 1;

        // 循环遍历每一天
        for (let day = dayStart; day <= dayEnd; day++) {
          const tempDay = `${day < 10 ? "0" + day : day}`;
          const currentDate = `${year}-${month + 1}-${tempDay}`;
          const weekDay = dayjs(currentDate).get("day");

          const daySubset: DaySubset = {
            day: tempDay,
            weekDay,
            times: [
              {
                time: "02:00:00",
              },
              {
                time: "08:00:00",
              },
              {
                time: "14:00:00",
              },
              {
                time: "20:00:00",
              },
            ],
          };
          weekSubset.days.push(daySubset);
        }

        monthSubset.weeks.push(weekSubset);
      }

      yearSubset.months.push(monthSubset);
    }

    dateSubset.push(yearSubset);
  }

  return dateSubset;
}
