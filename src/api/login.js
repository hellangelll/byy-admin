import request from '@/utils/request'

export function login(data) {
    return request({
        url: '../login',
        method: 'post',
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function welcome_new() {
    return request({
        url: '/welcome_new.do',
        method: 'get'
    })
}