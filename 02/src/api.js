import rest from './rest';

export default {
    getNoticeList: function () {
        return rest.get('/notice');
    }
}