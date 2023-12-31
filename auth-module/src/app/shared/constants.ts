import { Goerli } from "@thirdweb-dev/chains";
import * as crypto from "crypto";
import path from "path";

export const factoryAddress = "0xA70dEB809f8e1fA2b22425Abcc571DD1116BE63d";
export const chain = Goerli;

export const THIRD_API_KEY = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
export const app_id = process.env.NEXT_PUBLIC_AADHAR_ANON_APP_ID;
const secret = process.env.NEXT_PUBLIC_SECRET_KEY;
export const INDIA_GOV_PUBLIC_KEY =
  "a2722c0e5f2de5ba707ed93f036ec2b1f0b955932390facc0f0bcbf20c80a15c088b4886866b72eb25ab0bf55a2fe06b69edbd5cc83b74c7709db2141e6c07c68bcdf859d3daf7f3fced241d072055dc15488474b45c2c982fa954aa52aa6fffb2481861c65085d84b64158e9f43d9f35ca69b48ce9300522102a4cae093bffd474b08d32d1d0406f687f7e55bd226a2384bf58a41c384c3974f1c7c5115819c926de3adf3ecbb9904c486f1f5d5303977bea63584367329b5c168afdc95121731f7f48d43af7cf31f69b1e3bbe7949dc7a8b10c0bddebababdebea076a1cf8166adf06a8a41dedf143bff835dbd2bd5bb0b61d2472c234a6d4411bc9b536095";

export const Testing = true;

export const Wasm_Loc = path.join(process.cwd(), "main.wasm");
export const Zkey_Loc = path.join(process.cwd(), "circuit_final.zkey");

export const generatedUserInfo = (bigNum: BigInt) => {
  const sigBigInt = bigNum.toString();
  const usernameStr = `${secret}${sigBigInt}`;
  const passwordInput = `${sigBigInt}${secret}`;

  const username = crypto
    .createHash("sha256")
    .update(usernameStr)
    .digest("hex");

  const passwordHash = crypto
    .createHash("sha256")
    .update(passwordInput)
    .digest("hex");

  const user = username;
  const pass = passwordHash;

  return { user, pass };
};

export const circularReferenceReplacer = () => {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }
    return value;
  };
};
