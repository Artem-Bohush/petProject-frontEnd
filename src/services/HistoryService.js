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
}

export default new HistoryService();