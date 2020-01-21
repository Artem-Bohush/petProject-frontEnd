import React, { useContext } from 'react';
import Context from '../../context';

function PlanningTable({ planningTableData }) {
  const context = useContext(Context);

  return (
    <div className="planning-card">
      <div className="planning-card-header">
        <h4 className="header-title">Запланированные расходы</h4>
      </div>
      <div className="planning-card-info">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Сумма</th>
              <th scope="col">Категория</th>
              <th scope="col">Описание</th>
              <th scope="col">Тип</th>
              <th scope="col">Действие</th>
            </tr>
          </thead>
          <tbody>
            {planningTableData.map((record, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{record.recordOutcome}</td>
                  <td>{record.categoryName}</td>
                  <td>{record.descr}</td>
                  <td><div className="planning">планирование</div></td>
                  <td><button className="delete-btn" id={record.recordId + 1}
                    onClick={(e) => context.deleteRecord(e.target)}>Удалить</button></td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div >
  )

}

export default PlanningTable;