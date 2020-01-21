import React from 'react';
import logo from '../img/png/logo.png';
import Balance from './Balance';
import TemplateService from '../services/TemplateService';
import AuthenticationService from '../services/AuthenticationService';
import HistoryService from '../services/HistoryService';
import BalanceService from '../services/BalanceService';
import PlanningService from '../services/PlanningService';
import Context from '../context';

const Record = React.lazy(() => import('./Record/Record'));
const Planning = React.lazy(() => import('./Planning/Planning'));
const History = React.lazy(() => import('./History/History'));
const Details = React.lazy(() => import('./Details'));
const Settings = React.lazy(() => import('./Settings'));

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
      records: [],
      filteredRecords: [],
      chartData: [],
      planningProgressData: [],
      planningTableData: [],
      time: new Date(),
      previousPageName: '',
      userName: '',
      currentBalance: '',
      selectedRecord: {}
    };
    this.showDetails = this.showDetails.bind(this);
    this.goBack = this.goBack.bind(this);
    this.retrieveRecords = this.retrieveRecords.bind(this);
    this.retrieveBalance = this.retrieveBalance.bind(this);
    this.retrieveChartData = this.retrieveChartData.bind(this);
    this.doHistorySearch = this.doHistorySearch.bind(this);
    this.retrievePlanningData = this.retrievePlanningData.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
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
              <span>{this.state.time.toLocaleDateString()}</span>
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
            <Context.Provider value={{ retrieveBalance: this.retrieveBalance }}>
              <Balance isOpen={this.state.content.balance} currentBalance={this.state.currentBalance} />
            </Context.Provider>
            <React.Suspense fallback={<p>Loading...</p>}>
              <Context.Provider value={{
                retrieveRecords: this.retrieveRecords,
                retrieveBalance: this.retrieveBalance,
                retrieveChartData: this.retrieveChartData,
                retrievePlanningData: this.retrievePlanningData
              }}>
                <Record isOpen={this.state.content.record} />
              </Context.Provider>
              <Context.Provider value={{ deleteRecord: this.deleteRecord }}>
                <Planning isOpen={this.state.content.planning}
                  planningProgressData={this.state.planningProgressData}
                  planningTableData={this.state.planningTableData}
                  currentBalance={this.state.currentBalance} />
              </Context.Provider>
              <Context.Provider value={{
                showDetails: this.showDetails,
                doHistorySearch: this.doHistorySearch,
                retrieveRecords: this.retrieveRecords,
                deleteRecord: this.deleteRecord
              }}>
                <History isOpen={this.state.content.history} filteredRecords={this.state.filteredRecords}
                  chartData={this.state.chartData} />
              </Context.Provider>
              <Details isOpen={this.state.content.details} showDetails={this.showDetails}
                selectedRecord={this.state.selectedRecord} />
              <Settings isOpen={this.state.content.settings} goBack={this.goBack} />
            </React.Suspense>
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
    if (contentCopy.history === true) {
      this.setState({ filteredRecords: this.state.records })
    }
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

  showDetails(recordBtn) {
    const contentCopy = Object.assign({}, this.state.content);
    contentCopy.history = !contentCopy.history;
    contentCopy.details = !contentCopy.details;
    if (recordBtn !== undefined) {
      const recordsCopy = this.state.records.slice();
      const recordId = +recordBtn.id;
      let selectedRecord;
      recordsCopy.forEach(record => {
        if (record.id === recordId) {
          selectedRecord = record;
          // selectedRecord.number = tableTr.getElementsByTagName('th')[0].textContent;
        }
      });
      this.setState({ content: contentCopy, selectedRecord: selectedRecord });
    } else {
      this.setState({ content: contentCopy, filteredRecords: this.state.records });
    }
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

  retrieveRecords() {
    HistoryService.retrieveRecords()
      .then(result => {
        result.reverse();
        result.forEach(record => {
          record.date = new Date(record.created).toLocaleDateString();
          record.time = new Date(record.created).toLocaleTimeString();
        })
        this.setState({ records: result, filteredRecords: result });
      })
      .catch(error => console.error(error));
  }

  deleteRecord(btn) {
    const recordId = btn.id - 1;
    HistoryService.deleteRecord(recordId)
      .then(() => {
        this.retrieveBalance();
        this.retrieveRecords();
        this.retrieveChartData();
        this.retrievePlanningData();
      })
      .catch(error => console.error(error));
  }

  retrieveBalance() {
    BalanceService.retrieveCurrentBalance()
      .then(obj => this.setState({ currentBalance: obj.balance }))
      .catch(error => console.error(error));
  }

  retrieveChartData() {
    HistoryService.retrieveChartData()
      .then(result => this.setState({ chartData: result }))
      .catch(error => console.error(error));
  }

  retrievePlanningData() {
    PlanningService.retrievePlanningProgressData()
      .then(result => this.setState({ planningProgressData: result }))
      .catch(error => console.error(error));
    PlanningService.retrievePlanningTableData()
      .then(result => this.setState({ planningTableData: result }))
      .catch(error => console.error(error));
  }

  doHistorySearch(searchThis, searchBy) {
    const recordsCopy = this.state.records.slice();
    const filteredRecords = [];
    recordsCopy.forEach(record => {
      if (searchBy === 'Сумма') {
        if (String(record.sum).indexOf(searchThis) !== -1) {
          filteredRecords.push(record);
        }
      } else if (searchBy === 'Дата') {
        if (record.date.indexOf(searchThis) !== -1) {
          filteredRecords.push(record);
        }
      } else if (searchBy === 'Категория') {
        if (record.categoryName.toLocaleLowerCase().indexOf(searchThis) !== -1) {
          filteredRecords.push(record);
        }
      } else {
        if (record.type === 'income') {
          if ('доход'.indexOf(searchThis) !== -1) {
            filteredRecords.push(record);
          }
        } else if (record.type === 'outcome') {
          if ('расход'.indexOf(searchThis) !== -1) {
            filteredRecords.push(record);
          }
        }
      }
    });
    this.setState({ filteredRecords: filteredRecords });
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
    this.retrieveBalance();
    this.retrieveRecords();
    this.retrieveChartData();
    this.retrievePlanningData();
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