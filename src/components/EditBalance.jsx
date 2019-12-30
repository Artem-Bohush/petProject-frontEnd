import React from 'react';
import MainService from '../services/MainService';

class EditBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBalance: ''
    };
  }
  render() {
    return (
      <div className="edit-balance-window">
        <div className="close" onClick={this.props.showEditBalanceCallBack}></div>
        <div className="current-balance-group">
          <div className="balance-header">Текущий баланс</div>
          <div className="current-balance">
            <span className="icon-hryvnia-solid"></span>
            <span className="balance">{this.state.currentBalance}</span>
          </div>
        </div>
        <form onSubmit={(e) => this.setNewBalance(e)}>
          <div className="form-group">
            <label className="control-label" htmlFor="new-balance">Изменить баланс</label>
            <input type="number" id="new-balance" className="form-control" name="newBalance"></input>
          </div>
          <button type="submit" className="btn btn-primary">Применить</button>
        </form>
      </div>
    )
  }

  componentDidMount() {
    this.getBalance()
  }

  getBalance() {
    MainService.retrieveCurrentBalance()
      .then(
        response => {
          this.setState({ currentBalance: response.balance })
        }
      )
  }

  setNewBalance(e) {
    e.preventDefault();
    let t = document.querySelector('#new-balance').value
    MainService.setNewBalance({ balance: t })
      .then(() => {
        this.props.showEditBalanceCallBack()
      })
    // if (t !== '') {
    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'setNewBalance');
    //     request.setRequestHeader('Content-type', 'application/json; charset = utf-8');
    //     let obj = {
    //         email: this.props.email,
    //         newBalance: t
    //     };
    //     let json = JSON.stringify(obj);
    //     request.send(json);
    //     request.addEventListener('readystatechange', () => {
    //         if (request.readyState === 4 && request.status === 200) {
    //             this.props.editBalanceValueCallBack(t)
    //             this.props.showEditBalanceCallBack()
    //         }
    //     });
    // }
  }
}

export default EditBalance;