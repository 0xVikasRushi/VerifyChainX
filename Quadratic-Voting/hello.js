import * as ethers from "ethers";
import HelloworldAbi from "./hello.json" assert { type: "json" } ;
async function main() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/process.env.INFURA_API_KEY `);

    const contractAddress = "0x17151E8a1EbAeC82aB979F323D4Bf8a9Fc6522C7";
    const helloWorldContract = new ethers.Contract(contractAddress, HelloworldAbi.abi , provider);

    const result = await helloWorldContract.getHelloWorld(n);

    console.log("Result of getHelloWorld function:", result.toString());
  } catch (error) {
    console.error("Error:", error);
    process.exitCode = 1;
  }
}

main();
