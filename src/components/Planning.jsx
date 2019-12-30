import React from 'react';

class Planning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const progress = {
      width: '50%'
    };
    return (
      <>
        <div className="title-block">
          <h3 className="title">Планирование расходов</h3>
        </div>
        <div className="planning-content-block">
          <div className="row">
            <div className="col-md-12">
              <div className="planning-card">
                <div className="planning-card-header">
                  <h4 className="header-title">Расходы</h4>
                  <div className="balance">
                    <h4 className="balance-text">Общий остаток: </h4>
                    <span className="balance-value">78 999.21 </span>
                    <span className="icon-hryvnia-solid"></span>
                  </div>
                </div>
                <div className="planning-card-info">
                  <div className="row">
                    <div className="col-6">
                      <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar"
                          aria-valuenow="50" aria-valuemin="0"
                          aria-valuemax="100" style={progress}>
                          <span>категория</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <p> <span className="minus">300.00 </span>из
                                            <span className="total"> 1000.00 </span>| осталось
                                            <span className="result"> 700.00 </span>(грн.) </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="progress">
                        <div className="progress-bar bg-warning" role="progressbar"
                          aria-valuenow="75" aria-valuemin="0"
                          aria-valuemax="100" style={progress}>
                          <span>категория</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <p> <span className="minus">300.00 </span>из
                                                <span className="total"> 1000.00 </span>| осталось
                                                <span className="result"> 700.00 </span>(грн.)
                                            </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="progress">
                        <div className="progress-bar bg-danger" role="progressbar"
                          aria-valuenow="100" aria-valuemin="0"
                          aria-valuemax="100" style={progress}>
                          <span>категория</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <p> <span className="minus">300.00 </span>из
                                                <span className="total"> 1000.00 </span>| осталось
                                                <span className="result"> 700.00 </span>(грн.)
                                            </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Planning;