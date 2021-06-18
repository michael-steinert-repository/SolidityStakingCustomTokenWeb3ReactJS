import DaiToken from '../abis/DaiToken.json';
import DAppToken from '../abis/DAppToken.json';
import TokenFarm from '../abis/TokenFarm.json';
import React, {Component} from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Web3 from 'web3';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            daiToken: {},
            dAppToken: {},
            tokenFarm: {},
            daiTokenBalance: '0',
            dAppTokenBalance: '0',
            /* How much Crypto an Investor deposited in these Smart Contract */
            stakingBalance: '0',
            loading: true,
        };
    }

    /* Lifecycle Function from ReactJs which will executed when the Component is mounted into the Application */

    /* It is called before the Function render() is executed */
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    /*
    Two Step Process:
        1) MetaMask connects the Browser to the Blockchain
        2) Web3 connects the Application to the Blockchain
    */
    /* Connecting the Browser with MetaMask Extension to the Blockchain based Website */
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum Browser detected. You should using the MetaMask Extension');
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({
            account: accounts[0]
        });

        /* Getting the connected Network from the Wallet */
        const networkId = await web3.eth.net.getId();

        /* Loading Smart Contract DAI Token */
        /* Getting the Network Data from the ABI */
        const daiTokenNetworkData = DaiToken.networks[networkId];
        /* Checking if Network exists */
        if (daiTokenNetworkData) {
            /* Updating the State */
            this.setState({
                loading: true
            });
            /* JavaScript Versions of the Smart Contracts */
            /* Web3 needs the ABI and Address of this Smart Contract to build a JavaScript Version of it */
            const daiToken = new web3.eth.Contract(DaiToken.abi, DaiToken.networks[networkId].address);
            /* The Method call() is necessary if Data is read from the Blockchain - to write Data into the Blockchain the Method send() is necessary */
            let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call();
            /* Updating the State */
            this.setState({
                daiToken: daiToken,
                daiTokenBalance: daiTokenBalance.toString(),
                loading: false
            });
        } else {
            window.alert('Smart Contract Mock DAI Token is not deployed to the detected Network');
        }

        /* Loading Smart Contract DApp Token */
        /* Getting the Network Data from the ABI */
        const dAppTokenNetworkData = DAppToken.networks[networkId];
        /* Checking if Network exists */
        if (dAppTokenNetworkData) {
            /* Updating the State */
            this.setState({
                loading: true
            });
            /* JavaScript Versions of the Smart Contracts */
            /* Web3 needs the ABI and Address of this Smart Contract to build a JavaScript Version of it */
            const dAppToken = new web3.eth.Contract(DAppToken.abi, DAppToken.networks[networkId].address);
            /* The Method call() is necessary if Data is read from the Blockchain - to write Data into the Blockchain the Method send() is necessary */
            let dAppTokenBalance = await dAppToken.methods.balanceOf(this.state.account).call();
            /* Updating the State */
            this.setState({
                dAppToken: dAppToken,
                dAppTokenBalance: dAppTokenBalance.toString(),
                loading: false
            });
        } else {
            window.alert('Smart Contract DApp Token is not deployed to the detected Network');
        }

        /* Loading Smart Contract Token Farm */
        /* Getting the Network Data from the ABI */
        const tokenFarmNetworkData = TokenFarm.networks[networkId];
        /* Checking if Network exists */
        if (tokenFarmNetworkData) {
            /* Updating the State */
            this.setState({
                loading: true
            });
            /* JavaScript Versions of the Smart Contracts */
            /* Web3 needs the ABI and Address of this Smart Contract to build a JavaScript Version of it */
            const tokenFarm = new web3.eth.Contract(TokenFarm.abi, TokenFarm.networks[networkId].address);
            /* The Method call() is necessary if Data is read from the Blockchain - to write Data into the Blockchain the Method send() is necessary */
            let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call();
            /* Updating the State */
            this.setState({
                tokenFarm: tokenFarm,
                stakingBalance: stakingBalance.toString(),
                loading: false
            });
        } else {
            window.alert('Smart Contract Token Farm is not deployed to the detected Network');
        }
    }

    stakeTokens = (amount) => {
        this.setState({
            loading: true
        });
        /*
        Two Step Process:
             1) Approving the Tokens so they can be spent - first Transaction
             2) Staking the Tokens to the Smart Contract Token Farm - second Transaction
        */
        /* The Method send() is necessary if Data is write into the Blockchain */
        this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.state.tokenFarm.methods.stakeTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
                this.setState({
                    loading: false
                });
            });
        });
    }

    unStakeTokens = (amount) => {
        this.setState({
            loading: true
        });
        /* Un-staking the Tokens from the Smart Contract Token Farm - send Transaction */
        this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                {this.state.loading
                    ? <div id="loader" className="text-center mt-5"><p>Loading Website</p></div>
                    : <Main
                        daiTokenBalance={this.state.daiTokenBalance}
                        dAppTokenBalance={this.state.dAppTokenBalance}
                        stakingBalance={this.state.stakingBalance}
                        stakeTokens={this.stakeTokens}
                        unStakeTokens={this.unStakeTokens}
                    />
                }
            </div>
        );
    }
}

export default App;
