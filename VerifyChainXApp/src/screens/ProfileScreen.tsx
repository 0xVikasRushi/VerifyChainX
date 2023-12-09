import { Avatar, Image, Box } from "native-base";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { AppStackScreenProps } from "../types";
import Clipboard from "@react-native-clipboard/clipboard";

type ProfileScreenProps = AppStackScreenProps<"ProfileScreen">;
const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const [onchainVerified, setonchainVerified] = useState(true);
  const [offchainVerified, setoffchainVerified] = useState(true);
  const [copiedText, setCopiedText] = useState("");
  const [addressText, setAdressText] = useState("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
  const isVerified = true;

  const copyToClipboard = () => {
    Clipboard.setString(addressText);
    console.log(`Copied to Text : ${addressText}`);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Box width={"100%"} alignItems={"center"} style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </Box>

        <View style={styles.profile}>
          <Avatar
            bg="cyan.500"
            source={{
              uri: "https://github.com/identicons/jasonlong.png",
            }}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>User</Text>
          </View>
          <Box flexDirection={"row"}>
            <Text style={styles.onchainText}>
              {onchainVerified ? "onchainVerified-" : "notOnchainVerified-"}
            </Text>
            <Box marginTop={1}>
              {onchainVerified ? (
                <Image
                  source={require("../public/verify.png")}
                  height={5}
                  width={5}
                  alt="Verification"
                />
              ) : (
                <Image
                  source={require("../public/unverified.png")}
                  height={5}
                  width={5}
                  alt="onChainverified"
                />
              )}
            </Box>
          </Box>
          <Box flexDirection={"row"}>
            <Text style={styles.offchainText}>
              {offchainVerified ? "OffchainVerified-" : "notOffchainVerified-"}
            </Text>
            <Box marginTop={1}>
              {offchainVerified ? (
                <Image
                  source={require("../public/verify.png")}
                  height={5}
                  width={5}
                  alt="Verification"
                />
              ) : (
                <Image
                  source={require("../public/unverified.png")}
                  height={5}
                  width={5}
                  alt="onChainverified"
                />
              )}
            </Box>
          </Box>

          <Box flexDirection={"row"}>
            <Text style={styles.ethereumAddress}>
              {isVerified ? `${addressText}` : "Not available"}
            </Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Box flex={1} marginTop={1.5}>
                <Image
                  source={require("../public/clipboard.png")}
                  height={5}
                  width={5}
                  alt="onChainverified"
                />
              </Box>
            </TouchableOpacity>
          </Box>

          <TouchableOpacity onPress={() => console.log("Log out")}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  profile: {
    marginTop: 24,
    padding: 26,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "#e3e3e3",
    borderRadius: 12,
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  profileName: {
    fontSize: 27,
    fontWeight: "600",
    color: "#090909",
    marginRight: 8,
  },
  ethereumAddress: {
    marginTop: 10,
    fontSize: 11,
    overflow: "hidden",
    fontWeight: "600",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12,
  },
  profileActionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  onchainText: {
    color: "#353935",
    fontSize: 17,
  },
  offchainText: {
    color: "#353935",
    letterSpacing: 1,
    fontSize: 15,
  },
});

export default ProfileScreen;
