const TokenFarm = artifacts.require("TokenFarm");

/* Script to spent all Investor their Amount of DApp */
/* The Amount of DApp corresponding to the Amount the Investors have spent into the Smart Contract */
/* The Calculation of Dapp Tokens is a One-to-One Mapping */
module.exports = async function (callback) {
    let tokenFarm = await TokenFarm.deployed();
    await tokenFarm.issueTokens();
    console.log("Tokens issued");
};
