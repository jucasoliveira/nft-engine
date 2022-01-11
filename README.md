# facesNFT
A node.js nft generador

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



## Upload to IPFS (blocked)

## Deploy Smart Contract (blocked)
