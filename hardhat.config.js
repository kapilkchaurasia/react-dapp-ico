require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/tPyh1sU0YZ0jKe7s4rPWJgtPXGnH2h7h`,
      accounts: [`e67d7b48eb280d4dd090d2d23d0bafedf16129c70b025f2a8b56a988e0b27764`],
      gas: 2700000000,
      maxFeePerGas: 30000000000,
    }
  }
};
