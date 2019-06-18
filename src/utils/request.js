import axios from 'axios';
import qs from 'querystring';
const {hostname, port, timeout} = require('../../config/config'); 
axios.defaults.baseURL = `${hostname}:${port}`;
axios.defaults.timeout = timeout;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const $get = (url = '', params = {})=>{
    return new Promise((resolve, reject)=>{
        axios.get(url + url,{params}).then(res=>{
            if(res.status !== 200){
                reject({message: '数据响应失败'});
            }
            resolve(res.data);
        }).catch(err=>{
            reject({message: '求情失败'});
        });
    })
}
export const $post = (url = '', params = {})=>{
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
}