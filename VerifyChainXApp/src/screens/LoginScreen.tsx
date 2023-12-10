import React, { useEffect } from "react";
import { WebView } from "react-native-webview";

import type { WebViewMessageEvent } from "react-native-webview";
import { AUTH_URL } from "../shared/constant";
import { storage } from "../shared/mkkvStorage";
import { AppStackScreenProps } from "../types";

type LoginScreenProps = AppStackScreenProps<"LoginScreen">;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { isLoggedIn, login } = useLoginStatus();

  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      console.log("isLoggedIn", isLoggedIn);
      navigation.navigate("DashBoard");
    }
  }, [isLoggedIn]);

  const a = storage.getAllKeys();
  console.log(a);
  const handleWebviewMessage = (e: WebViewMessageEvent) => {
    const event: any = e.nativeEvent.data;
    if (event) {
      try {
        const { data, smartContractWallet, signer, address } = JSON.parse(event);
        const { username, password } = smartContractWallet;

        storage.set("username", username);
        storage.set("password", password);
        storage.set("address", address);
        storage.set("proof", JSON.stringify(data));
        // console.log("signer", signer);
        if (address) {
          login();
          navigation.navigate("DashBoard");
        }
      } catch (error) {
        console.error("Error parsing WebView data:", error);
      }
    }
  };

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <></>
      ) : (
        <WebView onMessage={handleWebviewMessage} source={{ uri: AUTH_URL }} style={{ flex: 1 }} />
      )}
    </React.Fragment>
  );
};

export default LoginScreen;
