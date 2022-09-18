const defaultChainId = 4;

const supportedNetworks: any = {
  // npx hardhat node
  // npx hardhat run scripts/deployForHardhat.js --network localhost
  // Copy console address
  31337: {
    name: "Hardhat",
    tokenSymbol: "ETH",
    rpcURL: "http://localhost:8545",
    address: "0x09635F643e140090A9A8Dcd712eD6285858ceBef",
    blockExplorer: "http://localhost:8545/address",
  },
  // npx hardhat run scripts/deployForTestnet.js --network mumbai
  // Returned address is wrong. https://github.com/nomiclabs/hardhat/issues/2162.
  // Search your deployer address on polygonscan. Get contract from there
  80001: {
    name: "Mumbai",
    tokenSymbol: "MATIC",
    rpcURL: "https://rpc-mumbai.maticvigil.com",
    address: "0x013f4174d3A1118933C54930b48607507Aebc15B",
    blockExplorer: "https://mumbai.polygonscan.com/address",
  },
  // npx hardhat run scripts/deployForTestnet.js --network rinkeby
  // Copy console address
  4: {
    name: "Rinkeby",
    tokenSymbol: "ETH",
    rpcURL: "https://rinkeby-light.eth.linkpool.io/",
    address: "0xD2c12c40B408F8472FE0A063F9776108A7C1df16",
    blockExplorer: "https://rinkeby.etherscan.io/address",
  },
};

export { defaultChainId, supportedNetworks };
