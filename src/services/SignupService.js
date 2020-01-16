import info from './Info';

class LogSignService {

  // checkEmail(emailData) {
  //   return axios.put(`${API_URL}/checkEmail`, emailData);
  // }

  executeSignup(newUserData) {
    return fetch(`${info.API_URL}/authentication/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newUserData)
    });
  }

}

export default new LogSignService();