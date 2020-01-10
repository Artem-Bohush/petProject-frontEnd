import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {this.state.isOpen &&
          <>
            <div className="details-title-block">
              <div onClick={() => this.goBackToHistory()}>
                <span className="icon-arrow-left-solid"></span>
              </div>
              {/* <h3 className="title">Страница записи № {this.props.recordDetails.id}</h3> */}
              <h3 className="title">Страница записи № 228</h3>
            </div>
            <div>
              {
                // this.props.recordDetails.type === 'income' ?
                true ?
                  <div className="details-card-income">
                    <div className="details-card-header">Доход</div>
                    <div className="details-card-block">
                      <ul>
                        <li>Сумма: <span>{this.props.recordDetails.value}</span></li>
                        <li>Категория: <span>{this.props.recordDetails.category}</span></li>
                        <li>Описание: <span>{this.props.recordDetails.descr}</span></li>
                      </ul>
                    </div>
                    <div className="details-card-footer">{this.props.recordDetails.date}</div>
                  </div>
                  :
                  <div className="details-card-expense">
                    <div className="details-card-header">Расход</div>
                    <div className="details-card-block">
                      <ul>
                        <li>Сумма: <span>{this.props.recordDetails.value}</span></li>
                        <li>Категория: <span>{this.props.recordDetails.category}</span></li>
                        <li>Описание: <span>{this.props.recordDetails.descr}</span></li>
                      </ul>
                    </div>
                    <div className="details-card-footer">{this.props.recordDetails.date}</div>
                  </div>
              }
            </div>
          </>
        }
      </>
    )
  }

  goBackToHistory() {
    this.props.goBackToHistoryCallBack()
  }
}

export default Details;