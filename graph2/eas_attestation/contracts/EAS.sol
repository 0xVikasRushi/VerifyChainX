// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourAttestationContract {
    struct Attestation {
        address attester;
        address recipient;
        bytes32 uid;
        bytes32 schema;
    }

    mapping(address => Attestation[]) public attestationsByRecipient;

    event AttestationAdded(address indexed attester, address indexed recipient, bytes32 uid, bytes32 schema);

    function addAttestation(address _recipient, bytes32 _uid, bytes32 _schema) external {
        attestationsByRecipient[_recipient].push(Attestation({
            attester: msg.sender,
            recipient: _recipient,
            uid: _uid,
            schema: _schema
        }));

        emit AttestationAdded(msg.sender, _recipient, _uid, _schema);
    }

    function getAttestationsByRecipient(address _recipient) external view returns (Attestation[] memory) {
        return attestationsByRecipient[_recipient];
    }
}
