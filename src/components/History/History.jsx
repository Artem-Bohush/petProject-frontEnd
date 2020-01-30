import React from 'react';
import Table from './Table';
import Chart from './Chart';
import HistoryService from '../../services/HistoryService';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
                  <Chart chartData={this.props.chartData} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Table filteredRecords={this.props.filteredRecords} />
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
  }

  showDetails(row, btn) {
    if (btn.classList.contains('details-btn')) {
      this.props.showRecordDetailsCallBack(row.getAttribute('id'))
    }
  }
}

export default History;