import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import reactAutobind from 'react-autobind';
import ContextModule from '../../../../utils/contextModule';
import { networks } from '../home/components/utils/networks';

function filterJSONarray(array, key, value) {
    try {
        return array.filter(obj => obj[key] === value);
    }
    catch (err) {
        return [];
    }
}

function lowThan(value, fiat, crypto, flag) {
    if (!flag) {
        return value <= fiat;
    }
    else {
        return value <= crypto;
    }
}

function epsilonRound(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            up: 0,
            down: 0,
            account: '',
            balance: 0,
            fiatBalance: 0,
            provider: {
                symbol: 'Matic',
            },
            price: 0,
            flag: false,
            loading: false,
        }
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        reactAutobind(this);
        this._isMounted = true;
    }

    static contextType = ContextModule;

    async componentDidMount() {
        this._isMounted && this.setState({
            price: await networks[80001].getPrice(),
        })
    }

    componentWillUnmount() {
        this.source.cancel("Component got unmounted");
        this._isMounted = false;
    }

    async Crypto2Fiat() {
        this._isMounted && this.setState({
            loading: true,
        })
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/transfer',
            headers: {
                'ewallets': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                'ewalletd': this.context.value.ewallet,
                'amount': epsilonRound(this.state.down).toString(),
                'currency': "USD"
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                this.axios({
                    method: 'get',
                    url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/transaction-decide',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                    cancelToken: this.source.token
                })
                    .then(() => {
                        this.axios({
                            method: 'get',
                            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/send',
                            headers: {
                                'flag': "0",
                                'to': '0xcF2F7040801cfA272D68CD37c8FD7D9fb84D65D8',
                                'amount': this.state.up.toString(),
                                'privatekey': this.context.value.cryptowallet,
                            },
                            cancelToken: this.source.token
                        })
                            .then((response) => {
                                this._isMounted && this.setState({
                                    loading: false,
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async Fiat2Crypto() {
        console.log("Fiat2Crypto")
        this._isMounted && this.setState({
            loading: true,
        })
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/transfer',
            headers: {
                'ewallets': this.context.value.ewallet,
                'ewalletd': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                'amount': this.state.up.toString(),
                'currency': "USD"
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                this.axios({
                    method: 'get',
                    url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/transaction-decide',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                    cancelToken: this.source.token
                })
                    .then(() => {
                        this.axios({
                            method: 'get',
                            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/send',
                            headers: {
                                'flag': '1',
                                'to': this.context.value.cryptoaddress.address,
                                'amount': this.state.down,
                            },
                            cancelToken: this.source.token
                        })
                            .then((response) => {
                                this._isMounted && this.setState({
                                    loading: false,
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async transaction() {
        if (this.state.flag) {
            this.Crypto2Fiat();
        }
        else {
            this.Fiat2Crypto();
        }
    }

    render() {
        return (
            <div style={{
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Input
                    type="number"
                    name="number"
                    id="number"
                    value={this.state.up ? this.state.up : ""}
                    placeholder={"From " + (this.state.flag ? this.state.provider.symbol + "" : "USD")}
                    style={{
                        width: '80%',
                        height: '50px',
                        borderRadius: '25px',
                        border: '2px solid #8345e6',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: '10px',
                        marginBottom: '10px',
                        textAlign: 'center',
                    }}
                    onChange={(e) => {
                        if (this.state.flag) {
                            this._isMounted && this.setState({
                                up: e.target.value,
                                down: e.target.value * this.state.price,
                            })
                        }
                        else {
                            this._isMounted && this.setState({
                                up: e.target.value,
                                down: e.target.value / this.state.price,
                            })
                        }
                    }}
                />
                <button className='roundButton' style={{ fontWeight: "bolder", height: "5vh" }} onClick={() => this._isMounted && this.setState({
                    up: this.state.down,
                    down: this.state.up,
                    flag: !this.state.flag
                })}>
                    <SwapVertIcon />
                </button>
                <Input
                    value={this.state.down ? this.state.down : ""}
                    type="number"
                    name="number"
                    id="number"
                    disabled
                    placeholder={"To " + (!this.state.flag ? this.state.provider.symbol : "USD")}
                    style={{
                        width: '80%',
                        height: '50px',
                        borderRadius: '25px',
                        border: '2px solid #8345e6',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: '10px',
                        marginBottom: '10px',
                        textAlign: 'center',
                    }}
                />
                <br />
                <button
                    disabled={this.state.loading}
                    className='roundButton' style={{ fontWeight: "bolder", fontSize: "1.5rem", height: "7vh" }} onClick={() => {
                        this.transaction();
                    }}>
                    {
                        this.state.loading ?
                            "Swapping..." :
                            "Swap"
                    }
                </button>
            </div>
        );
    }
}

export default Swap;