// contracts/nft.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract facesNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address contractAddress;

  constructor(address marketplaceAddress) ERC721('facesNFT', 'FCS') {
    contractAddress = marketplaceAddress;
  }

  struct NFTItem {
    uint256 itemId;
    address nftContract;
    address payable owner;
    string tokenURI;
  }

  mapping(uint256 => NFTItem) private idToNFTItem;

  event NFTItemCreated(
    uint256 indexed itemId,
    address indexed nftContract,
    address owner,
    string tokenURI
  );

  function mintItem(string memory tokenURI) public {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    idToNFTItem[newItemId] = NFTItem(
      newItemId,
      contractAddress,
      payable(msg.sender),
      tokenURI
    );
    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    setApprovalForAll(contractAddress, true);
    emit NFTItemCreated(newItemId, contractAddress, msg.sender, tokenURI);
  }

  /* Returns only items that a user has minted */
  function fetchMyNFTs() public view returns (NFTItem[] memory) {
    uint256 totalItemCount = _tokenIds.current();
    uint256 itemCount = 0;
    uint256 currentIndex = 0;

    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToNFTItem[i + 1].owner == msg.sender) {
        itemCount += 1;
      }
    }

    NFTItem[] memory items = new NFTItem[](itemCount);
    for (uint256 i = 0; i < totalItemCount; i++) {
      if (idToNFTItem[i + 1].owner == msg.sender) {
        uint256 currentId = i + 1;
        NFTItem storage currentItem = idToNFTItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
}
