import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import React from "react";
import {
  DashBoard,
  LoginScreen,
  ProfileScreen,
  QVotingResult,
  QVotingScreen,
  ResultScreen,
} from "./src/screens";
import QVoteScreen from "./src/screens/QVoteScreen";
import { headerOptions } from "./src/shared/constant";
import { AppParamList } from "./src/types";
import { LoginStatusProvider } from "./src/context/LoginStatusContext";

const Stack = createStackNavigator<AppParamList>();

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <LoginStatusProvider>
          <Stack.Navigator initialRouteName="DashBoard">
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={headerOptions} />
            <Stack.Screen name="DashBoard" component={DashBoard} options={headerOptions} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={headerOptions} />
            {/* <Stack.Screen name="QVotingScreen" component={QVotingScreen} options={headerOptions} /> */}
            <Stack.Screen name="QVoteScreen" component={QVoteScreen} options={headerOptions} />
            <Stack.Screen name="QVotingResult" component={QVotingResult} options={headerOptions} />
            <Stack.Screen name="ResultScreen" component={ResultScreen} options={headerOptions} />
          </Stack.Navigator>
        </LoginStatusProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
