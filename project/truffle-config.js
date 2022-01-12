// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  contracts_directory: './contracts',
  contracts_build_directory: './build/contracts',
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.10', // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: false,
        runs: 200,
      },
      evmVersion: 'petersburg',
    },
  },
};
