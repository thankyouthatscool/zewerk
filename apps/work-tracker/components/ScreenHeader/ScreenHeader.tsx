import { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { Text } from "react-native-paper";

import { ScreenHeaderWrapper } from "./Styled";
import { DEFAULT_APP_PADDING } from "@theme";

export const ScreenHeader: FC<{ title?: string }> = ({ title }) => {
  const { goBack } = useNavigation();

  return (
    <ScreenHeaderWrapper>
      <IconButton
        icon="arrow-left"
        onPress={() => {
          goBack();
        }}
        mode="contained"
      />
      <Text style={{ marginLeft: DEFAULT_APP_PADDING }} variant="headlineLarge">
        {title || "Back"}
      </Text>
    </ScreenHeaderWrapper>
  );
};
