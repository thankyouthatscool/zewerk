import type { DrawerScreenProps } from "@react-navigation/drawer";

export type DrawerNavigatorProps = { Home: undefined; Settings: undefined };

export type HomeScreenNavProps = DrawerScreenProps<
  DrawerNavigatorProps,
  "Home"
>;

export type SettingsScreenNavProps = DrawerScreenProps<
  DrawerNavigatorProps,
  "Settings"
>;
