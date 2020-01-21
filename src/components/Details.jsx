import React from 'react';

function Details(props) {
  return (
    <>
      {props.isOpen &&
        <>
          <div className="details-title-block">
            <div onClick={() => props.showDetails()} >
              <span className="icon-arrow-left-solid"></span>
            </div>
            {/* <h3 className="title">Страница записи № {props.selectedRecord.number}</h3> */}
          </div>
          <div>
            <div className={props.selectedRecord.type === 'income' ?
              "details-card-income" : "details-card-expense"}>
              <div className="details-card-header">{props.selectedRecord.type === 'income' ? 'Доход' : 'Расход'}</div>
              <div className="details-card-block">
                <ul>
                  <li>Сумма: <span>{props.selectedRecord.sum}</span></li>
                  <li>Категория: <span>{props.selectedRecord.categoryName}</span></li>
                  <li>Описание: <span>{props.selectedRecord.description}</span></li>
                </ul>
              </div>
              <div className="details-card-footer">{props.selectedRecord.date + ', ' + props.selectedRecord.time}</div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Details;