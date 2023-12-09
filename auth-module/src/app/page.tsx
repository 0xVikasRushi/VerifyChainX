import { ChangeEvent, useState } from "react";
import { extractSignature } from "./utils/extractSignature";
import { AadhaarPdfValidation } from "./types/interface";
import { MagnifyingGlass } from "react-loader-spinner";

export default function Home() {
  const [filename, setFileName] = useState<Blob | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfStatus, setpdfStatus] = useState<"" | AadhaarPdfValidation>("");

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

  // ! TODO: CAL PROOF
  const handleProof = () => {
    setIsLoading(true);
    handleUpload()
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">
            VerifyChain
          </h2>
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
                  loading status
                </h1>
              </div>
            )}

            <button className="text-black  font-semibold p-3 rounded-xl my-4 hover:opacity-70 shadow-lg active:bg-gray-200">
              🌏 Log In with Anon Aadhaar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
