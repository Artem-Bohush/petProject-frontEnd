import React from 'react';
import logo from '../img/png/logo.png';
import Balance from './Balance';
import Record from './Record';
import Planning from './Planning';
import History from './History';
import Details from './Details';
import EditBalance from './EditBalance';
import Settings from './Settings';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [
        { name: 'Balance', show: true },
        { name: 'Record', show: false },
        { name: 'Planning', show: false },
        { name: 'History', show: false },
        { name: 'Details', show: false },
        { name: 'EditBalance', show: false },
        { name: 'Settings', show: false }
      ],
      time: new Date(),
      date: new Date().getDate() + '.' + (+new Date().getMonth() + 1) + '.' + new Date().getFullYear(),
      rateTable: [
        { name: 'dollar', rate: '24.55' },
        { name: 'euro', rate: '27.75' }
      ],
      historyTable: [
        { id: '1', value: '99.99', date: new Date().getFullYear(), category: 'category1', type: 'income', descr: 'some descr1' },
        { id: '2', value: '99.99', date: new Date().getFullYear(), category: 'category2', type: 'expense', descr: 'some descr2' },
        { id: '3', value: '99.99', date: new Date().getFullYear(), category: 'category3', type: 'income', descr: 'some descr3' },
        { id: '4', value: '99.99', date: new Date().getFullYear(), category: 'category4', type: 'expense', descr: 'some descr4' },
        { id: '5', value: '99.99', date: new Date().getFullYear(), category: 'category5', type: 'income', descr: 'some descr5' },
      ],
      previousPageName: ''
    };
  }

  render() {
    const Component = () => {
      if (this.state.content[0].show === true) {
        if (this.state.content[5].show === true) {
          return (
            <>
              <Balance showEditBalanceCallBack={() => this.showEditBalance()} />
              <EditBalance showEditBalanceCallBack={() => this.showEditBalance()} />
            </>
          )
        }
        return (
          <Balance showEditBalanceCallBack={() => this.showEditBalance()} />
        )
      } else if (this.state.content[1].show === true) {
        return (
          <Record />
        )
      } else if (this.state.content[2].show === true) {
        return (
          <Planning />
        )
      } else if (this.state.content[3].show === true) {
        return (
          <History />
        )
      } else if (this.state.content[4].show === true) {
        return (
          <Details />
        )
      } else {
        return (
          <Settings previousPageName={this.state.previousPageName}
            goBackCallBack={(previousPageName) => this.goBack(previousPageName)} />
        )
      }
    };

    return (
      <div className="account">
        <div className="sidebar">
          <div className="logo">
            <div className="logo-img">
              <img src={logo} alt="logo" />
            </div>
            <h1 className="logo-title">Money Keeper</h1>
          </div>
          <nav className="menu">
            <ul>
              <li className="option active" onClick={(event) => this.showContent('Balance', event.target)}>
                <span className="icon-file-invoice-dollar-solid"></span>Баланс</li>
              <li className="option" onClick={(event) => this.showContent('Record', event.target)}>
                <span className="icon-file-medical-solid"></span>Запись</li>
              <li className="option" onClick={(event) => this.showContent('Planning', event.target)}>
                <span className="icon-calendar-alt-regular"></span>Планирование</li>
              <li className="option" onClick={(event) => this.showContent('History', event.target)}>
                <span className="icon-history-solid"></span>История</li>
            </ul>
          </nav>
        </div>
        <article className="article">
          <div className="article-header">
            <div className="time-date">
              <span>{this.state.time.toLocaleTimeString() + ','}</span>
              <span>{this.state.date}</span>
            </div>
            <div className="greeting" onClick={() => this.showLoginOptions()}>
              Здравствуйте, {this.state.userName}
              <span className="icon-sort-down-solid"></span>
            </div>
            <div className="login-options">
              <div onClick={() => this.showSettings()}><span className="icon-gear"></span> Настройки аккаунта</div>
              <div onClick={() => this.logOut()}><span className="icon-logout"></span> Выйти из аккаунта</div>
            </div>
          </div>
          <div className="article-content">
            <Component />
            {/* <Balance show={this.state.content[0].show}
                            rateTable={this.state.rateTable}
                            currentBalance={this.props.currentBalance}
                            showEditBalanceCallBack={() => this.showEditBalance()}
                            refreshRateTableCallBack={(dollarRate, euroRate) => this.refreshRateTable(dollarRate, euroRate)}/>
                        <Record show={this.state.content[1].show}/>
                        <Planning show={this.state.content[2].show}/>
                        <History show={this.state.content[3].show}
                            historyTable={this.state.historyTable}
                            showRecordDetailsCallBack={(id) => this.showRecordDetails(id)}/>
                        <Details show={this.state.content[4].show}
                            recordDetails={this.state.recordDetails}
                            goBackToHistoryCallBack={() => this.goBackToHistory()}/>
                        <EditBalance show={this.state.content[5].show}
                            currentBalance={this.props.currentBalance}
                            email={this.props.email}
                            showEditBalanceCallBack={() => this.showEditBalance()}
                            editBalanceValueCallBack={(newBalance) => this.editBalanceValue(newBalance)}/>
                        <Settings show={this.state.content[6].show}
                            previousPage={this.state.previousPage}
                            email={this.props.email}
                            goBackCallBack={(previousPage) => this.goBack(previousPage)}/> */}
          </div>
        </article>
      </div>
    )
  }

  showEditBalance() {
    const contentCopy = this.state.content.concat()
    contentCopy.forEach(element => {
      if (element.name === 'EditBalance') {
        element.show = !element.show
        if (element.show === true) {
          document.getElementsByClassName('article-content')[0].classList.add('hide')
        } else {
          document.getElementsByClassName('article-content')[0].classList.remove('hide')
        }
        return
      }
    })
    this.setState({ content: contentCopy })
  }

  showSettings() {
    document.querySelector('.login-options').style.display = 'none';
    const contentCopy = this.state.content.concat();
    let currentPageName;
    contentCopy.forEach(element => {
      if (element.show) {
        currentPageName = element.name;
        element.show = false;
        return;
      }
    });
    contentCopy.find(c => c.name === 'Settings').show = true;
    this.setState({ content: contentCopy, previousPageName: currentPageName });
  }

  goBack(previousPageName) {
    const contentCopy = this.state.content.concat();
    contentCopy.find(c => c.name === 'Settings').show = false;
    contentCopy.find(c => c.name === previousPageName).show = true;
    this.setState({ content: contentCopy });
  }

  //-----------------нижче попередні функції-------------------------------

  editBalanceValue(newBalance) {
    this.props.editCurrentBalanceCallBack(newBalance);
  }

  refreshRateTable(dollarRate, euroRate) {
    const rateTableCopy = this.state.rateTable.concat();
    rateTableCopy[0].rate = dollarRate;
    rateTableCopy[1].rate = euroRate;
    this.setState({ rateTable: rateTableCopy });
  }

  showRecordDetails(id) {
    const historyTableCopy = this.state.historyTable.concat();
    let t = historyTableCopy.find(c => c.id === id);
    const contentCopy = this.state.content.concat();
    contentCopy.find(c => c.name === 'History').show = false;
    contentCopy.find(c => c.name === 'Details').show = true;
    this.setState({ content: contentCopy, historyTable: historyTableCopy, recordDetails: t });
  }

  goBackToHistory() {
    const contentCopy = this.state.content.concat();
    contentCopy.find(c => c.name === 'Details').show = false;
    contentCopy.find(c => c.name === 'History').show = true;
    this.setState({ content: contentCopy });
  }

  showLoginOptions() {
    let t = document.querySelector('.login-options')
    if (t.style.display !== 'flex') {
      t.style.display = 'flex'
    } else {
      t.style.display = 'none'
    }
  }

  logOut() {
    this.props.toggleToLoginCallBack()
  }

  showContent(name, li) {
    document.querySelector('.login-options').style.display = 'none';
    const options = document.getElementsByClassName('option')
    for (let item of options) {
      if (item.classList.contains('active')) {
        item.classList.remove('active')
        li.classList.add('active')
      }
    }
    const contentCopy = this.state.content.concat()
    contentCopy.forEach(element => {
      if (element.show) {
        element.show = false
        contentCopy.find(c => c.name === name).show = true
        return
      }
    })
    this.setState({ content: contentCopy })
  }

  componentDidMount() {
    // this.timerId = setInterval(
    //     () => this.tick(), 1000
    // )
    // this.getUserName()
  }

  getUserName() {
    let request = new XMLHttpRequest();
    request.open('GET', 'getUserName');
    request.setRequestHeader('Content-type', 'application/json; charset = utf-8');
    request.send();
    request.addEventListener('readystatechange', function () {
      if (request.readyState === 4 && request.status === 200) {
        let data = JSON.parse(request.response);
        this.setState.userName = data.name
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      time: new Date()
    })
  }
}

export default Template;