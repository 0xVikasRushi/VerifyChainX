import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppParamList = {
  LoginScreen: undefined;
  DashBoard: undefined;
  QVotingScreen: undefined;
  QVotingResult: undefined;
  ProfileScreen: undefined;
  TelegramScreen: undefined;
};

export type AppStackScreenProps<T extends keyof AppParamList> = NativeStackScreenProps<
  AppParamList,
  T
>;

export interface CardsProps {
  title?: string;
  iconname?: any;
  fontsize?: string;
  onPress?: () => void;
  bgColor?: string;
}
