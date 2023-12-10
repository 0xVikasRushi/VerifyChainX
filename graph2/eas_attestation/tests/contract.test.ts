import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { AttestationAdded } from "../generated/schema"
import { AttestationAdded as AttestationAddedEvent } from "../generated/Contract/Contract"
import { handleAttestationAdded } from "../src/contract"
import { createAttestationAddedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let attester = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let recipient = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let uid = Bytes.fromI32(1234567890)
    let schema = Bytes.fromI32(1234567890)
    let newAttestationAddedEvent = createAttestationAddedEvent(
      attester,
      recipient,
      uid,
      schema
    )
    handleAttestationAdded(newAttestationAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AttestationAdded created and stored", () => {
    assert.entityCount("AttestationAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AttestationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "attester",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AttestationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipient",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AttestationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "uid",
      "1234567890"
    )
    assert.fieldEquals(
      "AttestationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "schema",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
