import { AnonAadhaarPCDArgs, WitnessPDFInputs } from "../types/interface";
import { ArgumentTypeName } from "@pcd/pcd-types";
import { INDIA_GOV_PUBLIC_KEY, app_id, Testing } from "../shared/constants";

export const genArgs = (witness: WitnessPDFInputs) => {
  const args: AnonAadhaarPCDArgs = {
    base_message: {
      argumentType: ArgumentTypeName.BigInt,
      userProvided: false,
      value: witness?.msgBigInt.toString(),
      description: "",
    },
    signature: {
      argumentType: ArgumentTypeName.BigInt,
      userProvided: false,
      value: witness?.sigBigInt.toString(),
      description: "",
    },
    modulus: {
      argumentType: ArgumentTypeName.BigInt,
      userProvided: false,
      value: Testing
        ? witness.modulusBigInt.toString()
        : "0x" + INDIA_GOV_PUBLIC_KEY,
      description: "",
    },
    app_id: {
      argumentType: ArgumentTypeName.BigInt,
      userProvided: false,
      value: app_id,
      description: "",
    },
  };

  if (!args.modulus.value) {
    throw new Error("Cannot make proof: missing modulus");
  }
  if (!args.signature.value) {
    throw new Error("Cannot make proof: missing signature");
  }
  if (!args.base_message.value) {
    throw new Error("Cannot make proof: missing message");
  }
  if (!args.app_id.value) {
    throw new Error("Cannot make proof: missing application id");
  }

  return args;
};
