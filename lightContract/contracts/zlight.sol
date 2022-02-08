// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract tLight is ERC721, ERC721Enumerable, Ownable {
    using Address for address;
    bool public saleIsActive = false; // 公开销售状态
    string private _baseURIextended;

    uint256 public constant MAX_SUPPLY = 50;
    uint256 public constant MAX_PUBLIC_MINT = 47;
    uint256 public constant PRICE_PER_TOKEN = 0.4 ether;
    uint256 public constant RESERVE_AMOUNT = 3;


    mapping(uint256 => address) private _owners; // nft owners

    bool public isAllowListActive = false; // 白名单预售状态
    mapping(address => uint8) private _allowList; // 白名单

    constructor() ERC721("tLight", "tLLT") {
      reserveMint(RESERVE_AMOUNT); // 部署时直接预挖
    }
  
    function ownerOfTokens(uint256 tokenId) public view returns(address) {
        return _owners[tokenId];
    }

    // 切换白名单状态
    function setIsAllowListActive(bool _isAllowListActive) external onlyOwner {
      isAllowListActive = _isAllowListActive;
    }

    // 添加白名单的地址列表，允许mint的数量限制
    function setAllowList(address[] calldata addresses, uint8 numAllowedToMint) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            _allowList[addresses[i]] = numAllowedToMint;
        }
    }

    // 查询钱包地址可以mint的数量（为0即不在白名单）
    function numAvailableToMint(address addr) external view returns (uint8) {
        return _allowList[addr];
    }

    // 白名单mint
    function mintAllowList(uint8 numberOfTokens) external payable {
        uint256 ts = totalSupply();
        require(isAllowListActive, "Allow list is not active");
        require(numberOfTokens <= _allowList[msg.sender], "Exceeded max available to purchase");
        require(ts + numberOfTokens <= MAX_SUPPLY, "Purchase would exceed max tokens");
        require(PRICE_PER_TOKEN * numberOfTokens <= msg.value, "Ether value sent is not correct");

        _allowList[msg.sender] -= numberOfTokens;
        for (uint256 i = 0; i < numberOfTokens; i++) {
            _safeMint(msg.sender, ts + i);
        }
    }

    // 是否已经被mint
    function exists(uint256 tokenId) public view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        require(address(0) == from || _owners[tokenId] == from, "contract owner or have the token ");
        super._beforeTokenTransfer(from, to, tokenId);
        _owners[tokenId] = to;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function reserveMint(uint256 _amount) public onlyOwner {
      uint256[] memory tokenIds = getRandomNumbers(_amount);
      for (uint256 i = 0; i < _amount; i++) {
        uint256 tokenId = tokenIds[i];
        _owners[tokenId] = msg.sender;
        _safeMint(msg.sender, tokenId);
      }
    }

    /**
      是否销售的开关
     */
    function setSaleState(bool newState) public onlyOwner {
        saleIsActive = newState;
    }

    function mint(uint256 _amount) external payable {
        uint256 ts = totalSupply();
        require(saleIsActive, "Sale must be active to mint tokens");
        require(_amount <= MAX_PUBLIC_MINT, "Exceeded max token purchase");
        require(ts + _amount <= MAX_SUPPLY, "Purchase would exceed max tokens");
        require(PRICE_PER_TOKEN * _amount <= msg.value, "Ether value sent is not correct");

        uint256[] memory tokenIds = getRandomNumbers(_amount);
        for (uint256 i = 0; i < _amount; i++) {
          uint256 tokenId = tokenIds[i];
          _owners[tokenId] = msg.sender;
          _safeMint(msg.sender, tokenId);
        }
    }

    function getRandomNumbers(uint256 _amount) public view virtual returns (uint256[] memory) {
      uint256[] memory tokenIds = new uint256[](_amount);
      uint256 initRand = 0;
      uint256 each = 0;
      bytes32 bHash = blockhash(block.number - 1);

      while(initRand != _amount){
          uint256 randomNumber = uint256(
              uint256(
                  keccak256(
                      abi.encodePacked(
                          block.timestamp, 
                          bHash, 
                          _msgSender(), 
                          each
                      )
                  )
              ) % MAX_SUPPLY
          );
          bool inArray;
          for(uint256 i = 0; i<initRand; i++){
              if(randomNumber == tokenIds[i]){
                  inArray = true;
              }
          }
          if(!exists(randomNumber) && !inArray){
              tokenIds[initRand] = randomNumber;
              initRand += 1;
          }
          each += 1;
        }
      return tokenIds;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}