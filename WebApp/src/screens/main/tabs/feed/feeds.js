import React, { Component } from 'react';
import { Card, Row, Col, Spinner } from 'reactstrap';
import reactAutobind from 'react-autobind';
import ContextModule from '../../../../utils/contextModule';
import { abi } from '../../../../contract/feedContract';
import bnb from './images/bnb.png';
import btc from './images/btc.png';
import eth from './images/eth.png';
import link from './images/link.png';
import matic from './images/polygon.png';
import usdc from './images/usdc.png';

const ethers = require('ethers');
const providerMatic = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
const priceFeed = "0x9e8E22abfE33aF566377506E4888670Db72e639C"

function filterJSONarray(array, key, value) {
    try {
        return array.filter(obj => obj[key] === value);
    }
    catch (err) {
        return [];
    }
}

function epsilonRound(num) {
    const zeros = 2;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Feeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btc: 0,
            eth: 0,
            bnb: 0,
            link: 0,
            matic: 0,
            prices: [],
            symbol: ["BTC", "ETH", "BNB", "LINK", "MATIC", "USDC"],
            icons: [btc, eth, bnb, link, matic, usdc],
            balance: 0,
        }
        this.axios = require('axios')
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        reactAutobind(this);
        this.mySync = null;
        this._isMounted = true;
    }

    static contextType = ContextModule;

    async syncPrices() {
        let contract = new ethers.Contract(priceFeed, abi(), providerMatic);
        let priceBTC = await contract.getLatestBTCPrice();
        let priceETH = await contract.getLatestETHPrice();
        let priceBNB = await contract.getLatestBNBPrice();
        let priceLINK = await contract.getLatestLINKPrice();
        let priceMatic = await contract.getLatestMATICPrice();
        let priceUSDC = await contract.getLatestUSDCPrice();
        let prices = {
            btc: parseFloat((priceBTC).toString()) / 100000000,
            eth: parseFloat((priceETH).toString()) / 100000000,
            bnb: parseFloat((priceBNB).toString()) / 100000000,
            link: parseFloat((priceLINK).toString()) / 100000000,
            matic: parseFloat((priceMatic).toString()) / 100000000,
            usdc: parseFloat((priceUSDC).toString()) / 100000000,
        }
        this._isMounted && this.setState({
            prices: [epsilonRound(prices.btc), epsilonRound(prices.eth), epsilonRound(prices.bnb), epsilonRound(prices.link), epsilonRound(prices.matic), prices.usdc],
        })
    }

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
        this.axios({
            method: 'get',
            url: 'https://XXXXXXXXXXXXXXXXXXXXXXXXXXX/get-account-balance',
            headers: {
                'ewallet': this.context.value.ewallet,
            },
            cancelToken: this.source.token
        })
            .then((response) => {
                const myArray = filterJSONarray(response.data.data.accounts, "currency", "USD")
                if (myArray.length > 0) {
                    this.context.setValue({
                        balance: myArray[0].balance,
                    });
                }
                else {
                    console.log("No Balance");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // ETH
        let contract = new ethers.Contract(priceFeed, abi(), providerMatic);
        let priceBTC = await contract.getLatestBTCPrice();
        let priceETH = await contract.getLatestETHPrice();
        let priceBNB = await contract.getLatestBNBPrice();
        let priceLINK = await contract.getLatestLINKPrice();
        let priceMatic = await contract.getLatestMATICPrice();
        let priceUSDC = await contract.getLatestUSDCPrice();
        let prices = {
            btc: parseFloat((priceBTC).toString()) / 100000000,
            eth: parseFloat((priceETH).toString()) / 100000000,
            bnb: parseFloat((priceBNB).toString()) / 100000000,
            link: parseFloat((priceLINK).toString()) / 100000000,
            matic: parseFloat((priceMatic).toString()) / 100000000,
            usdc: parseFloat((priceUSDC).toString()) / 100000000,
        }
        this._isMounted && this.setState({
            prices: [epsilonRound(prices.btc), epsilonRound(prices.eth), epsilonRound(prices.bnb), epsilonRound(prices.link), epsilonRound(prices.matic), prices.usdc],
        })
        this.mySync = setInterval(() => {
            this.syncPrices();
        }, 1000 * 5);
    }

    componentWillUnmount() {
        clearInterval(this.mySync);
        this.source.cancel("Component got unmounted");
        this._isMounted = false;
    }

    render() {
        return (
            <div >
                <Row md="1">
                    <Col xs="12" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            paddingTop: "1rem",
                            fontSize: "1.4rem",
                        }}>
                            <div>
                                Total Balance
                            </div>
                            <div style={{
                                fontSize: '1.8rem',
                                fontWeight: 'bold',
                            }}>
                                ${epsilonRound(this.context.value.balance + this.context.value.cryptobalance)} USD
                            </div>
                        </div>
                    </Col>
                    <p />
                    <hr />
                    {
                        this.state.prices.length > 0 ?
                            <div style={{
                                height: "64vh",
                                overflowX: 'hidden',
                                overflowY: 'scroll',
                            }}>
                                {
                                    this.state.prices.map((price, index) => {
                                        return (
                                            <Col xs="12" key={"price" + index} style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Card
                                                    style={{
                                                        margin: '10px',
                                                        padding: '10px',
                                                        width: '90vw',
                                                        borderColor: '#8345e6',
                                                    }}>
                                                    <Row md="3">
                                                        <Col xs="4" style={{
                                                            fontSize: '20px',
                                                            fontWeight: 'bold',
                                                        }}>{this.state.symbol[index]}
                                                        </Col>
                                                        <Col xs="2" style={{
                                                            fontSize: '20px',
                                                            fontWeight: 'bold',
                                                        }}><img src={this.state.icons[index]} style={{
                                                            width: '50px',
                                                        }} />
                                                        </Col>
                                                        <Col xs="6" style={{
                                                            fontSize: '20px',
                                                            fontWeight: 'bold',
                                                        }}>
                                                            ${price}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: '26vh',
                                }}
                            ><Spinner style={{
                                color: "#8345e6",
                                width: "10vh",
                                height: "10vh"
                            }} /></div>
                    }
                </Row>
            </div>
        );
    }
}

export default Feeds;