import request from '@/utils/request'

export function search(data) {
    return request({
        url: '/apiServiceCfg/search.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function save(data) {
    return request({
        url: '/apiServiceCfg/save.do',
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
        url: '/apiServiceCfg/delete_new.do',
        method: 'post',
        data: data
    })
}