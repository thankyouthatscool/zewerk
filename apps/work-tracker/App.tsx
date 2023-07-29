import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider as ReduxProvider } from "react-redux";

import { AppRoot } from "./components/AppRoot";
import { store } from "./store";

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AppRoot />
      </View>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
