import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  Attested,
  Revoked,
  RevokedOffchain,
  Timestamped
} from "../generated/Contract/Contract"

export function createAttestedEvent(
  recipient: Address,
  attester: Address,
  uid: Bytes,
  schema: Bytes
): Attested {
  let attestedEvent = changetype<Attested>(newMockEvent())

  attestedEvent.parameters = new Array()

  attestedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  attestedEvent.parameters.push(
    new ethereum.EventParam("attester", ethereum.Value.fromAddress(attester))
  )
  attestedEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromFixedBytes(uid))
  )
  attestedEvent.parameters.push(
    new ethereum.EventParam("schema", ethereum.Value.fromFixedBytes(schema))
  )

  return attestedEvent
}

export function createRevokedEvent(
  recipient: Address,
  attester: Address,
  uid: Bytes,
  schema: Bytes
): Revoked {
  let revokedEvent = changetype<Revoked>(newMockEvent())

  revokedEvent.parameters = new Array()

  revokedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  revokedEvent.parameters.push(
    new ethereum.EventParam("attester", ethereum.Value.fromAddress(attester))
  )
  revokedEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromFixedBytes(uid))
  )
  revokedEvent.parameters.push(
    new ethereum.EventParam("schema", ethereum.Value.fromFixedBytes(schema))
  )

  return revokedEvent
}

export function createRevokedOffchainEvent(
  revoker: Address,
  data: Bytes,
  timestamp: BigInt
): RevokedOffchain {
  let revokedOffchainEvent = changetype<RevokedOffchain>(newMockEvent())

  revokedOffchainEvent.parameters = new Array()

  revokedOffchainEvent.parameters.push(
    new ethereum.EventParam("revoker", ethereum.Value.fromAddress(revoker))
  )
  revokedOffchainEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromFixedBytes(data))
  )
  revokedOffchainEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return revokedOffchainEvent
}

export function createTimestampedEvent(
  data: Bytes,
  timestamp: BigInt
): Timestamped {
  let timestampedEvent = changetype<Timestamped>(newMockEvent())

  timestampedEvent.parameters = new Array()

  timestampedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromFixedBytes(data))
  )
  timestampedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return timestampedEvent
}
