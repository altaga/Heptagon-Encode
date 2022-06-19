import React, { Component } from 'react';
import Ctransactions from './utils/cryptotransactions';
import ContextModule from '../../../../../utils/contextModule';
import { networks } from "./utils/networks";

function epsilonRound(num) {
    const zeros = 6;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            account: "",
            provider: "",
            transactions: []
        };
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
    }

    static contextType = ContextModule;

    async componentDidMount() {
        this.axios({
            method: 'get',
            url: `https://api.covalenthq.com/v1/80001/address/${this.context.value.cryptoaddress.address}/balances_v2/?key=XXXXXXXXXXXXXXXXXXXXXXXXXXX`,
            headers: {
                'Accept': 'application/json'
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                this.context.setValue({ cryptobalance: response.data.data.items[0].balance / 1000000000000000000 });
            })
            .catch((error) => {
                console.log(error);
            });
        let transactions = await networks[80001].getTransactions(this.context.value.cryptoaddress.address);
        this.setState({ transactions });
    }

    componentWillUnmount() {
        this.source.cancel("Component got unmounted");
    }

    render() {
        return (
            <div style={{
                height: '100%',
                fontSize: '1.4em',
                paddingBottom: '10px',
            }}>
                <div>
                    <a
                        href={`${this.state.provider.explorer}address/${this.state.account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {"\n" + this.state.account.substring(0, 21) + "\n" + this.state.account.substring(21, 42)}
                    </a>
                </div>
                <div>
                    Network :
                    <span style={{
                        color: "purple"
                    }}>
                        {" "}{"Polygon Mumbai"}
                    </span>
                </div>
                <div>
                    Balance:{" "} {epsilonRound(this.context.value.cryptobalance)}{" "} &nbsp;
                    {
                        this.state.provider.icon && <img src={this.state.provider.icon} alt="icon" width="30px"></img>
                    }
                </div>
                <hr />
                <div style={{ paddingBottom: "10px" }}>
                    Transactions:
                </div>
                <div>
                    <Ctransactions transactions={this.state.transactions} />
                </div>
            </div>
        );
    }
}

export default Crypto;