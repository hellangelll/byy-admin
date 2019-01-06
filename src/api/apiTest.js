import request from '@/utils/request'

export function getApiData(data) {
    return request({
        url: '/apiTest/getApiData.do?token=' + data,
        method: 'get',
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    })
}

export function callApi(data) {
    return request({
        url: '/apiTest/callApi.do',
        method: 'post',
        data
    })
}

export function initImgUploadTest() {
    return request({
        url: '/apiTest/initImgUploadTest.do',
        method: 'get'
    })
}

export function imgScan(data) {
    return request({
        url: '/manager/imgScan.do',
        method: 'post',
        data
    })
}
export function newRecon() {
    return request({
        url: '/newRecon',
        method: 'get'
    })
}