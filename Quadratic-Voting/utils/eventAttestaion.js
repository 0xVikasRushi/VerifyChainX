import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import * as ethers  from "ethers";
import dotenv from "dotenv";
dotenv.config();
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

const privateKey = process.env.PRIVATE_KEY; 

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

const wallet = new ethers.Wallet(privateKey, provider);

async function submitAttestation(eventData) {
  const eas = new EAS(EASContractAddress);
  eas.connect(wallet);

  const schemaEncoder = new SchemaEncoder("string event_uuid,string event_name,string event_description,address event_owner,string event_createdAt,string event_endedAt,bool isCompleted");
  const encodedData = schemaEncoder.encodeData([
    { name: "event_uuid", value: eventData.event_uuid, type: "string" },
    { name: "event_name", value: eventData.event_name, type: "string" },
    { name: "event_description", value: eventData.event_description, type: "string" },
    { name: "event_owner", value: eventData.event_owner, type: "address" },
    { name: "event_createdAt", value: eventData.event_createdAt, type: "string" },
    { name: "event_endedAt", value: eventData.event_endedAt, type: "string" },
    { name: "isCompleted", value: eventData.isCompleted, type: "bool" },
  ]);

  const schemaUID =
    "0xc4190a2f6e7047f8f52e8219f5bb9450c00a36051e1c2c1a56460b4bbc578edd";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: eventData.event_owner, //! event owner is the receipient or the main admin 
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();
  return { uid: newAttestationUID, eventData };
}

export default submitAttestation;