import { CheckSquare, Receipt, Users, Variable, Wallet } from "lucide-react-native";
import { Box, Pressable, Text, VStack } from "native-base";
import React from "react";
import { CardsProps } from "../types";

const Card: React.FC<CardsProps> = ({ title, iconname, fontsize, onPress, bgColor }) => {
  return (
    <Pressable onPress={onPress}>
      <Box bg={bgColor || "#0077B6"} w="165" mx="3.5" my="4" h="140" borderRadius="2xl">
        <VStack alignItems="center" justifyContent="center">
          <Box mt="3">
            <Text color="white" fontSize={fontsize || "sm"}>
              {title}
            </Text>
          </Box>
          <Variable />
          {iconname === "Variable" && <Variable size={50} color="black" />}
          {iconname === "Users" && <Users size={50} color="black" />}
          {iconname === "Receipt" && <Receipt size={50} color="black" />}
          {iconname === "CheckSquare" && <CheckSquare size={50} color="black" />}
          {iconname === "Wallet" && <Wallet size={50} color="black" />}
        </VStack>
      </Box>
    </Pressable>
  );
};

export default Card;
