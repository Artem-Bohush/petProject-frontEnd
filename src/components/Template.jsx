import React from 'react';
import logo from '../img/png/logo.png';
import Balance from './Balance';
import Record from './Record';
import Planning from './Planning';
import History from './History';
import Details from './Details';
import Settings from './Settings';
import TemplateService from '../services/TemplateService';
import AuthenticationService from '../services/AuthenticationService';
import Contex from '../context';

class Template extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: {
        balance: true,
        record: false,
        planning: false,
        history: false,
        details: false,
        settings: false
      },
      time: new Date(),
      date: new Date().getDate() + '.' + (+new Date().getMonth() + 1) + '.' + new Date().getFullYear(),
      previousPageName: '',
      userName: ''
    };
    this.goBack = this.goBack.bind(this);
  }

  render() {
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
              <li className="option active" onClick={(event) => this.showContent('balance', event.target)}>
                <span className="icon-file-invoice-dollar-solid"></span>Баланс</li>
              <li className="option" onClick={(event) => this.showContent('record', event.target)}>
                <span className="icon-file-medical-solid"></span>Запись</li>
              <li className="option" onClick={(event) => this.showContent('planning', event.target)}>
                <span className="icon-calendar-alt-regular"></span>Планирование</li>
              <li className="option" onClick={(event) => this.showContent('history', event.target)}>
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
            <Contex.Provider value={{ goBack: this.goBack }}>
              <Balance isOpen={this.state.content.balance} />
              <Record isOpen={this.state.content.record} />
              <Planning isOpen={this.state.content.planning} />
              <History isOpen={this.state.content.history} />
              <Details isOpen={this.state.content.details} />
              <Settings isOpen={this.state.content.settings} goBack={this.goBack} />
            </Contex.Provider>
          </div>
        </article>
      </div>
    )
  }

  showContent(name, li) {
    document.querySelector('.login-options').style.display = 'none';
    const options = document.getElementsByClassName('option');
    for (let item of options) {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        li.classList.add('active');
      }
    }
    const contentCopy = Object.assign({}, this.state.content);
    for (let tab in contentCopy) {
      contentCopy[tab] = false;
    }
    contentCopy[name] = true;
    this.setState({ content: contentCopy })
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
    AuthenticationService.logout();
    this.props.history.push('/login');
  }

  showSettings() {
    document.querySelector('.login-options').style.display = 'none';
    const contentCopy = Object.assign({}, this.state.content);
    let currentPageName;
    for (let tab in contentCopy) {
      if (contentCopy[tab] === true) {
        currentPageName = tab;
        contentCopy[tab] = false;
      }
      if (tab === 'settings') {
        contentCopy.settings = true;
      }
    }
    this.setState({ content: contentCopy, previousPageName: currentPageName });
  }

  goBack() {
    const contentCopy = Object.assign({}, this.state.content);
    for (let tab in contentCopy) {
      contentCopy[tab] = false;
    }
    contentCopy[this.state.previousPageName] = true;
    this.setState({ content: contentCopy });
  }

  retrieveUserName() {
    TemplateService.retrieveUserName()
      .then(result => {
        const userName = result.username;
        this.setState({ userName: userName })
      })
      .catch(error => console.error(error));
  }

  tick() {
    this.setState({
      time: new Date()
    })
  }

  componentDidMount() {
    // this.timerId = setInterval(
    //   () => this.tick(), 1000
    // )

    this.retrieveUserName();
  }

  componentWillUnmount() {

  }






  // showEditBalance() {
  //   const contentCopy = this.state.content.concat()
  //   contentCopy.forEach(element => {
  //     if (element.name === 'EditBalance') {
  //       element.show = !element.show
  //       if (element.show === true) {
  //         document.getElementsByClassName('article-content')[0].classList.add('hide')
  //       } else {
  //         document.getElementsByClassName('article-content')[0].classList.remove('hide')
  //       }
  //       return
  //     }
  //   })
  //   this.setState({ content: contentCopy })
  // }

  //-----------------нижче попередні функції-------------------------------

  // editBalanceValue(newBalance) {
  //   this.props.editCurrentBalanceCallBack(newBalance);
  // }

  // refreshRateTable(dollarRate, euroRate) {
  //   const rateTableCopy = this.state.rateTable.concat();
  //   rateTableCopy[0].rate = dollarRate;
  //   rateTableCopy[1].rate = euroRate;
  //   this.setState({ rateTable: rateTableCopy });
  // }

  // showRecordDetails(id) {
  //   const historyTableCopy = this.state.historyTable.concat();
  //   let t = historyTableCopy.find(c => c.id === id);
  //   const contentCopy = this.state.content.concat();
  //   contentCopy.find(c => c.name === 'History').show = false;
  //   contentCopy.find(c => c.name === 'Details').show = true;
  //   this.setState({ content: contentCopy, historyTable: historyTableCopy, recordDetails: t });
  // }

  // goBackToHistory() {
  //   const contentCopy = this.state.content.concat();
  //   contentCopy.find(c => c.name === 'Details').show = false;
  //   contentCopy.find(c => c.name === 'History').show = true;
  //   this.setState({ content: contentCopy });
  // }
}

export default Template;