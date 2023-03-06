require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const FANTOM_RPC_URL = process.env.FANTOM_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const FTMSCAN_API_KEY = process.env.FTMSCAN_API_KEY;

module.exports = {
    solidity: "0.8.8",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        ftmTestnet: {
            chainId: 4002,
            blockConfirmations: 6,
            url: FANTOM_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            ftmTestnet: FTMSCAN_API_KEY,
        },
        customChains: [
            {
                network: "ftmTestnet",
                chainId: 4002,
                urls: {
                    apiURL: "https://api-testnet.ftmscan.com/api",
                    browserURL: "https://testnet.ftmscan.com/",
                },
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    mocha: {
        timeout: 300000,
    },
};
