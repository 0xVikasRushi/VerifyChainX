import React from "react";
import { Text, View } from "react-native";
import { AppStackScreenProps } from "../types";

type ProfileScreenProps = AppStackScreenProps<"ProfileScreen">;
const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
