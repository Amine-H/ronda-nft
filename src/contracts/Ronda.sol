// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ronda is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 private constant MAX_TOKENS = 111;
    uint256 private mintPrice = 30000000 gwei; //0.03 Ether

    struct Metadata {
        uint8 _type;
        uint8 _number;
    }

    mapping(uint256 => Metadata) token_metadata;

    string private _currentBaseURI;

    constructor() ERC721("Ronda", "RNDA") {
        setBaseURI("http://localhost:8080/opensea/token/");
        mint();
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _currentBaseURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _currentBaseURI = baseURI;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function publicMint(uint256 _amount) public payable {
        uint256 _supply = totalSupply();
        require(_amount > 0, "Must mint at least 1");
        require(
            _supply + _amount <= MAX_TOKENS,
            "Exceeds maximum token supply."
        );
        require(
            msg.value >= mintPrice * _amount,
            "Ether sent is not correct for token price."
        );

        for (uint256 i; i < _amount; i++) {
            mint();
        }
    }

    function get(uint256 tokenId)
        external
        view
        returns (uint8 _type, uint8 _number)
    {
        require(_exists(tokenId), "token not minted");
        Metadata memory token = token_metadata[tokenId];
        _type = token._type;
        _number = token._number;
    }

    function mint() internal {
        uint256 _tokenId = totalSupply() + 1;
        uint8 _type = random(0, 4);
        uint8 _number = random(0, 9);
        token_metadata[_tokenId] = Metadata(_type, _number);
        _safeMint(msg.sender, _tokenId);
        _tokenIdCounter.increment();
    }

    function random(uint8 min, uint8 max) internal view returns (uint8) {
        return
            uint8(
                (uint256(
                    keccak256(abi.encodePacked(block.timestamp, msg.sender))
                ) % max) + min
            );
    }
}
