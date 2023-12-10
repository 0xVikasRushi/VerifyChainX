import {
  LocalWallet,
  SmartWallet,
  ThirdwebSDK,
  isContractDeployed,
} from "@thirdweb-dev/react";
import { THIRD_API_KEY, chain, factoryAddress } from "./constants";

export function createSmallWallet(): SmartWallet {
  const smartWallet = new SmartWallet({
    chain: chain,
    factoryAddress: factoryAddress,
    clientId: THIRD_API_KEY || "",
    gasless: true,
  });
  return smartWallet;
}

export async function getWalletAddressForUser(
  sdk: ThirdwebSDK,
  username: string
): Promise<string> {
  const factory = await sdk.getContract(factoryAddress);
  const smartWalletAddress: string = await factory.call("accountOfUsername", [
    username,
  ]);
  return smartWalletAddress;
}

export async function connectToSmartWallet(
  username: string,
  pwd: string,
  statusCallback: (status: string) => void
): Promise<SmartWallet> {
  statusCallback("checking username...");

  const sdk = new ThirdwebSDK(chain, {
    clientId: THIRD_API_KEY || "",
  });

  const smartWalletAddress = await getWalletAddressForUser(sdk, username);

  const isDeployed = await isContractDeployed(
    smartWalletAddress,
    sdk.getProvider()
  );

  const smartWallet = createSmallWallet();
  const personalWallet = new LocalWallet();

  if (isDeployed) {
    statusCallback("existing username smart wallet...");

    const contract = await sdk.getContract(smartWalletAddress);

    const metadata = await contract.metadata.get();

    const encryptedWallet = metadata.encryptedWallet;
    if (!encryptedWallet) {
      throw new Error("No encrypted wallet found");
    }

    statusCallback?.("Decrypting personal wallet...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await personalWallet.import({
      encryptedJson: encryptedWallet,
      password: pwd,
    });

    statusCallback?.("Connecting...");
    await smartWallet.connect({
      personalWallet,
    });
  } else {
    statusCallback("new username smart wallet...");

    await personalWallet.generate();

    const encryptedWallet = await personalWallet.export({
      strategy: "encryptedJson",
      password: pwd,
    });

    await smartWallet.connect({
      personalWallet: personalWallet,
    });

    statusCallback("uploading and registering username");

    await smartWallet.deploy();

    const contract = await smartWallet.getAccountContract();

    const encryptedWalletUri = await sdk.storage.upload({
      name: username,
      encryptedWallet,
    });

    await contract.call("register", [username, encryptedWalletUri]);
  }

  return smartWallet;
}
