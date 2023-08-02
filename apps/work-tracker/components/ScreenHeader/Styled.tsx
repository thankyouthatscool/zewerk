import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

export const ScreenHeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {children}
    </View>
  );
};
