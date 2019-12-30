import axios from 'axios';

const API_URL = 'http://localhost:8080';

class MainService {

    retrieveCurrentBalance() {
        return axios.get(`${API_URL}/currentBalance`);
    }

    setNewBalance() {
        return axios.put(`${API_URL}/newBalance`);
    }
}

export default new MainService();