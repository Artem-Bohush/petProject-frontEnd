import info from './Info';

class RecordService {

  async retrieveCategories() {
    const response = await fetch(`${info.API_URL}/record/getCategories`, {
      headers: {
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      }
    })
    return response.json();
  }

  addRecord(newRecord) {
    return fetch(`${info.API_URL}/record/addRecord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify(newRecord)
    });
  }

  addCategory(newCategory) {
    return fetch(`${info.API_URL}/record/addCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify(newCategory)
    });
  }

  editCategory(newCategoryData) {
    return fetch(`${info.API_URL}/record/editCategory`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify(newCategoryData)
    })
  }

  deleteCategory(categoryIdObj) {
    return fetch(`${info.API_URL}/record/deleteCategory`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify(categoryIdObj)
    });
  }
}

export default new RecordService();