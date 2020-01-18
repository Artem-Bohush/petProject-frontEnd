import React, { useContext } from 'react';
import BalanceService from '../services/BalanceService';
import Context from '../context';

function EditBalance({ isOpen, currentBalance, showEditBalanceCallBack }) {
  const context = useContext(Context);

  return (
    <>
      {isOpen &&
        <div className="edit-balance-modal">
          <div className="edit-balance-modal-body">
            <div className="close" onClick={showEditBalanceCallBack}></div>
            <div className="current-balance-group">
              <div className="balance-header">Текущий баланс</div>
              <div className="current-balance">
                <span className="icon-hryvnia-solid"></span>
                <span className="balance">{currentBalance}</span>
              </div>
            </div>
            <form onSubmit={setNewBalance}>
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

  // componentDidMount() {
  //   this.getBalance()
  // }

  // getBalance() {
  //   BalanceService.retrieveCurrentBalance()
  //     .then(obj => this.setState({ currentBalance: obj.balance }))
  //     .catch(error => console.error(error));
  // }

  function setNewBalance(e) {
    e.preventDefault();
    let newBalanceValue = document.querySelector('#new-balance').value
    BalanceService.setNewBalance(newBalanceValue)
      .then(() => {
        context.retrieveBalance();
        showEditBalanceCallBack();
      })
      .catch(error => console.error(error));
  }
}

export default EditBalance;