import React from 'react';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { i: 0 };
  }

  render() {
    return (
      <>
        <div className="title-block">
          <h3 className="title">Страница истории</h3>
        </div>
        <div className="history-content-block">
          <div className="row">
            <div className="col-md-12">
              <div className="history-card">
                <div className="chart">
                  График
                                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="history-card">
                <div className="history-card-header">
                  <h4 className="header-title">Список событий</h4>
                  <div className="search-block">
                    <input type="text" className="form-control" placeholder="Поиск...">
                    </input>
                    <div className="select">
                      <select defaultValue="0">
                        <option value="0" disabled hidden>Параметр</option>
                        <option value="1">Вариант 1</option>
                        <option value="2">Вариант 2</option>
                        <option value="3">Вариант 3</option>
                        <option value="4">Вариант 4</option>
                        <option value="5">Вариант 5</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="history-card-info">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Дата</th>
                        <th scope="col">Категория</th>
                        <th scope="col">Тип</th>
                        <th scope="col">Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {this.props.historyTable.map(record => {
                                                return(
                                                    <tr key={record.id}
                                                        id={record.id} 
                                                        onClick={(e) => this.showDetails(e.currentTarget, e.target)}>
                                                        <th scope="row">{record.id}</th>
                                                        <td>{record.value}</td>
                                                        <td>{record.date}</td>
                                                        <td>{record.category}</td>
                                                        <td>{
                                                            record.type === 'income' ? 
                                                            <div className="income">доход</div> : 
                                                            <div className="expense">расход</div>
                                                            }</td>
                                                        <td><button className="details-btn">
                                                            Подробнее</button></td>
                                                    </tr>
                                                )
                                            })
                                        } */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
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
}

export default History;