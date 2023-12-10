import Config from "react-native-config";
export const headerOptions = { headerShown: false };

export const AUTH_URL = Config.AUTH_URL;
export const API_URL = Config.API_URL;

export function calculateHoursRemaining(startEventDate: string, endEventDate: string): number {
  const startDate = new Date(startEventDate);
  const endDate = new Date(endEventDate);
  const currentDate = new Date();
  const timeDifference = startDate.getTime() - currentDate.getTime();
  const hoursRemaining = Math.ceil(timeDifference / (1000 * 60 * 60));
  return hoursRemaining;
}
