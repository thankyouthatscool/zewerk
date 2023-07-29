import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_WEEKLY_HOURS } from "../constants";
import { AppDefaults, AppState } from "../types";

const initialState: AppState = {
  appDefaults: { DEFAULT_WEEKLY_HOURS },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppDefaults: (state, { payload }: PayloadAction<AppDefaults>) => {
      state.appDefaults = payload;
    },
  },
});

export const { setAppDefaults } = appSlice.actions;
