import { FC } from "react";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { DEFAULT_APP_PADDING } from "@theme";
import { SettingsScreenNavProps } from "@types";

export const SettingsScreen: FC<SettingsScreenNavProps> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView>
      <Text>SettingsScreen</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        Home
      </Button>
    </SafeAreaView>
  );
};
