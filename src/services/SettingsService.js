import info from './Info';
// import axios from 'axios';

class SettingsService {

  async setNewEmail(newEmail) {
    let response = await fetch(`${info.API_URL}/settings/setEmail`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify({ email: newEmail })
    });
    return await response.json();
  }

  async checkPassword(password) {
    let response = await fetch(`${info.API_URL}/settings/checkPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify({ password: password })
    });
    return await response.json();
  }

  setNewPassword(newPassword) {
    return fetch(`${info.API_URL}/settings/setPassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify({ password: newPassword })
    });
  }

  setNewUsername(newUsername) {
    return fetch(`${info.API_URL}/settings/setUsername`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      },
      body: JSON.stringify({ username: newUsername })
    });
  }

  async getCurrentUserData() {
    const response = await fetch(`${info.API_URL}/settings/getCurrentData`, {
      headers: {
        authorization: sessionStorage.getItem(info.SESSION_NAME)
      }
    });
    return await response.json();
  }
}

export default new SettingsService();