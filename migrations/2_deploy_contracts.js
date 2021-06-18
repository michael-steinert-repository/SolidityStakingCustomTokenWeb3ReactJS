const TokenFarm = artifacts.require("TokenFarm");
const DaiToken = artifacts.require("DaiToken");
const DAppToken = artifacts.require("DAppToken");

/*
    Deployer: Person who deployed the Smart Contracts => accounts[0]
    Network: Current Network where these Smart Contracts are deployed
    Accounts: ALl Accounts from these current Network
*/
module.exports = async function (deployer, network, accounts) {
    /* First deploying the Mock DAI Token - Smart Contract */
    await deployer.deploy(DaiToken);
    const daiToken = await DaiToken.deployed();

    /* Second deploying the DApp Token - Smart Contract */
    await deployer.deploy(DAppToken);
    const dAppToken = await DAppToken.deployed();

    /* Last will be th Token Farm Smart Contract deployed */
    /* Passing the Addresses from the Smart Contracts DaiToken and DAppToken as Arguments to the Constructor of Smart Contract TokenFarm */
    await deployer.deploy(TokenFarm, daiToken.address, dAppToken.address);
    const tokenFarm = await TokenFarm.deployed();

    /* Transferring all (1 Million) DApp Tokens to the Smart Contract TokenFarm */
    /* 1 000 000 * 10^18 = 1 000 000 000 000 000 000 000 000 */
    await dAppToken.transfer(tokenFarm.address, web3.utils.toWei("1000000", "Ether"));

    /* Transferring 100 Mock DAI Tokens to an Investor */
    /* 100  * 10^18 = 100 000 000 000 000 000 000 */
    await daiToken.transfer(accounts[1], web3.utils.toWei("100", "Ether"));
};
