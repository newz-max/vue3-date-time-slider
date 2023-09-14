export interface DaySubset {
  day: string;
  weekDay: number;
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
