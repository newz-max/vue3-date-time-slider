export type DateTimeSliderPropsType = "day" | "month" | "time";

export interface DateTimeSliderProps {
  /** 三种控件类型 日模式 月模式 时间模式 */
  type?: DateTimeSliderPropsType;
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
