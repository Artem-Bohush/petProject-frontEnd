import React from 'react';
import RecordService from '../../services/RecordService';

function AddRecord({ categories }) {

  return (
    <div className="record-card">
      <div className="record-card-header">
        <h4 className="header-title">Добавить запись</h4>
      </div>
      <div className="record-card-block">
        <form onSubmit={add}>
          <div className="form-group">
            <label className="control-label">Выберите тип</label>
            <div className="radio-types">
              <div className="radio" onClick={disableDateChoice}>
                <input type="radio" className="radio-input"
                  name="radios" id="radio-1" />
                <label className="radio-label" htmlFor="radio-1">Доход</label>
              </div>
              <div className="radio" onClick={disableDateChoice}>
                <input type="radio" className="radio-input"
                  name="radios" id="radio-2" />
                <label className="radio-label" htmlFor="radio-2">Расход</label>
              </div>
              <div className="radio" onClick={enableDateChoice}>
                <input type="radio" className="radio-input"
                  name="radios" id="radio-3" />
                <label className="radio-label" htmlFor="radio-3">Планирование</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="select-addRecord">Выберите категорию</label>
            <select className="form-control" id="select-addRecord">
              {categories.map((category, index) => {
                return <option key={index} id={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="category-descr">Введите описание</label>
            <input type="text" id="category-descr" className="form-control"></input>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="category-sum">Введите суму</label>
            <input type="number" id="category-sum" className="form-control"></input>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="category-date">Выберите дату</label>
            <input disabled type="date" id="category-date" className="form-control"></input>
          </div>
          <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
      </div>
    </div>
  )

  function add(e) {
    e.preventDefault();
    let isChecked = false;
    const radioBtns = Array.from(document.getElementsByClassName('radio-input')),
      descInp = document.querySelector('#category-descr'),
      sumInp = document.querySelector('#category-sum'),
      dateInp = document.querySelector('#category-date'),
      selectedIndex = document.getElementById('select-addRecord').selectedIndex,
      options = document.getElementById('select-addRecord').options;

    radioBtns.forEach(btn => {
      if (btn.checked) {
        isChecked = true;
      }
    })

    if (isChecked === true && descInp !== '' && sumInp !== '' && options.length > 0) {
      const selectedCategoryId = options[selectedIndex].id;
      const newRecordData = {
        description: descInp.value,
        sum: sumInp.value,
        categoryId: selectedCategoryId
      }
      if (radioBtns[2].checked) {
        newRecordData.type = 'planning';
        newRecordData.planningDate = dateInp.value;
        RecordService.addRecord(newRecordData)
          .then(() => {
            descInp.value = '';
            sumInp.value = '';
            dateInp.value = '';
          })
          .catch(error => console.error(error));
      } else {
        radioBtns[0].checked ? newRecordData.type = 'income' : newRecordData.type = 'outcome';
        RecordService.addRecord(newRecordData)
          .then(() => {
            descInp.value = '';
            sumInp.value = '';
            dateInp.value = '';
          })
          .catch(error => console.error(error));
      }
    }
  }

  function disableDateChoice() {
    let t = document.querySelector('#category-date')
    if (t.disabled !== true) {
      t.disabled = true
    }
  }

  function enableDateChoice() {
    let t = document.querySelector('#category-date')
    if (t.disabled === true) {
      t.disabled = false
    }
  }
}

export default AddRecord;