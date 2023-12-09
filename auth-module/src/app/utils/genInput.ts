import { AnonAadhaarPCDArgs } from "../types/interface";
import { splitToWords } from "./utils";

export const genInput = (args: AnonAadhaarPCDArgs) => {
  const signValue = args.signature.value;
  const modValue = args.modulus.value;
  const msgValue = args.base_message.value;
  const appIdValue = args.app_id.value;
  if (!signValue || !modValue || !msgValue || !appIdValue)
    throw new Error("Invalid input ");
  const input = {
    signature: splitToWords(BigInt(signValue), BigInt(64), BigInt(32)),
    modulus: splitToWords(BigInt(modValue), BigInt(64), BigInt(32)),
    base_message: splitToWords(BigInt(msgValue), BigInt(64), BigInt(32)),
    app_id: appIdValue,
  };
  return input;
};
