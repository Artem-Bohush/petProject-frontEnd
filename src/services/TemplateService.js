import info from './Info';

class TemplateService {

  async retrieveUserName() {
    const response = await fetch(`${info.API_URL}/template/getUsername`, {
      headers: {
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      }
    });
    return await response.json();
  }
}

export default new TemplateService();