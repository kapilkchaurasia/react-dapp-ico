const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Randall Coin", function () {
    it("test mint function", async function () {
        const RandallCoin = await ethers.getContractFactory("RandallCoin");
        const randallCoin = await RandallCoin.deploy();
        await randallCoin.deployed();
        await randallCoin.mine({value:1e15});
        let mintedTillNow = await randallCoin.mintedTillNow();
        expect(mintedTillNow).to.equal("1000000001000000000");
    });
});