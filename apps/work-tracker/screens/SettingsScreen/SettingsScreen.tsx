import AsyncStorage from "@react-native-async-storage/async-storage";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@hooks";
import { DEFAULT_APP_PADDING } from "@theme";
import { AppDefaults, SettingsScreenNavProps } from "@types";

export const SettingsScreen: FC<SettingsScreenNavProps> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        Home
      </Button>
      <AppDefaultsSettingsSection />
    </SafeAreaView>
  );
};

const AppDefaultsSettingsSection = () => {
  const { appDefaults } = useAppSelector(({ app }) => app);

  const [formData, setFormData] = useState<AppDefaults>({
    DEFAULT_COMMENT: appDefaults.DEFAULT_COMMENT,
    DEFAULT_HOURLY_RATE: appDefaults.DEFAULT_HOURLY_RATE,
    DEFAULT_DAILY_HOURS: appDefaults.DEFAULT_DAILY_HOURS,
    DEFAULT_WEEKLY_HOURS: appDefaults.DEFAULT_WEEKLY_HOURS,
  });
  const [isUpdateNeeded, setIsUpdateNeeded] = useState<boolean>(false);

  useEffect(() => {
    setFormData(() => ({ ...appDefaults }));
  }, [appDefaults]);

  const handleSave = useCallback(async (formData: AppDefaults) => {
    await AsyncStorage.setItem("appDefaults", JSON.stringify(formData));

    setIsUpdateNeeded(() => false);
  }, []);

  return (
    <View style={{ padding: DEFAULT_APP_PADDING }}>
      <Text variant="titleLarge">App Defaults</Text>
      <TextInput
        contextMenuHidden
        keyboardType="numeric"
        label="Hourly Rate"
        left={<TextInput.Affix text="$" />}
        mode="outlined"
        onChangeText={(newDefaultHourlyRate) => {
          setIsUpdateNeeded(() => true);

          setFormData((formData) => ({
            ...formData,
            DEFAULT_HOURLY_RATE: newDefaultHourlyRate,
          }));
        }}
        value={formData.DEFAULT_HOURLY_RATE.toString()}
      />
      <View style={{ flexDirection: "row" }}>
        <TextInput
          contextMenuHidden
          keyboardType="numeric"
          label="Daily Hours"
          mode="outlined"
          onChangeText={(newDefaultDailyHours) => {
            setIsUpdateNeeded(() => true);

            setFormData((formData) => ({
              ...formData,
              DEFAULT_DAILY_HOURS: newDefaultDailyHours,
            }));
          }}
          style={{ flex: 1, marginRight: DEFAULT_APP_PADDING / 2 }}
          value={formData.DEFAULT_DAILY_HOURS}
        />
        <TextInput
          contextMenuHidden
          keyboardType="numeric"
          label="Weekly Hours"
          mode="outlined"
          onChangeText={(newDefaultWeeklyHours) => {
            setIsUpdateNeeded(() => true);

            setFormData((formData) => ({
              ...formData,
              DEFAULT_WEEKLY_HOURS: newDefaultWeeklyHours,
            }));
          }}
          right={<TextInput.Affix text="hour(s)" />}
          style={{ flex: 1, marginLeft: DEFAULT_APP_PADDING / 2 }}
          value={formData.DEFAULT_WEEKLY_HOURS}
        />
      </View>
      <TextInput
        label="Comment"
        mode="outlined"
        multiline
        numberOfLines={4}
        onChangeText={(newDefaultComment) => {
          setIsUpdateNeeded(() => true);

          setFormData((formData) => ({
            ...formData,
            DEFAULT_COMMENT: newDefaultComment,
          }));
        }}
        value={formData.DEFAULT_COMMENT}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: DEFAULT_APP_PADDING,
        }}
      >
        <Button
          disabled={!isUpdateNeeded}
          mode="contained"
          onPress={() => {
            handleSave(formData);
          }}
        >
          Save
        </Button>
      </View>
    </View>
  );
};
