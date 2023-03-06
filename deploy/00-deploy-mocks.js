const { network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.0005"); // 0.0005 is the premium. It costs 0.0005 LINK to request
const GAS_PRISE_LINK = 1e9; // 1000000000

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [BASE_FEE, GAS_PRISE_LINK];

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocs...");
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        });
        log("Mocs deployed!");
        log("-------------------------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];
