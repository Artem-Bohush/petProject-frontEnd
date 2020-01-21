import React from 'react';
import ProgressBar from './ProgressBar';
import PlanningTable from './PlanningTable';

class Planning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {this.props.isOpen &&
          <>
            <div className="title-block">
              <h3 className="title">Планирование расходов</h3>
            </div>
            <div className="planning-content-block">
              <div className="row">
                <div className="col-md-12">
                  <ProgressBar planningProgressData={this.props.planningProgressData}
                    currentBalance={this.props.currentBalance} />
                </div>
              </div>
              <div className="row" id="table">
                <div className="col-md-12">
                  <PlanningTable planningTableData={this.props.planningTableData} />
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
  }
}

export default Planning;