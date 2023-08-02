import { useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { TRANSLATION_X_THRESHOLD, VELOCITY_X_THRESHOLD } from "@constants";
import { useAppDispatch, useAppSelector } from "@hooks";
import { setTouchedDateInformation } from "@store";
import { colors, DEFAULT_APP_PADDING } from "@theme";
import { getMonthInformation } from "@utils";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

export const MonthCarousel = () => {
  const dispatch = useAppDispatch();

  const {
    appDefaults: {
      DEFAULT_COMMENT,
      DEFAULT_DAILY_HOURS,
      DEFAULT_HOURLY_RATE,
      DEFAULT_WEEKLY_HOURS,
    },
    currentDateInformation: {
      CURRENT_DATE,
      CURRENT_MONTH,
      CURRENT_MONTH_FIRST_DAY,
      CURRENT_MONTH_LAST_DAY,
      CURRENT_MONTH_LONG,
      CURRENT_MONTH_NUMBER_OF_DAYS,
      CURRENT_WEEK_DAY,
      CURRENT_WEEK_DAY_LONG,
      CURRENT_YEAR,
    },
    dbMonthData,
    selectedDateInformation: { SELECTED_DATE, SELECTED_MONTH, SELECTED_YEAR },
    touchedDateInformation,
  } = useAppSelector(({ app }) => app);

  const [selectedMonthInformation, setSelectedMonthInformation] = useState<
    ReturnType<typeof getMonthInformation>
  >(() => getMonthInformation(SELECTED_YEAR, SELECTED_MONTH));

  const panGesture = Gesture.Pan().onEnd((e) => {
    if (
      Math.abs(e.translationX) > TRANSLATION_X_THRESHOLD &&
      Math.abs(e.velocityX) > VELOCITY_X_THRESHOLD
    ) {
      console.log("I like to move it move it");
    }
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{ marginHorizontal: DEFAULT_APP_PADDING }}>
        <View style={{ flexDirection: "row" }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((letter, idx) => (
            <View
              key={idx}
              style={{
                alignItems: "center",
                borderRadius: 50,
                height: (WINDOW_WIDTH - DEFAULT_APP_PADDING * 2) / 7,
                justifyContent: "center",
                width: (WINDOW_WIDTH - DEFAULT_APP_PADDING * 2) / 7,
              }}
            >
              <View
                style={{
                  backgroundColor: idx >= 5 ? colors.walledGreen : "white",
                  borderColor: colors.walledGreen,
                  borderWidth: 2,
                  padding: DEFAULT_APP_PADDING / 2,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: idx >= 5 ? "white" : colors.walledGreen,
                    fontWeight: "bold",
                  }}
                >
                  {letter}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: WINDOW_WIDTH - DEFAULT_APP_PADDING * 2,
          }}
        >
          {Array.from({
            length:
              selectedMonthInformation.numberOfDays +
              selectedMonthInformation.firstDayIndex +
              6 -
              selectedMonthInformation.lastDayIndex,
          })
            .map((_, idx) => idx)
            .map((idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  if (
                    idx - selectedMonthInformation.firstDayIndex >= 0 &&
                    idx - selectedMonthInformation.firstDayIndex <
                      selectedMonthInformation.numberOfDays
                  ) {
                    const NEW_SELECTED_DATE =
                      idx + 1 - selectedMonthInformation.firstDayIndex;

                    dispatch(
                      setTouchedDateInformation({
                        TOUCHED_DATE: NEW_SELECTED_DATE,
                        TOUCHED_MONTH:
                          touchedDateInformation?.TOUCHED_MONTH ||
                          SELECTED_MONTH,
                        TOUCHED_YEAR:
                          touchedDateInformation?.TOUCHED_YEAR || SELECTED_YEAR,
                      })
                    );
                  }
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: !!dbMonthData.find(
                      (record) =>
                        record.dayId ===
                        `${
                          idx + 1 - selectedMonthInformation.firstDayIndex
                        }/${SELECTED_MONTH}/${SELECTED_YEAR}`
                    )
                      ? dbMonthData
                          .find(
                            (record) =>
                              record.dayId ===
                              `${
                                idx + 1 - selectedMonthInformation.firstDayIndex
                              }/${SELECTED_MONTH}/${SELECTED_YEAR}`
                          )
                          ?.hoursWorked.reduce((acc, val) => acc + val, 0) !==
                        parseInt(DEFAULT_DAILY_HOURS)
                        ? colors.artisanGold
                        : colors.walledGreen
                      : "white",
                    borderRadius: 50,
                    borderColor:
                      `${
                        idx + 1 - selectedMonthInformation.firstDayIndex
                      }/${SELECTED_MONTH}/${SELECTED_YEAR}` ===
                      `${CURRENT_DATE}/${CURRENT_MONTH}/${CURRENT_YEAR}`
                        ? colors.forbiddenBlackberry
                        : "white",
                    borderWidth:
                      `${
                        idx + 1 - selectedMonthInformation.firstDayIndex
                      }/${SELECTED_MONTH}/${SELECTED_YEAR}` ===
                      `${CURRENT_DATE}/${CURRENT_MONTH}/${CURRENT_YEAR}`
                        ? 2
                        : 1,
                    height: (WINDOW_WIDTH - DEFAULT_APP_PADDING * 2) / 7,
                    justifyContent: "center",
                    width: (WINDOW_WIDTH - DEFAULT_APP_PADDING * 2) / 7,
                  }}
                >
                  {idx < selectedMonthInformation.firstDayIndex ||
                  idx - selectedMonthInformation.firstDayIndex >=
                    selectedMonthInformation.numberOfDays ? (
                    <View />
                  ) : (
                    <Text
                      style={{
                        color: !!dbMonthData.find(
                          (record) =>
                            record.dayId ===
                            `${
                              idx + 1 - selectedMonthInformation.firstDayIndex
                            }/${SELECTED_MONTH}/${SELECTED_YEAR}`
                        )
                          ? "white"
                          : "black",
                        fontWeight: "bold",
                      }}
                    >
                      {idx + 1 - selectedMonthInformation.firstDayIndex}
                    </Text>
                  )}
                </View>
              </Pressable>
            ))}
        </View>
      </View>
    </GestureDetector>
  );
};
