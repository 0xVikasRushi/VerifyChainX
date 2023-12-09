//   const schemaUID = "0x14157aa9fe895d6fe29ea4f0f5b453bcc8d939c3b4a6a5ce7bd829e785cf3e7e";
//! schema with project - string , votes - bytes32 --- 0xf164b8a3b56bcc6f0e61f395507fd20e772efe9a5f09bd789ec9585ac1acdd74
//! schema with project - string[] , votes - bytes32[] --- 0xccbc007c5e1cd9313a21f18865e96b67cdb3839c609ced57363fe9200066cdc6
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
    // "0xf164b8a3b56bcc6f0e61f395507fd20e772efe9a5f09bd789ec9585ac1acdd74";
    // "0x0c6b70897e96046b7a37455ed2b60e9a46d524996a41e4b59a37d8b580e299b6";
    "0x7ad74600ab6bf2eb8a3226a56ed27f0ed206f654de18488d0990cea35becb4f9";
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: voter_address, //! event owner is the receipient or the main admin 
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();
  return { uid: newAttestationUID };
}

export default submitVoterAttestation;

