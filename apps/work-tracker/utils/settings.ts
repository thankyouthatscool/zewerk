import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppDefaults } from "@types";

export const loadSettings = async () => {
  // await AsyncStorage.setItem(
  //   "appDefaults",
  //   JSON.stringify({
  //     DEFAULT_COMMENT: "Today was a good day!!!",
  //     DEFAULT_HOURLY_RATE: "32.17",
  //     DEFAULT_DAILY_HOURS: "8",
  //     DEFAULT_WEEKLY_HOURS: "38",
  //   })
  // );

  //   await AsyncStorage.removeItem("appDefaults");

  const appDefaults = await loadAppDefaults();

  let settings: { appDefaults?: AppDefaults } = {};

  if (!!appDefaults) {
    settings = { ...settings, appDefaults };
  }

  return settings;
};

export const loadAppDefaults = async () => {
  const appDefaultsString = await AsyncStorage.getItem("appDefaults");

  if (!!appDefaultsString) {
    const appDefaults = JSON.parse(appDefaultsString) as AppDefaults;

    return appDefaults;
  }
};
