# facesNFT
A node.js nft generador
<p align="center">
  <img src="https://user-images.githubusercontent.com/11979969/148960820-6f3dafc8-49c8-4dc1-aeeb-888bc49e8177.gif" />
</p>

note: The SVG images of this project is for STUDY only and not meant to become an actual NFT, I recommend using your own SVG images to create your own live project.

### The project layout:

![Nextjs_nft](https://user-images.githubusercontent.com/11979969/148957896-dd3c7c0d-751b-4061-9e19-9ff079412bd3.jpeg)


### What the project do

#### The App consists in 2 parts:

#### Part 1 - The front end.

- First, we generate random images using a pack of `SVG's`, where it returns the image, as well its properties.
- We wrap these images on the `front end` and create the marketplace, so the user can choose an `NFT` to mint.
- While on the `front-end`, the application call `metamask` and check for the wallet.
- When the user goes to the mint page and select minting the app does 3 things :
  - Upload the image to `ipfs` network and return its hash key
  - Add the rash key with the properties to create the `metadata`, and upload the metadata to the `IPFS`, returning a new hash key
  - Use web3 to connect to the `smart contract` deployed on the network
  - Call the `smart contract` function to mint, reducing the amount of `ETH` from the `metamask` wallet and creating a new `NFT`.
- Users get their `nft` recorded onto their wallet account on the network connection.

Part 2 - The smart contract.
- We write a smart contract in solidity.
- We use truffle to compile and migrate 
- The contract is deployed onto the network, in this case, we're using Ganache

### Project progress:

- [x] Generate Random `images`
- [ ] Improve front-end
- [x] Upload to `IPFS`
- [ ] Create `metadata`
- [x] Connect to `MetaMask`
- [x] Deploy `smart contract`
- [ ] Mint `metadata`

# Quick start

Go to poject directory
```bash
cd ./project
```

Install dependencies

```bash
yarn
```
or 
```bash
npm install
```

## Run development

```bash
yarn dev
```
or
```bash
npm run dev
```

Project might appear on your localhost : http://localhost:3000

<img width="1354" alt="Screenshot 2022-01-10 at 12 34 11" src="https://user-images.githubusercontent.com/11979969/148768699-ebaa6345-b59a-4c90-ad37-83352eef3466.png">

## Using Ganache accounts with Metamask

Truffle has a cute Pet Shop Tutorial, but a little extra work has to be done to use Ganache with Metamask.

This assumes you have installed Ganache and Metamask.

Ganache gives you 10 test accounts with 100.0 ETH each. What you’ll want to do is import an account from Ganache into Metamask to get access to one of those test accounts.

#### Metamask - edit your network
Open Metamask. You may need to either create or edit your network. If you have a local host network, you can edit the dropdown fields. If you don’t have one or want to use a different one, you can create a new one. See below for the values that you need to enter and where to find them.

Create a network name, for example here it is: localhost 8545. (You can change the network name to suit your preference).
<img width="239" alt="metamask-network" src="https://user-images.githubusercontent.com/11979969/148996429-fb1984bf-f0ca-4cc1-81d3-cd46acfd696f.png">

Then, type in a url in the “New RPC URL” field. For example, my Ganache RPC server is running on http://127.0.0.1:8545. You can check your RPC server address if you are not sure by opening up the Ganache UI and copying the address you find under “RPC Server.” You also need to enter a chain ID into Metamask. My Ganache UI says my “Network ID” is 1337. This value is what you use for the Metamask “Chain ID.”

<img width="720" alt="ganache-gui" src="https://user-images.githubusercontent.com/11979969/148996534-d537759d-1925-4e75-ba57-251c95486b4f.png">


#### Ganache - find your private key
Next, you’ll need to find your private key so you can import your test account into Metamask. For example, if you open up the Ganache UI, you will find a list of your addresses with balances. To the far right of each is a key symbol. Choose an account, and click on the key symbol. It will display your ACCOUNT ADDRESS and PRIVATE KEY. Copy your private key to your clipboard since you will need it for Metamask.

<img width="1179" alt="ganache-address" src="https://user-images.githubusercontent.com/11979969/148996575-75dccf1d-418d-4440-9e1b-88b34d80f633.png">
s

#### Metamask - import private key
Next, open up Metamask. Find the option “Import Account.” Click it and you will be asked for your private key. Paste the private key from the previous step into the field, then click “Import.”

<img width="215" alt="metamask-import" src="https://user-images.githubusercontent.com/11979969/148996622-24772c1a-7cb2-4c60-ab6a-ce810667e591.png">


#### Metamask - check balance
Congratulations! When you’re done, you should have the ETH in your account.

<img width="229" alt="metamask-account-balance" src="https://user-images.githubusercontent.com/11979969/148996684-a382d8df-6c9a-4c39-93f4-9cb4f754c92a.png">


## Upload to IPFS (blocked)

## Deploy Smart Contract (blocked)
