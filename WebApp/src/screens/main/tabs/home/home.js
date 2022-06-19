import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Crypto from './components/crypto';
import Fiat from './components/fiat';
import Verify from './components/verify';
import NFT from './components/nft';
import ContextModule from '../../../../utils/contextModule';
import { processNFT } from './components/utils/networks';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selector: 0,
            nft: [],
        };
        this.axios = require('axios');
        this.CancelToken = require('axios').CancelToken;
        this.source = this.CancelToken.source();
        this._isMounted = true;
    }

    static contextType = ContextModule;

    async componentDidMount() {
        let res = await this.axios({
            method: 'get',
            url: `https://api.covalenthq.com/v1/80001/address/${this.context.value.cryptoaddress.address}/balances_v2/?key=XXXXXXXXXXXXXXXXXXXXXXXXXXX&format=JSON&nft=true&no-nft-fetch=false`,
            headers: {
                'Accept': 'application/json'
            },
            cancelToken: this.source.token
        })
        res = res.data.data.items.filter(item => item.type === "nft");
        res = res.map(item => {
            return ({
                contractAddress: item.contract_address
            })
        })
        let nfts = await processNFT(res, this.context.value.cryptoaddress)
        this._isMounted && this.setState({
            nft: nfts
        })
    }

    componentWillUnmount() {
        this.source.cancel("Component got unmounted");
        this._isMounted = false;
    }

    render() {
        return (
            <div style={{ paddingTop: "16px" }} >
                <Row md="1">
                    <Col xs="12">
                        <button className='roundButton' style={{ width: "90vw", fontSize: "1.5rem", fontWeight: "bolder", height: "7vh" }} onClick={() => {
                            if (this.state.selector === 1) {
                                this.setState({
                                    selector: 0
                                })
                            }
                            else {
                                this.setState({
                                    selector: 1
                                })
                            }
                        }}>
                            Fiat Account
                        </button>
                        <div
                            hidden={this.state.selector !== 1}
                            style={{
                                marginTop: "5px",
                                maxHeight: "71.8vh",
                            }}>
                            <Fiat />
                        </div>
                    </Col>
                    <div style={{ paddingTop: "4px" }} />
                    <Col xs="12">
                        <button className='roundButton' style={{ width: "90vw", fontSize: "1.5rem", fontWeight: "bolder", height: "7vh" }} onClick={() => {
                            if (this.state.selector === 2) {
                                this.setState({
                                    selector: 0
                                })
                            }
                            else {
                                this.setState({
                                    selector: 2
                                })
                            }
                        }}>
                            Crypto Account
                        </button>
                        <div
                            hidden={this.state.selector !== 2}
                            style={{
                                marginTop: "5px",
                                maxHeight: "64vh",
                            }}>
                            <Crypto />
                        </div>
                    </Col>
                    {
                        this.state.nft.length > 0 &&
                        <>
                            <div style={{ paddingTop: "4px" }} />
                            <Col xs="12">
                                <button className='roundButton' style={{ width: "90vw", fontSize: "1.5rem", fontWeight: "bolder", height: "7vh" }} onClick={() => {
                                    if (this.state.selector === 4) {
                                        this.setState({
                                            selector: 0
                                        })
                                    }
                                    else {
                                        this.setState({
                                            selector: 4
                                        })
                                    }
                                }}>
                                    NFT Collection
                                </button>
                                <div
                                    hidden={this.state.selector !== 4}
                                    style={{
                                        marginTop: "5px",
                                        maxHeight: "56.4vh",
                                    }}>
                                    <NFT nft={this.state.nft} />
                                </div>
                            </Col>
                        </>
                    }
                    <div style={{ paddingTop: "4px" }} />
                    <Col xs="12">
                        <button className='roundButton' style={{ width: "90vw", fontSize: "1.5rem", fontWeight: "bolder", height: "7vh" }} onClick={() => {
                            if (this.state.selector === 3) {
                                this.setState({
                                    selector: 0
                                })
                            }
                            else {
                                this.setState({
                                    selector: 3
                                })
                            }
                        }}>
                            Verify
                        </button>
                        <div
                            hidden={this.state.selector !== 3}
                            style={{
                                marginTop: "5px",
                                maxHeight: "56.4vh",
                            }}>
                            <Verify />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;