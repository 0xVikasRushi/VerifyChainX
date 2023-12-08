import React from "react";
import { Text, View } from "react-native";
import { AppStackScreenProps } from "../types";

type QVotinResultProps = AppStackScreenProps<"QVotingResult">;
const QVotinResultScreen: React.FC<QVotinResultProps> = () => {
  return (
    <View>
      <Text>DashBoardScreen</Text>
    </View>
  );
};

export default QVotinResultScreen;
