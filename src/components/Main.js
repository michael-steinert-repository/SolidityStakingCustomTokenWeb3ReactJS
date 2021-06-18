import React, {Component} from 'react';
import dai from '../dai.png';

class Main extends Component {
    render() {
        return (
            <div className="container-fluid mt-5 text-center">
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '1024px'}}>
                        <div className="content">
                            <table className="table table-borderless text-muted text-center">
                                <thead>
                                <tr>
                                    <th scope="col">Staking Balance</th>
                                    <th scope="col">Reward Balance</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mDAI</td>
                                    <td>{window.web3.utils.fromWei(this.props.dAppTokenBalance, 'Ether')} DApp</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <form className="mb-3" onSubmit={(event) => {
                                        /* Preventing to send a Post Request to the Page and reload it  */
                                        event.preventDefault();
                                        let amount;
                                        amount = this.input.value.toString();
                                        /* Converting Input (from Reference) into Wei* /
                                        amount = window.web3.utils.toWei(amount, 'Ether');
                                        /* Calling Function stakeTokens(amount) */
                                        this.props.stakeTokens(amount);
                                    }}>
                                        <div>
                                            <label className="float-left">Stake Tokens</label>
                                            <br/>
                                            <span className="float-right text-muted">
                                                Balance: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}
                                            </span>
                                        </div>
                                        <div className="input-group mb-4">
                                            <input
                                                type="text"
                                                ref={(input) => {
                                                    this.input = input
                                                }}
                                                className="form-control form-control-lg"
                                                placeholder="0"
                                                required/>
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <img src={dai} height='45' alt=""/>
                                                    &nbsp;
                                                    <span className="float-right text-muted">mDAI</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                                            Stake Tokens
                                        </button>
                                    </form>
                                    <button
                                        type="submit"
                                        className="btn btn-link btn-block btn-sm"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            this.props.unStakeTokens()
                                        }}>
                                        Un-Stake Tokens
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;
