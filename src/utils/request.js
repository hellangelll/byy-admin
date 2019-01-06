import axios from 'axios'
import store from '@/store'
import qs from 'qs'

const service = axios.create({
        baseURL: 'http://localhost:9527/h5img/admin',
        withCredentials: true
    })
    /* 请求拦截 */
service.interceptors.request.use(config => {
        return config
    }, error => {
        console.log(error)
        Promise.reject(error)
    })
    /* 响应拦截 */
service.interceptors.response.use(
    response => response, error => {
        console.log('err', error)
        return Promise.reject(error)
    })

export default service