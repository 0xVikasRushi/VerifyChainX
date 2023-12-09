import axios from "axios";
export const handleError = (error: unknown, defaultMessage: string): Error => {
  if (error instanceof Error) return error;

  let stringified = defaultMessage;
  try {
    stringified = JSON.stringify(error);
  } catch {}

  const err = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  );
  return err;
};

export const fetchPublicKey = async (
  certUrl: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://nodejs-serverless-function-express-eight-iota.vercel.app/api/get-public-key?url=${certUrl}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch public key from server`);
    }

    const publicKeyData = await response.json();
    return publicKeyData.publicKey || null;
  } catch (error) {
    console.error("Error fetching public key:", error);
    return null;
  }
};

export function splitToWords(
  number: bigint,
  wordsize: bigint,
  numberElement: bigint
) {
  let t = number;
  const words: string[] = [];
  for (let i = BigInt(0); i < numberElement; ++i) {
    const baseTwo = BigInt(2);

    words.push(`${t % BigInt(Math.pow(Number(baseTwo), Number(wordsize)))}`);
    t = BigInt(t / BigInt(Math.pow(Number(BigInt(2)), Number(wordsize))));
  }
  if (!(t == BigInt(0))) {
    throw `Number ${number} does not fit in ${(
      wordsize * numberElement
    ).toString()} bits`;
  }
  return words;
}

export async function getVerifyKey() {
  await axios
    .get("https://d3dxq5smiosdl4.cloudfront.net/verification_key.json")
    .then((response) => {
      return response.data;
    });
}

export function sleep(ms: number) {
  console.log("Sleeping for " + ms / 1000 + "seconds");
  return new Promise((resolve) => setTimeout(resolve, ms));
}
