# VerifyChainX

 Quadratic Voting App, integrates Anon Aadhaar Authentication for secure identification and a ERC4337 Wallet compatible with Aadhaar cards.


## Technologies we used
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/28b02bbc9ad9f7a503c43775aebeb515dc2da5fc/topics/nextjs/nextjs.png"></code>
<code><img height="30" src="https://github.com/0xVikasRushi/VerifyChainX/assets/88543171/163245c3-df0b-42e0-b13a-87acde013d0e"></code>

## The problem it solves

1. When new users join without the hassle of handling private keys and difficult storage wallets, their experience becomes smoother and can be easily recovered using a single Aadhar card.

2. Getting rid of the need for users to deal with wallet complications makes blockchain apps (dApps) easier for everyone to use.

3. Verifying an Aadhar card using zk proof through the anon-aadhaar package checks if the Aadhar card is signed by the government's public key. This ensures Aadhar card validation without revealing personal information.

4. By integrating Quadratic Voting, the limitations of traditional voting methods are solved by offering more consensus measures. Anon-Aadhar verification ensures voters' legitimacy, adding an extra layer of security to confirm the identity of people participating in the voting process.

5. Keeping the truthfulness intact through attestations created against voter addresses maintains the reliability of voting data. This method ensures the accuracy of information in the voting system.

6.Efficiently retrieving data using The Graph Protocol allows the creation of custom subgraphs. This helps quickly get attestation data, making it easier for users to access information.

## Challenges we ran into

1 . Implemetation of Anon-aadhar sdk with react native due to its incompatable  and understading underlaying math invloing in circuits and proof generation and rewriting own sdk and extract few of parameters to generate constant username and password

2 . Optimising Build Time for proof generation with website by caching keys.

3 . Creating custom aadhar smart contract which takes only username and password to create or get existing smart contract wallet.
 
4 . Understanding and implementing Quadratic Voting mechanisms started out to be complex to implement . Overcoming this required thorough research ( by Devfolio )

5 . Managing attestations against voter addresses demanded clean handling of contracts and schema structures.

6 . Configuring and customizing subgraphs using The Graph protocol required a lot of time to go through the docs and understanding them .
