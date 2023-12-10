import * as snarkjs from "snarkjs";
import { splitToWords } from "./utils";
import { VKEY } from "./vkey";

export async function verifyPCD(pcd: any): Promise<boolean> {
  let isVerifed = false;
  try {
    const proof = pcd.proof.proof;

    isVerifed = await snarkjs.groth16.verify(
      VKEY,
      [
        pcd.proof.nullifier.toString(),
        ...splitToWords(BigInt(pcd.proof.modulus), BigInt(64), BigInt(32)),
        pcd.proof.app_id.toString(),
      ],
      proof
    );
  } catch (error) {
    console.log("error", error);
  }

  return isVerifed;
}
