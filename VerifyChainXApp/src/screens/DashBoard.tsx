import { Box, Text, View, Image } from "native-base";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppStackScreenProps } from "../types";
import Card from "../components/Card";

type DashBoardScreenProps = AppStackScreenProps<"DashBoard">;

const DashBoardScreen: React.FC<DashBoardScreenProps> = ({ navigation }) => {
  return (
    <>
      <LinearGradient colors={["#DD5E89", "#F7BB97"]} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#131522" }}>
          <Text color="white" px="4" pt="3" top={-30} fontSize="4xl" bold>
            VerifyChain
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
                title="Host a QV"
                bgColor="#EC9B3D"
                iconname={"Users"}
                onPress={() => {
                  navigation.navigate("QVotingScreen");
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
                title="My Wallet"
                iconname={"Wallet"}
                onPress={() => {
                  navigation.navigate("ProfileScreen");
                }}
              />
            </Box>
          </Box>

          <View display="flex" marginTop={10} justifyContent={"center"} alignItems={"center"}>
            <Text color="white" fontSize="lg" fontWeight={"bold"}>
              Powered by @AnonAadhaar{" "}
            </Text>
            <View padding={"2"} marginTop={"2"} backgroundColor="white" borderRadius={"md"}>
              <Image source={require("../public/footerpse.png")} alt="onChainverified" />
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default DashBoardScreen;
