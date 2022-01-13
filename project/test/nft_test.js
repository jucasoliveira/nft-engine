const facesNFT = artifacts.require('facesNFT');
const facesNFTMarket = artifacts.require('facesNFTMarket');
const web3 = require('web3');
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
describe('NFTMarket', function () {
  it('should mint ', async function () {
    const market = await facesNFTMarket.deployed();
    const marketAddress = market.address;

    let nft = await facesNFT.deployed();
    let nftContractAddress = nft.address;
    assert.isTrue(true);

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = web3.utils.toWei('0.25', 'ether');

    /* create two tokens */

    await nft.mintItem('https://www.anewtokenarrived.com');
    await nft.mintItem('https://www.anewtokenarrived2.com');

    /* query for and return the unsold items */
    let items = await nft.fetchMyNFTs();

    console.log('items: ', items);
  });
});
