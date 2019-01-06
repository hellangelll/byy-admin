import request from '@/utils/request'

export function query_imgDocIndex(data) {
    return request({
        url: '/manager/imgDocIndexQuerySearch.do',
        method: 'post',
        data
    })
}

export function scan_img(data) {
    return request({
        url: '/manager/imgScan.do',
        method: 'post',
        data
    })
}

export function imgDocMainQuerySearch(data) {
    return request({
        url: '/manager/imgDocMainQuerySearch.do',
        method: 'post',
        data
    })
}