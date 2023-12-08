import React from "react";
import { Text, View } from "react-native";
import { AppStackScreenProps } from "../types";

type QVotingScreenProps = AppStackScreenProps<"QVotingScreen">;
const QVotingScreen: React.FC<QVotingScreenProps> = () => {
  return (
    <View>
      <Text>QVotingScreen</Text>
    </View>
  );
};

export default QVotingScreen;
