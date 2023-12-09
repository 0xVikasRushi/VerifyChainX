import { Heading, Spinner, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { useLoginStatus } from "../contexts/LoginStatusContext";
import { AppStackScreenProps } from "../types";

type LoadingScreenProps = AppStackScreenProps<"LoadingScreen">;

const LoadingScreen: React.FC<LoadingScreenProps> = ({ route, navigation }) => {
  const params = route.params;

  const username = params.username;
  const password = params.password;

  // ? handle wallet login

  // ? TODO NEED TO ADD LOGIC TO WALLET AND THIRD WEB SDK

  const { isLoggedIn, login } = useLoginStatus();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("DashBoard");
    }
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState("Checking For smart wallet");

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <VStack space={2} alignItems="center">
        <Spinner size={250} color="warning.500" />
        <Heading color="primary.500" fontSize="xl">
          {status}
        </Heading>
      </VStack>
    </View>
  );
};

export default LoadingScreen;
