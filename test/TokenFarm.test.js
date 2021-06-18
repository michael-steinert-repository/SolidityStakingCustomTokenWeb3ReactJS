const TokenFarm = artifacts.require("TokenFarm");
const DaiToken = artifacts.require("DaiToken");
const DAppToken = artifacts.require("DAppToken");

require("chai")
    .use(require("chai-as-promised"))
    .should();

/*
    Destructuring the passed Variable accounts into Deployer and Investor
    contract("TokenFarm", (accounts) => {})
    [deployer, investor] = accounts
    accounts[0] is assign to deployer
    accounts[1] is assign to investor
*/
contract("TokenFarm", ([deployer, investor]) => {
    let daiToken, dAppToken, tokenFarm;

    before(async () => {
        /* Loading Smart Contracts */
        daiToken = await DaiToken.new();
        dAppToken = await DAppToken.new();
        /* Passing the Addresses from the Smart Contracts DaiToken and DAppToken as Arguments to the Constructor of Smart Contract TokenFarm */
        tokenFarm = await TokenFarm.new(daiToken.address, dAppToken.address);

        /* Transferring all (1 Million) DApp Tokens to the Smart Contract TokenFarm */
        /* 1 000 000 * 10^18 = 1 000 000 000 000 000 000 000 000 */
        await dAppToken.transfer(tokenFarm.address, web3.utils.toWei("1000000", "Ether"));

        /* Transferring 100 Mock DAI Tokens to an Investor - accounts[1] */
        /* 100  * 10^18 = 100 000 000 000 000 000 000 */
        /* {from: deployer} is the Function Meta Data which is calling the Function who is calling it */
        /* So deployer is calling the Function transfer(to, amount) */
        await daiToken.transfer(investor, web3.utils.toWei("100", "Ether"), {from: deployer});
    });

    /* Testing Mock DAI Token - Smart Contract */
    describe("Mock DAI Token Deployment", async () => {
        it("Has a Name", async () => {
            const name = await daiToken.name();
            assert.equal(name, "Mock DAI Token");
        });
    });

    /* Testing DApp Token - Smart Contract */
    describe("DApp Token Deployment", async () => {
        it("Has a Name", async () => {
            const name = await dAppToken.name();
            assert.equal(name, "DApp Token");
        });
    });

    /* Testing Token Farm - Smart Contract */
    describe("Token Farm Deployment", async () => {
        it("Has a Name", async () => {
            const name = await tokenFarm.name();
            assert.equal(name, "DApp Token Farm");
        });
        it("Smart Contract TokenFarm has Tokens", async () => {
            /* Getting the Balance of Mapping inside the Smart Contract DAppToken */
            const balance = await dAppToken.balanceOf(tokenFarm.address);
            assert.equal(balance, web3.utils.toWei("1000000", "Ether"));
        });
    });

    /* Testing farming Tokens */
    describe("Farming Tokens", async () => {
        it("Rewards Investors for staking mDai Tokens", async () => {
            let result;
            /* Checking Investor Balance before Staking */
            result = await daiToken.balanceOf(investor);
            assert.equal(result, web3.utils.toWei("100", "Ether"), "Investor Mock DAI Wallet Balance is correct before Staking");

            /* Approving the Mock DAI Token before it is Staking */
            await daiToken.approve(tokenFarm.address, web3.utils.toWei("42", "Ether"), {from: investor});

            /* Staking Mock DAI Tokens */
            await tokenFarm.stakeTokens(web3.utils.toWei("42", "Ether"), {from: investor});

            /* Checking Staking Result */
            result = await daiToken.balanceOf(investor);
            assert.equal(result, web3.utils.toWei("58", "Ether"), "Investor Mock DAI Wallet Balance is correct after Staking");

            /* Checking Staking Balance of Smart Contract TokenFarm */
            result = await daiToken.balanceOf(tokenFarm.address);
            assert.equal(result, web3.utils.toWei("42", "Ether"), "Mock DAI Balance inside Smart Contract is correct after Staking");

            /* Checking Staking Balance of Investor inside Smart Contract TokenFarm */
            result = await tokenFarm.stakingBalance(investor);
            assert.equal(result, web3.utils.toWei("42", "Ether"), "Investor Staking Balance is correct after Staking");

            /* Checking Status of Investor inside Smart Contract TokenFarm */
            result = await tokenFarm.isStaking(investor);
            assert.equal(result, true, "Investor Staking Status is correct after Staking");

            /* Issuing Tokens */
            await tokenFarm.issueTokens({from: deployer});
            /*Checking Balance after Issuance */
            result = await dAppToken.balanceOf(investor);
            assert.equal(result, web3.utils.toWei("42", "Ether"), "Investor DApp Token Wallet Balance is correct after Issuance");
            /* Ensuring that only the Deployer can issue Tokens */
            await tokenFarm.issueTokens({from: investor}).should.be.rejected;

            /* Un-staking Tokens */
            await tokenFarm.unstakeTokens({from: investor});
            /* Checking if Investor get his Tokens back after un-staking */
            result = await daiToken.balanceOf(investor);
            assert.equal(result, web3.utils.toWei("100", "Ether"), "Investor Mock DAI Wallet Balance is correct after Un-staking");
            /* Checking Balance of Smart Contract Token Farm is empty after un-staking */
            result = await daiToken.balanceOf(tokenFarm.address);
            assert.equal(result, web3.utils.toWei("0", "Ether"), "Token Farm Mock DAI Token Balance is correct after Un-Stacking");
            /* Checking if Investor Staking Balance is empty after un-staking */
            result = await tokenFarm.stakingBalance(investor);
            assert.equal(result, web3.utils.toWei("0", "Ether"), "Investor Staking Balance is correct after Un-Staking");
            /* Checking that Investor Status is false after un-staking */
            result = await tokenFarm.isStaking(investor);
            assert.equal(result, false, "Investor Staking Status is correct after Un-Staking");
        });
    });
});