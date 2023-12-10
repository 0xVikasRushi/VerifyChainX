import { AttestationAdded as AttestationAddedEvent } from "../generated/Contract/Contract"
import { AttestationAdded } from "../generated/schema"

export function handleAttestationAdded(event: AttestationAddedEvent): void {
  let entity = new AttestationAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.attester = event.params.attester
  entity.recipient = event.params.recipient
  entity.uid = event.params.uid
  entity.schema = event.params.schema

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
