import React from "react";
import { Text, View } from "react-native";
import { AppStackScreenProps } from "../types";

type DashBoardScreenProps = AppStackScreenProps<"DashBoard">;
const DashBoardScreen: React.FC<DashBoardScreenProps> = () => {
  return (
    <View>
      <Text>DashBoardScreen</Text>
    </View>
  );
};

export default DashBoardScreen;
