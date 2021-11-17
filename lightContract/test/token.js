const { expect } = require('chai')
// const { ethers } = require('hardhat') 如果提示ethers为定义， 则加上

describe('token contract', function () {
  it('should assign the total supply of tokens to the contract owner', async () => {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("tLight");

    const HHToken = await Token.deploy()
    const ownerBalance = await HHToken.balanceOf(owner.address);
    console.log('ownerBalance :>> ', ownerBalance);
    expect(await HHToken.totalSupply()).to.equal(ownerBalance);
  })
})

// describe("transactions", () => {
//   it("should transfer between two accounts", async () => {
//     const [owner, addr1, addr2] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("ZLight");

//     const HHToken = await Token.deploy()

//     await HHToken.transfer(addr1.address, 50);
//     expect(await HHToken.balanceOf(addr1.address)).to.equal(50);
    
//     // Transfer 50 tokens from addr1 to addr2
//     await HHToken.connect(addr1).transfer(addr2.address, 50);
//     expect(await HHToken.balanceOf(addr2.address)).to.equal(50);
 
//   })
// })

describe('token deploy then reverse mint', function () {
  it('should deploy and mint', async () => {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("tLight");
    const ZLightToken = await Token.deploy();
    expect(await ZLightToken.RESERVE_AMOUNT()).to.equal(3);
    expect(await ZLightToken.balanceOf(owner.address)).to.equal(3);
    expect(await ZLightToken.totalSupply()).to.equal(3)
  })
})


describe('token mint', function () {
  it('should mint', async () => {
    const [owner, addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("tLight");
    const ZLightToken = await Token.deploy();
    const pricePerToken = await ZLightToken.PRICE_PER_TOKEN()
    await ZLightToken.setSaleState(true);
    const mintAmount = 10
    await ZLightToken.connect(addr1).mint(mintAmount, {
      value: pricePerToken.mul(mintAmount),
    })
    expect(await ZLightToken.balanceOf(addr1.address)).to.equal(mintAmount);
  })
})