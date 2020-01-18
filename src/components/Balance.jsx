import React from 'react';
import BalanceService from '../services/BalanceService';
import EditBalance from './EditBalance';
import Loader from './Loader';

class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:
        new Date().getDate() + '.' + (+new Date().getMonth() + 1) + '.' + new Date().getFullYear(),
      // currentBalance: '',
      showEditBalance: false,
      rateRUR: 1e9,
      rateUSD: 1e9,
      rateEUR: 1e9,
      loading: true
    };
  }
  render() {
    return (
      <>
        {this.props.isOpen &&
          <>
            <EditBalance isOpen={this.state.showEditBalance} currentBalance={this.props.currentBalance}
              showEditBalanceCallBack={() => this.showEditBalance()} />
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
                        onClick={() => this.showEditBalance()}></span>
                    </div>
                    <div className="balance-card-block">
                      <div className="row">
                        <div className="col">
                          <div className="balance-container">
                            <div className="balance-icon">
                              <span className="icon-hryvnia-solid"></span>
                            </div>
                            <div className="balance-value">
                              {(+this.props.currentBalance).toFixed(2)}
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
                              {((+this.props.currentBalance) / this.state.rateUSD).toFixed(2)}
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
                              {((+this.props.currentBalance) / this.state.rateEUR).toFixed(2)}
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
                      {this.state.loading ? <Loader /> :
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
                              <td>рубль/грн</td>
                              <td>1.00/{this.state.rateRUR}</td>
                              <td>{this.state.date}</td>
                            </tr>
                            <tr>
                              <td>доллар/грн</td>
                              <td>1.00/{this.state.rateUSD}</td>
                              <td>{this.state.date}</td>
                            </tr>
                            <tr>
                              <td>евро/грн</td>
                              <td>1.00/{this.state.rateEUR}</td>
                              <td>{this.state.date}</td>
                            </tr>
                          </tbody>
                        </table>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
  }

  componentDidMount() {
    // this.getBalance();
    this.refreshCurrency();
  }

  // getBalance() {
  //   BalanceService.retrieveCurrentBalance()
  //     .then(obj => this.setState({ currentBalance: obj.balance }))
  //     .catch(error => console.error(error));
  // }

  refreshCurrency() {
    this.setState({ loading: true })
    setTimeout(() => {
      BalanceService.retrieveCurrentRate()
        .then(currencyArr => {
          currencyArr.forEach(currency => {
            if (currency.ccy === 'RUR') {
              this.setState({ rateRUR: (+currency.buy).toFixed(2) })
            } else if (currency.ccy === 'USD') {
              this.setState({ rateUSD: (+currency.buy).toFixed(2) })
            } else {
              this.setState({ rateEUR: (+currency.buy).toFixed(2), loading: false })
            }
          })
        })
        .catch(error => console.error(error));
    }, 1500)
  }

  showEditBalance() {
    this.setState({ showEditBalance: !this.state.showEditBalance });
  }
}

export default Balance;