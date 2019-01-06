import request from '@/utils/request'
export function initQuery() {
    return request({
        url: '/imgHistoricalLog/initQuery_new.do',
        method: 'get'
    })
}

export function startExecute(data) {
    return request({
        url: '/imgHistoricalLog/startExecute.ajax',
        method: 'post',
        data
    })
}

export function stopExecute(data) {
    return request({
        url: '/imgHistoricalLog/stopExecute.ajax',
        method: 'post',
        data
    })
}
// 刷新查询
export function search(data) {
    return request({
        url: '/imgHistoricalLog/search.do',
        method: 'post',
        data
    })
}

// 查询是否正在运行
export function getRunningStatus() {
    return request({
        url: '/imgHistoricalLog/getRunningStatus.do',
        method: 'post'
    })
}