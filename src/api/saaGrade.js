import request from '@/utils/request'

export function initTree_new() {
    return request({
        url: '/saaGrade/initTree_new.do',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export function addOrModify(data) {
    return request({
        url: '/saaGrade/addOrModify_new.do',
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

export function saveGrade(data) {
    return request({
        url: '/saaGrade/saveGrade.do',
        method: 'post',
        data
    })
}

export function getTreeNodes(data) {
    return request({
        url: '/saaGrade/getTreeNodes.ajax',
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