import { Avatar, Image } from "native-base";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppStackScreenProps } from "../types";

type ProfileScreenProps = AppStackScreenProps<"ProfileScreen">;
const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const isVerified = true;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profile}>
          <Avatar
            bg="cyan.500"
            source={{
              uri: "https://github.com/identicons/jasonlong.png",
            }}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Taj Baba</Text>
            {isVerified && (
              <Image
                source={require("../public/verify.png")}
                height={5}
                width={5}
                alt="Verification"
              />
            )}
          </View>

          <Text style={styles.ethereumAddress}>{isVerified ? "Verified" : "Not Verified"}</Text>
          <Text style={styles.ethereumAddress}>
            {isVerified ? "0x4a3...8f2d" : "Not available"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log("Logout");
            }}
          >
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
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 12,
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
    marginRight: 8,
  },
  ethereumAddress: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
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
});

export default ProfileScreen;
