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

export type Event = {
  _id: string;
  event_title: string;
  event_description: string;
  event_owner: string;
  attestation_uid: string;
  num_voters: number;
  credits_per_voter: number;
  start_event_date: string;
  end_event_date: string;
  event_data: string;
  id: string;

  secret_key: string;
  created_at: string;
  __v: number;
  timeLeft?: number;
};
