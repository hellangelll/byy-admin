import request from '@/utils/request'

export function initEdit_new() {
    return request({
        url: '/sysAppConfig/initEdit_new.do',
        method: 'get'
    })
}

export function save_new(data) {
    return request({
        url: '/sysAppConfig/save_new.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}