import request from '@/utils/request'

export function search(data) {
    return request({
        url: '/saaUser/search.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function save(data) {
    return request({
        url: '/saaUser/save.do',
        method: 'post',
        data
    })
}

export function delete_api(data) {
    return request({
        url: '/saaUser/delete.do',
        method: 'post',
        data
    })
}