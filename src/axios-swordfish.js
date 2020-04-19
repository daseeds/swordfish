import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://swordfish-dev.firebaseio.com/'
});

export default instance;