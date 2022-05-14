import { NavigationContainer } from "@react-navigation/native";
import Toast, { ErrorToast, SuccessToast, ToastConfig } from "react-native-toast-message";
import RootStack from "src/screens/RootStack";

const toastConfig: ToastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 24,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 24,
      }}
    />
  ),
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" visibilityTime={3000} />
    </>
  );
}
