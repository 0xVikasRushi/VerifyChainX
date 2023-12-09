// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@thirdweb-dev/contracts/prebuilts/account/utils/BaseAccountFactory.sol";
import "./CredentialAccount.sol";

contract AadhaarAccountFactory is BaseAccountFactory  {

    event Registered(string username, address account);
    mapping(string => address) public accountOfUsername;

    constructor(
        IEntryPoint _entrypoint
    )
        BaseAccountFactory(
            address(new CredentialAccount(_entrypoint, address(this))), address(_entrypoint)
        )
    {}

    function _initializeAccount(
        address _account,
        address _admin,
        bytes calldata _data
    ) internal override {
        CredentialAccount(payable(_account)).initialize(_admin, _data);
    }


    function onRegistered(string calldata username) external {
        address account = msg.sender;
        require(this.isRegistered(account), "CredentialAccountFactory: not an account.");
        require(accountOfUsername[username] == address(0), "CredentialAccountFactory: username already registered");
        accountOfUsername[username] = account;
        emit Registered(username, account);
    }
}