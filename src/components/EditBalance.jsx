import React from 'react';
import BalanceService from '../services/BalanceService';

class EditBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <>
        {this.props.isOpen &&
          <div className="edit-balance-modal">
            <div className="edit-balance-modal-body">
              <div className="close" onClick={this.props.showEditBalanceCallBack}></div>
              <div className="current-balance-group">
                <div className="balance-header">Текущий баланс</div>
                <div className="current-balance">
                  <span className="icon-hryvnia-solid"></span>
                  <span className="balance">{this.props.currentBalance}</span>
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
          </div >
        }
      </>
    )
  }

  // componentDidMount() {
  //   this.getBalance()
  // }

  // getBalance() {
  //   BalanceService.retrieveCurrentBalance()
  //     .then(obj => this.setState({ currentBalance: obj.balance }))
  //     .catch(error => console.error(error));
  // }

  setNewBalance(e) {
    e.preventDefault();
    let newBalanceValue = document.querySelector('#new-balance').value
    BalanceService.setNewBalance(newBalanceValue)
      .then(() => {
        this.props.showEditBalanceCallBack()
      })
      .catch(error => console.error(error));
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