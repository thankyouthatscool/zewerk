import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

import { getCurrentDateInformation } from "@utils";

import {
  DEFAULT_COMMENT,
  DEFAULT_HOURLY_RATE,
  DEFAULT_WEEKLY_HOURS,
} from "@constants";
import {
  AppDefaults,
  AppState,
  DbMonthData,
  TouchedDateInformation,
} from "@types";

const {
  CURRENT_DATE,
  CURRENT_MONTH,
  CURRENT_MONTH_LONG,
  CURRENT_YEAR,
  CURRENT_MONTH_FIRST_DAY,
  CURRENT_MONTH_LAST_DAY,
  CURRENT_MONTH_NUMBER_OF_DAYS,
  CURRENT_WEEK_DAY,
  CURRENT_WEEK_DAY_LONG,
} = getCurrentDateInformation();

const initialState: AppState = {
  appDefaults: {
    DEFAULT_COMMENT,
    DEFAULT_HOURLY_RATE,
    DEFAULT_WEEKLY_HOURS,
  },
  currentDateInformation: {
    CURRENT_DATE,
    CURRENT_MONTH,
    CURRENT_MONTH_LONG,
    CURRENT_YEAR,
    CURRENT_MONTH_FIRST_DAY,
    CURRENT_MONTH_LAST_DAY,
    CURRENT_MONTH_NUMBER_OF_DAYS,
    CURRENT_WEEK_DAY,
    CURRENT_WEEK_DAY_LONG,
  },
  databaseInstance: SQLite.openDatabase("work-tracker.db"),
  dbMonthData: [],
  isLoading: false,
  selectedDateInformation: {
    SELECTED_DATE: CURRENT_DATE,
    SELECTED_MONTH: CURRENT_MONTH,
    SELECTED_YEAR: CURRENT_YEAR,
  },
  touchedDateInformation: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Is Loading
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },

    // App Defaults
    setAppDefaults: (state, { payload }: PayloadAction<AppDefaults>) => {
      state.appDefaults = payload;
    },

    // Touched Date Information
    setTouchedDateInformation: (
      state,
      { payload }: PayloadAction<TouchedDateInformation>
    ) => {
      state.touchedDateInformation = payload;
    },

    // Db Month Data
    setDbMonthData: (state, { payload }: PayloadAction<DbMonthData[]>) => {
      state.dbMonthData = payload;
    },
    addDbMonthData: (state, { payload }: PayloadAction<DbMonthData>) => {
      state.dbMonthData = [...state.dbMonthData, payload];
    },
    removeDbMonthData: (state, { payload }: PayloadAction<DbMonthData>) => {
      state.dbMonthData = state.dbMonthData.filter(
        (day) => day.dayId !== payload.dayId
      );
    },
  },
});

export const {
  // Is Loading
  setIsLoading,

  // App Defaults
  setAppDefaults,

  // Touched Date Information
  setTouchedDateInformation,

  // Db Month Data
  setDbMonthData,
  addDbMonthData,
  removeDbMonthData,
} = appSlice.actions;
