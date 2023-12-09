import { Box, Text } from "native-base";
import React from "react";
import { View } from "react-native";
import { Card } from "../components/Card";
import { AppStackScreenProps } from "../types";

type DashBoardScreenProps = AppStackScreenProps<"DashBoard">;

const DashBoardScreen: React.FC<DashBoardScreenProps> = ({ navigation }) => {
  return (
    <>
      <Box style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}>
          <Text color="primary.800" px="4" pt="3" mb={"6"} fontSize="4xl" bold>
            Verifychain
          </Text>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box>
              <Card
                bgColor="#418CFD"
                title="Quadratic Voting"
                iconname={"Variable"}
                onPress={() => navigation.navigate("QVotingScreen")}
              />
              <Card
                title="Telegram group"
                bgColor="#EC9B3D"
                iconname={"Users"}
                onPress={() => {
                  navigation.navigate("TelegramScreen");
                }}
              />
            </Box>
            <Box>
              <Card
                title="QV Result"
                bgColor="#FD4A4A"
                iconname="CheckSquare"
                onPress={() => {
                  navigation.navigate("QVotingResult");
                }}
              />
              <Card
                title="UBI"
                iconname={"Receipt"}
                onPress={() => {
                  navigation.navigate("QVotingScreen");
                }}
              />
            </Box>
          </Box>

          <Box alignItems="center">
            <Card
              title="My Wallet"
              iconname={"Wallet"}
              onPress={() => {
                navigation.navigate("ProfileScreen");
              }}
            />
          </Box>
        </View>
      </Box>
    </>
  );
};

export default DashBoardScreen;
