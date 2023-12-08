import { NativeBaseProvider, Text, View } from "native-base";
import React from "react";

function App(): React.JSX.Element {
  return (
    <NativeBaseProvider>
      <View>
        <Text>dsd</Text>
      </View>
    </NativeBaseProvider>
  );
}

export default App;
