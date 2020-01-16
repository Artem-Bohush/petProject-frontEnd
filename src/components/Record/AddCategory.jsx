import React from 'react';
import RecordService from '../../services/RecordService';

function AddCategory({ retrieveCategories }) {
  return (
    <div className="record-card">
      <div className="record-card-header">
        <h4 className="header-title">Добавить категорию</h4>
      </div>
      <div className="record-card-block">
        <form className="new-category-form" onSubmit={add}>
          <div className="form-group">
            <label className="category-name" htmlFor="category-name">Введите название</label>
            <input type="text" id="category-name" className="form-control" name="name"></input>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="category-limit">Введите лимит</label>
            <input type="number" id="category-limit" className="form-control" name="lim"></input>
          </div>
          <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
      </div>
    </div>
  )

  function add(e) {
    e.preventDefault();
    const form = document.querySelector('.new-category-form'),
      name = document.querySelector('#category-name'),
      limit = document.querySelector('#category-limit'),
      formData = new FormData(form),
      newCategory = {};

    if (name.value !== '' && limit.value !== '') {
      formData.forEach(function (value, key) {
        newCategory[key] = value;
      });
      RecordService.addCategory(newCategory)
        .then(() => {
          name.value = '';
          limit.value = '';
          retrieveCategories();
        })
        .catch(error => console.error(error));
    }
  }
}

export default AddCategory;