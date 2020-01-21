import React, { useContext } from 'react';
// import Context from '../../context';

function ProgressBar({ planningProgressData, currentBalance }) {
  // const context = useContext(Context);

  return (
    <div className="planning-card">
      <div className="planning-card-header">
        <h4 className="header-title">Расходы</h4>
        <div className="balance">
          <h4 className="balance-text">Общий остаток: </h4>
          <span className="balance-value">{calculatePlanningBalance()}</span>
          <span className="icon-hryvnia-solid"></span>
        </div>
      </div>
      <div className="planning-card-info">
        {planningProgressData.map((record, index) => {
          return (
            <div className="row" key={index}>
              <div className="col-6">
                <div className="progress">
                  <div className={'progress-bar ' + defineProgressColor(record.percent)} role="progressbar"
                    aria-valuenow="30" aria-valuemin="0"
                    aria-valuemax="100" style={{ width: record.percent + '%' }}>
                  </div>
                  <span>{record.categoryName}</span>
                </div>
              </div>
              <div className="col-6">
                <p> <span className={'minus ' + defineFontColor(record.percent)}>{record.totalCategoryOutcome} </span>из
                <span className="total"> {record.categoryLimit} </span>| осталось
                <span className={'result ' + defineFontColor(record.percent)}> {record.categoryLimit - record.totalCategoryOutcome} грн.</span></p>
              </div>
            </div>
          )
        })
        }
      </div>
    </div >
  )

  function calculatePlanningBalance() {
    let totalOutcome = 0;
    planningProgressData.forEach(record => {
      totalOutcome += record.totalCategoryOutcome;
    })
    return currentBalance - totalOutcome;
  }

  function defineProgressColor(percent) {
    if (percent <= 50) {
      return 'bg-success'
    } else if (+percent <= 75) {
      return 'bg-warning'
    } else {
      return 'bg-danger'
    }
  }

  function defineFontColor(percent) {
    if (percent <= 75) {
      return 'success'
    } else {
      return 'danger'
    }
  }
}

export default ProgressBar;