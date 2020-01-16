import React from 'react';
import Table from './Table';
import Chart from './Chart';
import HistoryService from '../../services/HistoryService';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  render() {
    return (
      <>
        {this.props.isOpen &&
          <>
            <div className="title-block">
              <h3 className="title">Страница истории</h3>
            </div>
            <div className="history-content-block">
              <div className="row">
                <div className="col-md-12">
                  <Chart />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Table records={this.state.records} />
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
  }

  retrieveRecords() {
    HistoryService.retrieveRecords()
      .then(result => {
        this.setState({ records: result });
      })
      .catch(error => console.error(error));
  }

  showDetails(row, btn) {
    if (btn.classList.contains('details-btn')) {
      // let recordType = row.querySelector('.income')
      // if (recordType !== null) {
      //     this.props.showRecordDetailsCallBack(row.getAttribute('id'))
      // }
      this.props.showRecordDetailsCallBack(row.getAttribute('id'))
    }
  }

  componentDidMount() {
    this.retrieveRecords();
  }
}

export default History;