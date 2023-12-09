
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import * as ethers  from "ethers";
import dotenv from "dotenv";
dotenv.config();
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

const privateKey = process.env.PRIVATE_KEY; 

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

const wallet = new ethers.Wallet(privateKey, provider);

async function submitVoterAttestation(eventUid ,voter_name , voter_address , project , votes) {
  const eas = new EAS(EASContractAddress);
  eas.connect(wallet);

  const schemaEncoder = new SchemaEncoder("string event_attestation_uid,string voter_name,string voter_address,string project,uint32 votes");
  const encodedData = schemaEncoder.encodeData([
    { name: "event_attestation_uid", value: eventUid, type: "string" },
    { name: "voter_name", value: voter_name, type: "string" },
    { name: "voter_address", value: voter_address, type: "string" },
    { name: "project", value: project, type: "string" },
    { name: "votes", value: votes, type: "uint32" }
  ]);


  const schemaUID =
    "0x7ad74600ab6bf2eb8a3226a56ed27f0ed206f654de18488d0990cea35becb4f8";
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: voter_address, 
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();
  return { uid: newAttestationUID };
}

export default submitVoterAttestation;
