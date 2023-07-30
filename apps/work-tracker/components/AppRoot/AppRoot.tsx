import { createDrawerNavigator } from "@react-navigation/drawer";
import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@hooks";
import { HomeScreen } from "@screens/HomeScreen";
import { SettingsScreen } from "@screens/SettingsScreen";
import { setAppDefaults, setDbMonthData, setIsLoading } from "@store";
import { DbMonthData, DrawerNavigatorProps } from "@types";
import { createDefaultTableSQLString, loadSettings } from "@utils";

const Drawer = createDrawerNavigator<DrawerNavigatorProps>();

export const AppRoot = () => {
  const dispatch = useAppDispatch();

  const { databaseInstance: db } = useAppSelector(({ app }) => app);

  const handleInitialLoad = useCallback(() => {
    dispatch(setIsLoading(true));

    db.transaction(
      (tx) => {
        tx.executeSql(
          createDefaultTableSQLString,
          [],
          async (_, { rows: { _array } }) => {
            const monthData: DbMonthData[] = _array;

            dispatch(setDbMonthData(monthData));

            const { appDefaults } = await loadSettings();

            if (!!appDefaults) {
              dispatch(setAppDefaults(appDefaults));
            }
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
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen component={HomeScreen} name="Home" />
      <Drawer.Screen component={SettingsScreen} name="Settings" />
    </Drawer.Navigator>
  );
};
