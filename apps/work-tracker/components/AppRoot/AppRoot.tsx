import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "../../hooks";

export const AppRoot = () => {
  const { appDefaults } = useAppSelector(({ app }) => app);

  console.log(appDefaults);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>WORK TRACKER</Text>
      </View>
    </SafeAreaView>
  );
};
