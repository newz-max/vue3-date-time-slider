export interface TimeSubset {
  time: string;
}

export interface DaySubset {
  day: string;
  weekDay: number;
  times: TimeSubset[];
}

export interface WeekSubset {
  week: number;
  days: DaySubset[];
}

export interface MonthSubset {
  month: string;
  weeks: WeekSubset[];
}

export interface YearSubset {
  year: number;
  months: MonthSubset[];
}
