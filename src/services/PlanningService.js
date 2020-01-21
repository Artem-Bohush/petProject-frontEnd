import info from './Info';

class PlanningService {

  async retrievePlanningProgressData() {
    const response = await fetch(`${info.API_URL}/planning/getPlanningProgressData`, {
      headers: {
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      }
    })
    return response.json();
  }
  async retrievePlanningTableData() {
    const response = await fetch(`${info.API_URL}/planning/getPlanningTableData`, {
      headers: {
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      }
    })
    return response.json();
  }
}

export default new PlanningService();