"use client";
import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import * as snarkjs from "snarkjs";
import { v4 as uuidv4 } from "uuid";
import { Signer } from "ethers";

import {
  extractSignature,
  extractWitness,
  genArgs,
  genInput,
  verifyPCD,
} from "../app/utils";
import { AadhaarPdfValidation, AnonAadhaarPCDClaim } from "./types/interface";
import {
  Wasm_Loc,
  Zkey_Loc,
  circularReferenceReplacer,
  generatedUserInfo,
} from "./shared/constants";
import { connectToSmartWallet } from "./shared/wallet";

declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

const AuthvPage: NextPage = () => {
  const [filename, setFileName] = useState<Blob | null>(null);
  const [password, setPassword] = useState("");
  const [pdfStatus, setpdfStatus] = useState<"" | AadhaarPdfValidation>("");
  const [isVerified, setIsVerified] = useState(false);
  const [pdfData, setPdfData] = useState<Buffer>(Buffer.from([]));
  const [signatureBigInt, setSignatureBigInt] = useState<BigInt>(BigInt(0));

  const [username, setUsername] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileRead = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file);
    }
  };

  const handleUpload = async (): Promise<{
    pdf: Buffer;
    signature: string;
    signedData: Buffer;
  }> => {
    return new Promise((resolve, reject) => {
      const file = filename;
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = async (e) => {
        if (e.target) {
          try {
            const { signature, signedData } = extractSignature(
              Buffer.from(e.target.result as string, "binary")
            );
            resolve({
              pdf: Buffer.from(e.target.result as string, "binary"),
              signature,
              signedData,
            });
            setpdfStatus(
              signature !== ""
                ? AadhaarPdfValidation.SIGNATURE_PRESENT
                : AadhaarPdfValidation.SIGNATURE_NOT_PRESENT
            );
          } catch (error) {
            setpdfStatus(AadhaarPdfValidation.ERROR_PARSING_PDF);
            reject(error);
          }
        }
      };
    });
  };

  const ProofGenerate = async () => {
    setIsLoading(true);
    setLoadingStatus("Generating proof");

    const { pdf, signature, signedData } = await handleUpload();

    setPdfData(pdf);
    try {
      // ? cal witness
      const witness = await extractWitness(
        pdf,
        password,
        signature,
        signedData
      );
      setLoadingStatus("Extracting witness");
      if (witness instanceof Error) {
        setErrorMessage(witness.message);
        console.error("Error extracting witness:", witness.message);
      } else {
        // ? SAVE THIS SIGNATURE BIGINT ENCRYPTED VALUE

        setSignatureBigInt(witness.sigBigInt);
        console.log("witness", witness.sigBigInt);
        const args = genArgs(witness);
        setLoadingStatus("Generating input");
        const input = genInput(args);

        if (input instanceof Error) {
          throw new Error(
            "Cannot make proof: something went wrong! in generating input"
          );
        }

        console.log(
          "..............Generating proof............................"
        );

        setLoadingStatus("Creating proof...");
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
          input,
          Wasm_Loc,
          Zkey_Loc
        );
        setLoadingStatus("proof genereted");

        console.log(
          "...........................Proof generated.............................."
        );

        if (publicSignals === undefined || proof === undefined) {
          throw new Error("Cannot make proof: something went wrong!");
        }

        const id = uuidv4();

        const proofv = {
          modulus: args.modulus.value,
          nullifier: publicSignals[0],
          app_id: input.app_id,
          proof,
        };

        const claim: AnonAadhaarPCDClaim = {
          modulus: args.modulus.value ? args.modulus.value : "",
        };

        return { id, proof: proofv, claim };
      }
    } catch (error) {
      throw new Error("Cannot make proof: something went wrong!");
    }
  };

  const handleGenProof = async () => {
    console.log("Generating proof");
    const before = performance.now();
    const pcd = await ProofGenerate();
    setLoadingStatus("Verifying proof");
    const isVerify = await verifyPCD(pcd);

    setLoadingStatus("Proof verified ✅");
    setIsVerified(isVerify);

    setLoadingStatus("Generating user info");
    const { user, pass } = generatedUserInfo(signatureBigInt);

    setUsername(user);
    setWalletPassword(pass);

    const newsigner = await handleWalletCreation(user, pass);
    console.log("signer", newsigner);
    const address = await newsigner?.getAddress();
    if (newsigner === undefined) return;
    const message = JSON.stringify({
      data: pcd,
      smartContractWallet: {
        username: user,
        password: pass,
      },
      address: address,
      signer: JSON.stringify(newsigner, circularReferenceReplacer()),
    });
    console.log(address);
    setIsLoading(false);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message);
    }
    console.log("time taken", performance.now() - before);
  };

  const handleWalletCreation = async (
    username: string,
    password: string // ? varaible
  ): Promise<Signer | undefined> => {
    if (!username || !password) return;
    try {
      setIsLoading(true);
      const wallet = await connectToSmartWallet(
        username,
        password,
        (status) => {
          setLoadingStatus(status);
        }
      );

      const s = await wallet.getSigner();
      setIsLoading(false);
      return s;
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">VerifyChain</h2>
        <form>
          <div className="mb-6">
            <h3 className="text-black font-semibold mb-2 text-lg">
              Prove your Identity with your Aadhar card
            </h3>
            <p className="text-gray-600">
              Anon Aadhaar lets you prove your identity by generating a
              Zero-Knowledge Proof (ZK Proof) verifying your Aadhaar card was
              signed with the Indian government public key.
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fileInput"
            >
              Upload your Masked Aadhaar PDF
            </label>
            <input
              type="file"
              onChange={handleFileRead}
              className="w-full flex items-center overflow-hidden whitespace-nowrap text-overflow-ellipsis border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border-1 border-gray-300 max-w-full text-xs bg-gray-100 cursor-pointer mt-2"
              style={{
                maxWidth: "80%",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                color: "#111827",
                backgroundColor: "#f9fafb",
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Password
            </label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="passwordInput"
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {isLoading && (
            <div>
              <MagnifyingGlass
                visible={isLoading}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
              <h1 className="text-xl text-black font-serif mb-2">
                {loadingStatus}
              </h1>
            </div>
          )}

          {!isLoading && (
            <button
              onClick={handleGenProof}
              className="text-black  font-semibold p-3 rounded-xl my-4 hover:opacity-70 shadow-lg active:bg-gray-200"
            >
              🌏 Log In with Anon Aadhaar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthvPage;
