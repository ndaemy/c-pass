import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "src/screens/MainStack";
import { RootStackParamList } from "src/screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
