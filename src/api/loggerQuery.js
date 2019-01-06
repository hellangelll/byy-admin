import request from '@/utils/request'

export function operationLogSearch(data) {
    return request({
        url: '/loggerQuery/operationLogSearch.do',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}