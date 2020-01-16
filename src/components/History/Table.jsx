import React from 'react';

function Table({ records }) {
  return (
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
            {records.map((record, index) => {
              return (
                <tr key={index}
                  id={record.id}
                  onClick={(e) => this.showDetails(e.currentTarget, e.target)}>
                  <th scope="row">{index + 1}</th>
                  <td>{record.sum}</td>
                  <td>{record.created}</td>
                  <td>{record.categoryName}</td>
                  <td>{
                    record.type === 'income' ?
                      <div className="income">доход</div> :
                      <div className="outcome">расход</div>
                  }</td>
                  <td><button className="details-btn">Подробнее</button></td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table;