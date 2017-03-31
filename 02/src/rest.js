import axios from 'axios';
const REST_URL = 'http://skoleni.anywhere.cz/react/remindme/api';

export default {
    get: function (url, params) {
        return axios.get(REST_URL + url, params);
    },

    post: function (url, params) {
        return axios.post(REST_URL + url, params);
    },

    delete: function (url) {
        return axios.delete(REST_URL + url);
    }
}