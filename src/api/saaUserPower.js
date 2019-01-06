import request from '@/utils/request'

export function initQuery_new() {
    return request({
        url: '/saaUserPower/initQuery_new.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function getUsers(data) {
    return request({
        url: '/saaUserPower/getUsers.json',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        data
    })
}

export function getGrades(data) {
    return request({
        url: '/saaUserPower/getGrades.json',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        data
    })
}

export function search(data) {
    return request({
        url: '/saaUserPower/search.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function save(data) {
    return request({
        url: '/saaUserPower/save.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function delete_api(data) {
    return request({
        url: '/saaUserPower/delete.do',
        method: 'post',
        data: data
    })
}