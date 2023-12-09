import {
  Attested as AttestedEvent,
  Revoked as RevokedEvent,
  RevokedOffchain as RevokedOffchainEvent,
  Timestamped as TimestampedEvent
} from "../generated/Contract/Contract"
import {
  Attested,
  Revoked,
  RevokedOffchain,
  Timestamped
} from "../generated/schema"

export function handleAttested(event: AttestedEvent): void {
  let entity = new Attested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.attester = event.params.attester
  entity.uid = event.params.uid
  entity.schema = event.params.schema

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRevoked(event: RevokedEvent): void {
  let entity = new Revoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.attester = event.params.attester
  entity.uid = event.params.uid
  entity.schema = event.params.schema

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRevokedOffchain(event: RevokedOffchainEvent): void {
  let entity = new RevokedOffchain(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.revoker = event.params.revoker
  entity.data = event.params.data
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTimestamped(event: TimestampedEvent): void {
  let entity = new Timestamped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.data = event.params.data
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
