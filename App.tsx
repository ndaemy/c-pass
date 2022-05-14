import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import RootStack from "src/screens/RootStack";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <Toast position="bottom" visibilityTime={3000} />
    </>
  );
}
