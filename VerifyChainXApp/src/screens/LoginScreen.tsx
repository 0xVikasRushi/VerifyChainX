import React from "react";
import { Text, View } from "react-native";
import { AppStackScreenProps } from "../types";
import { AUTH_URL } from "../shared/constant";

type LoginScreenProps = AppStackScreenProps<"LoginScreen">;
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const a = AUTH_URL;
  console.log(a);
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default LoginScreen;
