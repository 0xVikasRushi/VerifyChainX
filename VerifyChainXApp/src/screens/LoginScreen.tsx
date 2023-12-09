import React from "react";
import { WebView } from "react-native-webview";

import type { WebViewMessageEvent } from "react-native-webview";
import { AUTH_URL } from "../shared/constant";
import { storage } from "../shared/mkkvStorage";
import { AppStackScreenProps } from "../types";

type LoginScreenProps = AppStackScreenProps<"LoginScreen">;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const a = storage.getAllKeys();
  console.log(a);
  const handleWebviewMessage = (e: WebViewMessageEvent) => {
    const event: any = e.nativeEvent.data;
    if (event) {
      try {
        const { data } = JSON.parse(event);
        console.log(data);
      } catch (error) {
        console.error("Error parsing WebView data:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <WebView onMessage={handleWebviewMessage} source={{ uri: AUTH_URL }} style={{ flex: 1 }} />
    </React.Fragment>
  );
};

export default LoginScreen;
