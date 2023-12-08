import React from "react";
import { Text, View } from "react-native";
import { AppStackScreenProps } from "../types";

type LoginScreen = AppStackScreenProps<"ProfileScreen">;
const ProfileScreen: React.FC<LoginScreen> = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
