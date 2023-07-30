import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { DEFAULT_APP_PADDING } from "@theme";

export const MainWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={{ padding: DEFAULT_APP_PADDING, paddingBottom: 0 }}>
      {children}
    </View>
  );
};
