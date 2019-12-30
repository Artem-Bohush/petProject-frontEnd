import React from 'react';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="title-block">
          <h3 className="title">Страница записей</h3>
        </div>
        <div className="record-content-block">
          <div className="row">
            <div className="col-md-6">
              <div className="record-card">
                <div className="record-card-header">
                  <h4 className="header-title">Добавить событие</h4>
                </div>
                <div className="record-card-block">
                  <form>
                    <div className="form-group">
                      <label className="control-label">Выберите тип</label>
                      <div className="radio-types">
                        <div className="radio" onClick={() => this.disableDateChoice()}>
                          <input type="radio" className="radio-input"
                            name="radios" id="radio-1" />
                          <label className="radio-label" htmlFor="radio-1">Доход</label>
                        </div>
                        <div className="radio" onClick={() => this.disableDateChoice()}>
                          <input type="radio" className="radio-input"
                            name="radios" id="radio-2" />
                          <label className="radio-label" htmlFor="radio-2">Расход</label>
                        </div>
                        <div className="radio" onClick={() => this.enableDateChoice()}>
                          <input type="radio" className="radio-input"
                            name="radios" id="radio-3" />
                          <label className="radio-label" htmlFor="radio-3">Планирование</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">Выберите категорию</label>
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>Category</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="category-name">Введите описание</label>
                      <input type="text" id="category-name" className="form-control"></input>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="amount">Введите суму</label>
                      <input type="number" id="amount" className="form-control"></input>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="date">Выберите дату</label>
                      <input disabled type="date" id="date" className="form-control"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Добавить</button>
                  </form>
                </div>
              </div>
              <div className="record-card">
                <div className="record-card-header">
                  <h4 className="header-title">Удалить категорию</h4>
                </div>
                <div className="record-card-block">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">Выберите категорию</label>
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>Category</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Удалить</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="record-card">
                <div className="record-card-header">
                  <h4 className="header-title">Добавить категорию</h4>
                </div>
                <div className="record-card-block">
                  <form>
                    <div className="form-group">
                      <label className="control-label">Выберите тип</label>
                      <div className="radio-types">
                        <div className="radio-two">
                          <input type="radio" className="radio-input"
                            name="radios" id="radio-4" />
                          <label className="radio-label" htmlFor="radio-4">Доход</label>
                        </div>
                        <div className="radio">
                          <input type="radio" className="radio-input"
                            name="radios" id="radio-5" />
                          <label className="radio-label" htmlFor="radio-5">Расход</label>
                        </div>
                        <div className="radio">
                          <input type="radio" className="radio-input"
                            name="radios" id="radio-6" />
                          <label className="radio-label" htmlFor="radio-6">Планирование</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="category-name">Введите название</label>
                      <input type="text" id="category-name" className="form-control"></input>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="category-limit">Введите лимит</label>
                      <input type="number" id="category-limit" className="form-control"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Добавить</button>
                  </form>
                </div>
              </div>
              <div className="record-card">
                <div className="record-card-header">
                  <h4 className="header-title">Редактировать категорию</h4>
                </div>
                <div className="record-card-block">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">Выберите категорию</label>
                      <select className="form-control" id="exampleFormControlSelect1">
                        <option>Category</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="category-name">Изменить название</label>
                      <input type="text" id="category-name" className="form-control"></input>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="category-limit">Изменить лимит</label>
                      <input type="number" id="category-limit" className="form-control"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Редактировать</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  disableDateChoice() {
    let t = document.querySelector('#date')
    if (t.disabled !== true) {
      t.disabled = true
    }
  }

  enableDateChoice() {
    let t = document.querySelector('#date')
    if (t.disabled === true) {
      t.disabled = false
    }
  }
}

export default Record;