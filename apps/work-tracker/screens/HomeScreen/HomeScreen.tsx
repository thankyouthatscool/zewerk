import { FC } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import { setTouchedDateInformation } from "@store";
import { HomeScreenNavProps } from "@types";

import { MainWrapper } from "./Styled";

export const HomeScreen: FC<HomeScreenNavProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const {
    appDefaults: { DEFAULT_COMMENT, DEFAULT_HOURLY_RATE, DEFAULT_WEEKLY_HOURS },
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
    isLoading,
    selectedDateInformation: { SELECTED_DATE, SELECTED_MONTH, SELECTED_YEAR },
    touchedDateInformation,
  } = useAppSelector(({ app }) => app);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <MainWrapper>
          <View>
            <View>
              <Text variant="titleLarge">Is Currently Loading</Text>
              <Text>{!!isLoading ? "Loading..." : "Not Loading"}</Text>
            </View>
            <View>
              <Text variant="titleLarge">App Defaults</Text>
              <Text>${DEFAULT_HOURLY_RATE}</Text>
              <Text>{DEFAULT_WEEKLY_HOURS} hour(s)</Text>
              <Text>
                {!!DEFAULT_COMMENT ? (
                  <Text style={{ fontWeight: "700" }}>{DEFAULT_COMMENT}</Text>
                ) : (
                  "The default comment has no text."
                )}
              </Text>
            </View>
            <View>
              <Text variant="titleLarge">Current Date Information</Text>
              <Text>Current Date: {CURRENT_DATE}</Text>
              <Text>Current Month: {CURRENT_MONTH}</Text>
              <Text>Current Year: {CURRENT_YEAR}</Text>
              <Text>Current Month Long: {CURRENT_MONTH_LONG}</Text>
              <Text>Current Week Day: {CURRENT_WEEK_DAY}</Text>
              <Text>Current Week Day Long: {CURRENT_WEEK_DAY_LONG}</Text>
              <Text>
                Current Month Number of Days: {CURRENT_MONTH_NUMBER_OF_DAYS}
              </Text>
              <Text>Current Month First Day: {CURRENT_MONTH_FIRST_DAY}</Text>
              <Text>Current Month Last Day: {CURRENT_MONTH_LAST_DAY} </Text>
            </View>
            <View>
              <Text variant="titleLarge">Selected Date Information</Text>
              <Text>Selected Date: {SELECTED_DATE}</Text>
              <Text>Selected Month: {SELECTED_MONTH}</Text>
              <Text>Selected Year: {SELECTED_YEAR}</Text>
            </View>
            <View>
              <Text variant="titleLarge">Touched Date Information</Text>
              {!!touchedDateInformation ? (
                <View>
                  <Text>
                    Touched Date: {touchedDateInformation.TOUCHED_DATE}
                  </Text>
                  <Text>
                    Touched Month: {touchedDateInformation.TOUCHED_MONTH}
                  </Text>
                  <Text>
                    Touched Year: {touchedDateInformation.TOUCHED_YEAR}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text>No touched date.</Text>
                  <Button
                    mode="contained"
                    onPress={() => {
                      dispatch(
                        setTouchedDateInformation({
                          TOUCHED_DATE: SELECTED_DATE,
                          TOUCHED_MONTH: SELECTED_MONTH,
                          TOUCHED_YEAR: SELECTED_YEAR,
                        })
                      );
                    }}
                  >
                    Set Touched Date
                  </Button>
                </View>
              )}
            </View>
            <View>
              <Text variant="titleLarge">DB Month Data</Text>
              <Text>Number of entries: {dbMonthData.length}</Text>
            </View>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            Settings
          </Button>
        </MainWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};
