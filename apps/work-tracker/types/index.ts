import type * as SQLite from "expo-sqlite";

export * from "./nav";

export type AppDefaults = {
  DEFAULT_HOURLY_RATE: string;
  DEFAULT_DAILY_HOURS: string;
  DEFAULT_WEEKLY_HOURS: string;
  DEFAULT_COMMENT: string;
};

export type CurrentDateInformation = {
  CURRENT_DATE: number;
  CURRENT_MONTH: number;
  CURRENT_MONTH_LONG: string;
  CURRENT_YEAR: number;
  CURRENT_WEEK_DAY: number;
  CURRENT_WEEK_DAY_LONG: string;
  CURRENT_MONTH_NUMBER_OF_DAYS: number;
  CURRENT_MONTH_FIRST_DAY: number;
  CURRENT_MONTH_LAST_DAY: number;
};

export type DbMonthData = {
  dayId: string;
  monthId: string;
  startTime?: string;
  endTime?: string;
  hoursWorked: number[];
  hourlyRate: number[];
  comment: string;
};

export type SelectedDateInformation = {
  SELECTED_DATE: number;
  SELECTED_MONTH: number;
  SELECTED_YEAR: number;
};

export type TouchedDateInformation = {
  TOUCHED_DATE: number;
  TOUCHED_MONTH: number;
  TOUCHED_YEAR: number;
} | null;

export type AppState = {
  appDefaults: AppDefaults;
  currentDateInformation: CurrentDateInformation;
  databaseInstance: SQLite.SQLiteDatabase;
  dbMonthData: DbMonthData[];
  isLoading: boolean;
  selectedDateInformation: SelectedDateInformation;
  touchedDateInformation: TouchedDateInformation;
};
