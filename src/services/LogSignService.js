import axios from 'axios';

const API_URL = 'http://localhost:8080';

class LogSignService {

    checkEmail(emailData) {
        return axios.put(`${API_URL}/checkEmail`, emailData);
    }

    signUp(newUserData) {
        return axios.post(`${API_URL}/signup`, newUserData);
    }

}

export default new LogSignService();