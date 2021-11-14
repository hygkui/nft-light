const { expect } = require('chai')
// const { ethers } = require('hardhat') 如果提示ethers为定义， 则加上

describe('token contract', function () {
  it('should assign the total supply of tokens to the contract owner', async () => {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("ZLight");

    const HHToken = await Token.deploy()
    const ownerBalance = await HHToken.balanceOf(owner.address);

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