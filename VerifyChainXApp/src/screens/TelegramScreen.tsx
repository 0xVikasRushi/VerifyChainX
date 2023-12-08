import React from "react";
import { Text, View } from "react-native";
import { AppStackScreenProps } from "../types";

type TelegramScreenProps = AppStackScreenProps<"TelegramScreen">;
const TelegramScreen: React.FC<TelegramScreenProps> = () => {
  return (
    <View>
      <Text>TelegramScreen</Text>
    </View>
  );
};

export default TelegramScreen;
