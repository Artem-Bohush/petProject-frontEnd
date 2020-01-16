import React from 'react';
import RecordService from '../../services/RecordService';

function DeleteCategory({ categories, retrieveCategories }) {

  return (
    <div className="record-card">
      <div className="record-card-header">
        <h4 className="header-title">Удалить категорию</h4>
      </div>
      <div className="record-card-block">
        <form onSubmit={deleteCategory}>
          <div className="form-group">
            <label htmlFor="select-delete">Выберите категорию</label>
            <select className="form-control" id="select-delete">
              {categories.map((category, index) => {
                return <option key={index} id={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Удалить</button>
        </form>
      </div>
    </div>
  )

  function deleteCategory(e) {
    e.preventDefault();
    const selectedIndex = document.getElementById('select-delete').selectedIndex;
    const options = document.getElementById('select-delete').options;
    if (options.length > 0) {
      const selectedCategoryId = options[selectedIndex].id;
      RecordService.deleteCategory({ id: selectedCategoryId })
        .then(() => {
          retrieveCategories();
        })
        .catch(error => console.error(error));
    }
  }
}

export default DeleteCategory;