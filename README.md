# Solidity Staking Custom Coin Web3.js ReactJS

## Application Business Rules

![Smart Contract Overview](https://user-images.githubusercontent.com/29623199/122539231-aa09c100-d027-11eb-9f99-95cf4d2f4671.JPG)

## Staking

* "Staking" means that Crypto Assets are kept (locked) in a Proof-of-Stake Blockchain for a certain period of Time
* These locked Crypto Assets are then used to build the Consensus needed to secure the Network and ensure the Validity
  of each new Transaction to be persited in the Blockchain
* Those who stake their coins in a PoS Blockchain are called "Validators"
* For staking Assets and providing Services to the blockchain, Validators are rewarded with new Coins from these Network - Blockchain
* "Staking" is also known as Yield Farming or Liquidity Mining

## DAI Token

* DAI is a Stable-Coin Crypto Currency which aims to keep its Value as close to one United States dollar (USD) as possible through Smart Contracts on the Ethereum Blockchain

## Commands

| Command | Description |
| --- | --- |
| Truffle | |
| truffle migrate | Running the Migrate Script and deploy the Smart Contract to the Blockchain |
| truffle migrate | Running the Migrate Script and deploy a new Smart Contract to the Blockchain |
| truffle console | Running a JavaScript Runtime Environment that can interact with the Blockchain |
| truffle test | Running Test to check the Smart Contract |
| truffle networks | Listing all Addresses of deployed Smart Contract |
| truffle exec scripts/issue-tokens.js | Executing the Script in scripts/issue-tokens.js |
| Truffle Console | |
| mDai = await DaiToken.deployed() | Getting the deployed Smart Contract as JavaScript Version |
| accounts = await web3.eth.getAccounts() | Getting all Accounts from current Network |
| balance = await mDai.balanceOf(accounts[1]) | Getting Balance of the second Account - Investor in the Network (Balance was given by Migration Script) |
| web3.utils.fromWei(balance.toString()) | Showing the balance of the Investor as Mock DAI - Ether |

## Dependencies

* Node.js: It allows to install all Dependencies and run the Client-side Application
* Truffle Framework: A Framework for Creating Ethereum Smart Contracts. It allows creating, testing and deploying Smart
  Contracts on a Blockchain
* Ganache: It provides a locally Blockchain for Testing Purpose
* MetaMask: A Browser Extension to connect with the Blockchain. It contains the Wallet for Ethereum
* Web3.js: Connect the Application (Browser with MetaMask Extension) to the Blockchain based Website

### Update Dependencies (Node.js Modules)

* npm install -g npm-check-updates: Installing the Node.js-Check-Updates Module
* ncu –u: This will update the package.json File as the latest Versions available in npm Repositories on Web
* npm install: This will update the local node_modules Repository with the Versions present in package.json
* npm install --package-lock-only: This will update the Versions present in package-lock.json

## Solidity
### Events
* Events causes the Arguments to be stored in the Log of the Transaction
* The Log of the Transaction exists as long as the Block in the Blockchain exists (in Theory forever)
* Evetns log Changes into the Blockchain and make it true forever

### Address
* Every Account and Smart Contract has an Address
* It is used to send and receive Ether from one Account to another

### Mapping
* Data Type used to store Associations that allow to get a Value for a corresponding Key

### Require
* Convenience Function that guarantees Vailidity of Conditions that cannot be detected before Execution

### Struct
* Struct Types are used to represent a Record and allow to create own Data Types

### Enum
* Enums restrict a Variable to have on of predefined Values
