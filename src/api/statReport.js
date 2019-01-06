import request from '@/utils/request'

export function search_new(data) {
    return request({
        url: '/statReport/search.json',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}