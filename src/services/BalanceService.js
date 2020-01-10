import info from './Info';

class BalanceService {

  async retrieveCurrentBalance() {
    const response = await fetch(`${info.API_URL}/balance/getCurrent`, {
      headers: {
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      }
    });
    return await response.json();
  }

  setNewBalance(value) {
    return fetch(`${info.API_URL}/balance/setBalance`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify({ balance: value })
    });
  }

  async retrieveCurrentRate() {
    const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    const rates = await response.json();
    const requiredCurrency = rates.filter(currency => {
      return (currency.ccy === 'USD' || currency.ccy === 'EUR') ? true : false;
    });
    return requiredCurrency;
  }
}

export default new BalanceService();