import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginStatusProvider } from "./src/contexts/LoginStatusContext";
import {
  DashBoard,
  LoginScreen,
  ProfileScreen,
  QVotingResult,
  QVotingScreen,
  TelegramScreen,
} from "./src/screens";
import { AppParamList } from "./src/types";
import { NativeBaseProvider } from "native-base";
import { headerOptions } from "./src/shared/constant";

const Stack = createStackNavigator<AppParamList>();

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <LoginStatusProvider>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={headerOptions} />
            <Stack.Screen name="DashBoard" component={DashBoard} options={headerOptions} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={headerOptions} />
            <Stack.Screen
              name="TelegramScreen"
              component={TelegramScreen}
              options={headerOptions}
            />
            <Stack.Screen name="QVotingScreen" component={QVotingScreen} options={headerOptions} />
            <Stack.Screen name="QVotingResult" component={QVotingResult} options={headerOptions} />
          </Stack.Navigator>
        </LoginStatusProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
