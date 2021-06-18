pragma solidity ^0.5.0;

import "./DaiToken.sol";
import "./DAppToken.sol";

/* Naming: "Farm" because of Term "Yield Farming" */
contract TokenFarm {
    string public name = "DApp Token Farm";
    address public deployer;
    DAppToken public dAppToken;
    DaiToken public daiToken;

    /* Staking Balance for each Investor */
    mapping(address => uint) public stakingBalance;
    /* Indicator if Investor has staked */
    mapping(address => bool) public hasStaked;
    /* Indicator if Investor is staking */
    mapping(address => bool) public isStaking;

    /* All Investors who ever has staked in these Smart Contract */
    address[] public stakingInvestors;

    /*
     Convention:
       - Local Variable (like Arguments that are passed) have an Underscore
       - State Variable (like Variables in a Function) have no Underscore
    */
    constructor(DaiToken _daiToken, DAppToken _dAppToken) public {
        /* Smart Contract DAppToken and DaiToken have to been deployed before deploying these Smart Contract */
        daiToken = _daiToken;
        dAppToken = _dAppToken;
        deployer = msg.sender;
    }

    /* Staking / Depositing Tokens */
    function stakeTokens(uint _amount) public {
        /* Requirement: Amount greater than 0*/
        require(_amount > 0, "Amount cannot be 0");
        address investor = msg.sender;
        /* Transferring Mock DAI Tokens from Investor to this Smart Contract for Staking */
        daiToken.transferFrom(investor, address(this), _amount);
        /* Updating the Staking Balance of these Investor */
        stakingBalance[investor] += _amount;
        /* Checking if Investor is not already inside the List of Investors */
        if (!hasStaked[investor]) {
            /* Add Investor into List of Investors who ever have staked into these Smart Contract */
            stakingInvestors.push(investor);
        }
        /* Set Indicator that Investor is staking into these Smart Contract */
        isStaking[investor] = true;
        /* Set Indicator that Investor has staked into these Smart Contract */
        hasStaked[investor] = true;
    }

    /* Issuing Tokens */
    function issueTokens() public {
        /* Requirement: Only Deployer of these Smart Contract can issue Tokens */
        require(msg.sender == deployer, "Caller must be the Deployer");

        /* Getting each Investor in these Smart Contract */
        for (uint i = 0; i < stakingInvestors.length; i++) {
            address recipient = stakingInvestors[i];
            /* A One-to-One Converting from Mock DAI Token to DApp Token */
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                /* Transferring the Investor the same Amount of DApp Token as he invested in Mock DAI Token */
                dAppToken.transfer(recipient, balance);
            }
        }
    }

    /* Un-staking / withdrawing Tokens */
    function unstakeTokens() public {
        address investor = msg.sender;
        /* Fetching Staking Balance from Investor */
        uint balance = stakingBalance[investor];

        /* Requirement: Amount has to be greater than 0 */
        require(balance > 0, "Staking Balance cannot be 0");

        /* Transferring Mock DAI Tokens to this Smart Contract for Staking */
        daiToken.transfer(investor, balance);

        /* Resetting the Staking Balance */
        stakingBalance[investor] = 0;

        /* Updating the Staking Status */
        isStaking[investor] = false;
    }

}
