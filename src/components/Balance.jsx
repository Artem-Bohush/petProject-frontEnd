import React from 'react';
import MainService from '../services/MainService';

class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: 
            new Date().getDate()+'.'+(+new Date().getMonth() + 1)+'.'+new Date().getFullYear(),
            currentBalance: ''
        };
    }
    render() {
        return(
            <>
                <div className="title-block">
                    <h3 className="title">Ваш баланс</h3>
                </div>
                <div className="balance-content-block">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="balance-card">
                                <div className="balance-card-header">
                                    <h4 className="header-title">Баланс</h4>
                                    <span className="icon-edit"
                                        onClick={this.props.showEditBalanceCallBack}></span>
                                </div>
                                <div className="balance-card-block">
                                    <div className="row">
                                        <div className="col">
                                            <div className="balance-container">
                                                <div className="balance-icon">
                                                    <span className="icon-hryvnia-solid"></span>
                                                </div>
                                                <div className="balance-value">
                                                    {(+this.state.currentBalance).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="balance-container">
                                                <div className="balance-icon">
                                                    <span className="icon-dollar-sign-solid"></span>
                                                </div>
                                                <div className="balance-value">
                                                    {((+this.state.currentBalance)/25.5).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="balance-container">
                                                <div className="balance-icon">
                                                    <span className="icon-euro-sign-solid"></span>
                                                </div>
                                                <div className="balance-value">
                                                    {((+this.state.currentBalance)/28.75).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="balance-card">
                                <div className="balance-card-header">
                                    <h4 className="header-title">Курс</h4>
                                    <span className="icon-refresh-button"
                                        onClick={() => this.refreshCurrency()}></span>
                                </div>
                                <div className="balance-card-block">
                                <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Валюта</th>
                                            <th scope="col">Курс</th>
                                            <th scope="col">Дата</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>грн/грн</td>
                                                <td>1.00/1.00</td>
                                                <td>{this.state.date}</td>
                                            </tr>
                                            <tr>
                                                <td>доллар/грн</td>
                                                <td>1.00/24.50</td>
                                                {/* <td>1.00/{(+this.props.rateTable[0].rate).toFixed(2)}</td> */}
                                                <td>{this.state.date}</td>
                                            </tr>
                                            <tr>
                                                <td>евро/грн</td>
                                                <td>1.00/27.75</td>
                                                {/* <td>1.00/{(+this.props.rateTable[1].rate).toFixed(2)}</td> */}
                                                <td>{this.state.date}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } 

    componentDidMount() {
        this.getBalance()
    }

    getBalance() {
        MainService.retrieveCurrentBalance()
            .then(
                response => {
                    this.setState({currentBalance: response.balance})
                }
            )
    }

    refreshCurrency() {
        this.props.refreshRateTableCallBack(Math.random(), Math.random())
    }
}
     
export default Balance;