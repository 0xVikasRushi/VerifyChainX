import { ChangeEvent, useState } from "react";
import { extractSignature } from "./utils/extractSignature";
import { AadhaarPdfValidation } from "./types/interface";

export default function Home() {
  const [filename, setFileName] = useState<Blob | null>(null);
  const [password, setPassword] = useState("");
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

  return (
    <>
      <input type="file" onChange={handleFileRead} />
    </>
  );
}
