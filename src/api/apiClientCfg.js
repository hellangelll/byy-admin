import request from '@/utils/request'

export function search(data) {
    return request({
        url: '/apiClientCfg/search.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function save(data) {
    return request({
        url: '/apiClientCfg/save.do',
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

export function delete_api(data) {
    return request({
        url: '/apiClientCfg/delete_new.do',
        method: 'post',
        data
    })
}

export function clientAuthEdit_new(data) {
    return request({
        url: '/apiClientCfg/clientAuthEdit_new.do?clientId=' + data,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function clientAuthSave(data) {
    return request({
        url: '/apiClientCfg/clientAuthSave.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}