import Config from "react-native-config";
import { Goerli } from "@thirdweb-dev/chains";

export const AUTH_URL = Config.AUTH_URL || "http://localhost:3000";

export const headerOptions = { headerShown: false };

export const factoryAddress = "0xA70dEB809f8e1fA2b22425Abcc571DD1116BE63d";
export const chain = Goerli;

export const THIRD_API_KEY = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
export const app_id = process.env.NEXT_PUBLIC_AADHAR_ANON_APP_ID;
const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

export const API_URL = process.env.API_URL;
