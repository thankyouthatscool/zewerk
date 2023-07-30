import { useCallback, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@hooks";
import {
  setDbMonthData,
  setIsLoading,
  setTouchedDateInformation,
} from "@store";
import { DEFAULT_APP_PADDING } from "@theme";
import { DbMonthData } from "@types";
import { createDefaultTableSQLString } from "@utils";

export const AppRoot = () => {
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
    databaseInstance: db,
    dbMonthData,
    isLoading,
    selectedDateInformation: { SELECTED_DATE, SELECTED_MONTH, SELECTED_YEAR },
    touchedDateInformation,
  } = useAppSelector(({ app }) => app);

  const handleInitialLoad = useCallback(async () => {
    dispatch(setIsLoading(true));

    db.transaction(
      (tx) => {
        tx.executeSql(
          createDefaultTableSQLString,
          [],
          (_, { rows: { _array } }) => {
            const monthData: DbMonthData[] = _array;

            dispatch(setDbMonthData(monthData));
          }
        );
      },
      (err) => console.log(err),
      () => {
        dispatch(setIsLoading(false));
      }
    );
  }, []);

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: DEFAULT_APP_PADDING }}>
      <ScrollView>
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
              {!!DEFAULT_COMMENT
                ? "There is some text in the default comment."
                : "The default comment has no text."}
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
                <Text>Touched Date: {touchedDateInformation.TOUCHED_DATE}</Text>
                <Text>
                  Touched Month: {touchedDateInformation.TOUCHED_MONTH}
                </Text>
                <Text>Touched Year: {touchedDateInformation.TOUCHED_YEAR}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};
