require('babel-register');
require('babel-polyfill');

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
    },
    /* Changed Directories of Smart Contract Assets so React can interact with these in Folder /src */
    /* Cause the App.js File need References of these Smart Contract Assets */
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            evmVersion: "petersburg"
        }
    }
}
