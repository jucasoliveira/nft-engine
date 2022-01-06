// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ER721, Ownable {
    address payable public _owner;
    mapping(uint256 => bol) public sold;
    mapping(uint256 => uint256) public prices;

    event Purchase(address owner, uint256 id, uint256 price, string uri);

    constructor() ERC721("NFT EXAMPLE", "NFT") {
        _owner = msg.sender;
    }

    function mint(string memory _tokenURI, uint256 _price)
        public
        onlyOwner
        returns (bool)
    {
        uint256 _tokenId = totalSupply() + 1;
        price[_tokenId] = _price;

        _mint(address(this), _tokenId);
        _setTokenURI(_tokenId, _tokenURI);

        return true;
    }

    function buy(uint256 _id) external payable {
        _validate(_id);
        _trade(_id);

        emit Purchase(msg.sender, price[_id], _id, tokenURI(_id));
    }

    function _validate(uint256 _id) private returns (bool) {
        require(_exists(_id), "Token does not exist");
        require(!sold[_id], "Token already sold");
        require(msg.value >= price[_id], "Not enough ETH");
        require(prices[_id] <= msg.value, "Price too high");
    }

    function _trade(uint256 _id) private {
        _transfer(address(this), msg.sender, _id);
        _owner.transfer(msg.value);
        sold[_id] = true;
    }
}
