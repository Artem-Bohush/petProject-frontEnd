import React, { useContext } from 'react';
import Context from '../../context';

function Table({ filteredRecords }) {
  const context = useContext(Context);

  return (
    <div className="history-card">
      <div className="history-card-header">
        <h4 className="header-title">Список событий</h4>
        <div className="search-block">
          <input type="text" id="search-input" className="form-control" placeholder="Поиск..."
            onInput={doSearch}>
          </input>
          <span>Искать по:</span>
          <div className="select-history">
            <select defaultValue="0" id="select-history" onChange={doSearch}>
              <option value="0" disabled hidden>Параметр</option>
              <option value="1">Сумма</option>
              <option value="2">Дата</option>
              <option value="3">Категория</option>
              <option value="4">Тип</option>
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
            {filteredRecords.map((record, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{record.sum}</td>
                  <td>{record.date}</td>
                  <td>{record.categoryName}</td>
                  <td>{
                    record.type === 'income' ?
                      <div className="income">доход</div> :
                      <div className="outcome">расход</div>
                  }</td>
                  <td><button className="details-btn" id={record.id}
                    onClick={(e) => context.showDetails(e.target)}>Подробнее</button>
                    <button className="delete-btn" id={record.id + 1}
                      onClick={(e) => context.deleteRecord(e.target)}>Удалить</button>
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )

  function doSearch() {
    const searchThis = document.querySelector('#search-input').value;
    const selectedIndex = document.getElementById('select-history').selectedIndex;
    const options = document.getElementById('select-history').options;
    const searchBy = options[selectedIndex].textContent;
    if (searchBy !== 'Параметр') {
      searchThis !== '' ? context.doHistorySearch(searchThis.toLocaleLowerCase(), searchBy) :
        context.retrieveRecords();
    }
  }
}

export default Table;