import info from './Info';
class LoginSignupService {

  async executeCheckingEmail(email) {
    let response = await fetch(`${info.API_URL}/authentication/checkEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email })
    });
    return await response.json();
  }

  async executeJwtAuthenticationService(email, password) {
    let response = await fetch(`${info.API_URL}/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  }

  registerSuccessfulLoginForJwt(token) {
    sessionStorage.setItem(info.SESSION_NAME, 'Bearer_' + token);
  }

  executeSignup(newUserData) {
    return fetch(`${info.API_URL}/authentication/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newUserData)
    });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(info.SESSION_NAME);
    return user === null ? false : true;
  }

  logout() {
    sessionStorage.removeItem(info.SESSION_NAME);
  }

  // get tokenValue() {
  //   return this.token;
  // }

  // createJWTToken(token) {
  //   return 'Bearer_' + token
  // }

  // executeBasicAuthentication(username, password) {
  //   return axios.get(`${API_URL}/basicauth`,
  //     { headers: { authorization: this.createBasicAuthToken(username, password) } });
  // }

  // createBasicAuthToken(username, password) {
  //   return 'Basic ' + window.btoa(username + ":" + password);
  // }

  // registerSuccessfulLogin(username, password) {
  //   sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  //   this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
  // }

  // setupAxiosInterceptors(token) {
  //   axios.interceptors.request.use(
  //     (config) => {
  //       if (this.isUserLoggedIn()) {
  //         config.headers.authorization = token;
  //       }
  //       return config;
  //     }
  //   )
  // }
}

export default new LoginSignupService()