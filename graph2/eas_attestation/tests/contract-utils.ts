import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import { AttestationAdded } from "../generated/Contract/Contract"

export function createAttestationAddedEvent(
  attester: Address,
  recipient: Address,
  uid: Bytes,
  schema: Bytes
): AttestationAdded {
  let attestationAddedEvent = changetype<AttestationAdded>(newMockEvent())

  attestationAddedEvent.parameters = new Array()

  attestationAddedEvent.parameters.push(
    new ethereum.EventParam("attester", ethereum.Value.fromAddress(attester))
  )
  attestationAddedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  attestationAddedEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromFixedBytes(uid))
  )
  attestationAddedEvent.parameters.push(
    new ethereum.EventParam("schema", ethereum.Value.fromFixedBytes(schema))
  )

  return attestationAddedEvent
}
