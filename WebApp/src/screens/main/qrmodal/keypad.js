import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

function numberString(num, del = false) {
    if (del) {
        if (num.length === 1) {
            return '0';
        }
        return num.substring(0, num.length - 1);
    }
    if (num === '.') {
        return '0.';
    }
    if (num === '01') {
        return '1';
    }
    if (num === '02') {
        return '2';
    }
    if (num === '03') {
        return '3';
    }
    if (num === '04') {
        return '4';
    }
    if (num === '05') {
        return '5';
    }
    if (num === '06') {
        return '6';
    }
    if (num === '07') {
        return '7';
    }
    if (num === '08') {
        return '8';
    }
    if (num === '09') {
        return '9';
    }
    if (num === '00') {
        return '0';
    }
    if (num.indexOf('.') > -1) {
        if (num.indexOf('.', num.indexOf('.') + 1) > -1) {
            return num.substring(0, num.length - 1);
        }
        return num;
    }
    return num
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Keypad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selector: 13,
            amount: "",
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.amount !== prevState.amount) {
            this.props.update(this.state.amount);
        }
    }

    render() {
        return (
            <div>
                <Row style={{
                    fontSize: '1.5rem',
                    marginTop: '10px',
                }}>
                    {
                        array.map((item, index) => {
                            return (
                                <Col xs="4" 
                                key = {"Key"+item+index}
                                style={{
                                    border: '1px solid #e0e0e0',
                                    padding: '10px',
                                    backgroundColor: this.state.selector === item ? '#8345e6' : '#ffffff',
                                }}
                                    onClick={() =>
                                        this.setState({
                                            selector: item,
                                            amount: numberString(this.state.amount + item.toString()),
                                        },
                                            () => setTimeout(() => {
                                                this.setState({
                                                    selector: 13,
                                                })
                                            }, 200)
                                        )}>
                                    {
                                        item
                                    }
                                </Col>
                            )
                        })
                    }
                    <Col xs="4"
                        style={{
                            border: '1px solid #e0e0e0',
                            padding: '10px',
                            backgroundColor: this.state.selector === 10 ? '#8345e6' : '#ffffff',
                        }}
                        onClick={() =>
                            this.setState({
                                selector: 10,
                                amount: numberString(this.state.amount + "."),
                            },
                                () => setTimeout(() => {
                                    this.setState({
                                        selector: 13,
                                    })
                                }, 200)
                            )}>
                        .
                    </Col>
                    <Col xs="4"
                        style={{
                            border: '1px solid #e0e0e0',
                            padding: '10px',
                            backgroundColor: this.state.selector === 11 ? '#8345e6' : '#ffffff',
                        }}
                        onClick={() =>
                            this.setState({
                                selector: 11,
                                amount: numberString(this.state.amount + "0"),
                            },
                                () => setTimeout(() => {
                                    this.setState({
                                        selector: 13,
                                    })
                                }, 200)
                            )}>
                        0
                    </Col>
                    <Col xs="4"
                        style={{
                            border: '1px solid #e0e0e0',
                            padding: '10px',
                            backgroundColor: this.state.selector === 12 ? '#8345e6' : '#ffffff',
                        }}
                        onClick={() =>
                            this.setState({
                                selector: 12,
                                amount: numberString(this.state.amount, true),
                            },
                                () => setTimeout(() => {
                                    this.setState({
                                        selector: 13,
                                    })
                                }, 200)
                            )}>
                        Del
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Keypad;