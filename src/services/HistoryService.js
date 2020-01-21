import info from './Info';

class HistoryService {

  async retrieveRecords() {
    const response = await fetch(`${info.API_URL}/history/getRecords`, {
      headers: {
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      }
    })
    return response.json();
  }

  async retrieveChartData() {
    const response = await fetch(`${info.API_URL}/history/getChartData`, {
      headers: {
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      }
    })
    return response.json();
  }

  deleteRecord(recordId) {
    return fetch(`${info.API_URL}/history/deleteRecord`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify({ id: recordId })
    });
  }
}

export default new HistoryService();