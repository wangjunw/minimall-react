import axios from 'axios';
import qs from 'querystring';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
export const _get = (url = '', params = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params })
            .then(res => {
                if (res.status !== 200) {
                    reject({ message: '数据响应失败' });
                }
                resolve(res.data);
            })
            .catch(err => {
                reject({ message: '求情失败' });
            });
    });
};
export const _post = (url = '', params = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(params))
            .then(res => {
                if (res.status !== 200) {
                    reject({ message: '数据响应失败' });
                }
                resolve(res.data);
            })
            .catch(() => {
                reject({ message: '请求失败' });
            });
    });
};
