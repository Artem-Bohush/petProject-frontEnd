import React, { useEffect } from 'react';
import RecordService from '../../services/RecordService';

function EditCategory({ categories, retrieveCategories }) {
  useEffect(() => {
    setCategoryData();
  })

  return (
    <div className="record-card">
      <div className="record-card-header">
        <h4 className="header-title">Редактировать категорию</h4>
      </div>
      <div className="record-card-block">
        <form onSubmit={editCategory}>
          <div className="form-group">
            <label htmlFor="select-edit">Выберите категорию</label>
            <select className="form-control" id="select-edit" onChange={setCategoryData}>
              {categories.map((category, index) => {
                return <option key={index} id={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="edit-category-name">Изменить название</label>
            <input type="text" id="edit-category-name" className="form-control"></input>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="edit-category-limit">Изменить лимит</label>
            <input type="number" id="edit-category-limit" className="form-control"></input>
          </div>
          <button type="submit" className="btn btn-primary">Редактировать</button>
        </form>
      </div>
    </div>
  )

  function editCategory(e) {
    e.preventDefault();
    const selectedIndex = document.getElementById('select-edit').selectedIndex,
      options = document.getElementById('select-edit').options,
      nameInp = document.querySelector('#edit-category-name'),
      limitInp = document.querySelector('#edit-category-limit');
    if (options[selectedIndex] !== undefined) {
      const newCategoryData = {
        id: options[selectedIndex].id,
        name: nameInp.value,
        lim: limitInp.value
      }
      RecordService.editCategory(newCategoryData)
        .then(() => {
          nameInp.value = '';
          limitInp.value = '';
          retrieveCategories();
        })
        .catch(error => console.error(error));
    }
  }

  function setCategoryData() {
    const selectedIndex = document.getElementById('select-edit').selectedIndex;
    const options = document.getElementById('select-edit').options;
    if (options.length > 0) {
      const selectedCategoryId = +options[selectedIndex].id;
      categories.forEach(category => {
        if (category.id === selectedCategoryId) {
          document.querySelector('#edit-category-name').value = category.name;
          document.querySelector('#edit-category-limit').value = category.lim;
          return;
        }
      })
    } else {
      document.querySelector('#edit-category-name').value = '';
      document.querySelector('#edit-category-limit').value = '';
    }
  }
}

export default EditCategory;