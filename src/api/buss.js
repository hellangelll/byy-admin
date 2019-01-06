import request from '@/utils/request'

export function getTreeNodes(data) {
    return request({
        url: '/bussTree/getTreeNodes.ajax',
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

export function modifyBussType(data) {
    return request({
        url: '/bussTree/modifyBussType.json',
        method: 'post',
        data
    })
}

export function modifyRiskType(data) {
    return request({
        url: '/bussTree/modifyRiskType.json',
        method: 'post',
        data
    })
}

export function modifyCertiType(data) {
    return request({
        url: '/bussTree/modifyCertiType.json',
        method: 'post',
        data
    })
}

// 新增或保存

export function saveOrUpdateBussRisk_new(data) {
    return request({
        url: '/bussTree/saveOrUpdateBussRisk_new.do',
        method: 'post',
        data
    })
}

export function saveOrUpdateBussTypeTree_new(data) {
    return request({
        url: '/bussTree/saveOrUpdateBussTypeTree_new.do',
        method: 'post',
        data
    })
}

export function saveOrUpdateBussModule_new(data) {
    return request({
        url: '/bussTree/saveOrUpdateBussModule_new.do',
        method: 'post',
        data
    })
}

// 删除

export function deleteModule(data) {
    return request({
        url: '/bussTree/deleteModule_new.do',
        method: 'post',
        data
    })
}

export function deleteRisk(data) {
    return request({
        url: '/bussTree/deleteRisk_new.do',
        method: 'post',
        data
    })
}

export function deleteTypeTree(data) {
    return request({
        url: '/bussTree/deleteTypeTree_new.do',
        method: 'post',
        data
    })
}

export function search_role(data) {
    return request({
        url: '/bussRole/search_new.do',
        method: 'post',
        data
    })
}

export function save_role(data) {
    return request({
        url: '/bussRole/save_new.do',
        method: 'post',
        data
    })
}

export function edit_role(data) {
    return request({
        url: '/bussRole/edit_new.do',
        method: 'post',
        data
    })
}

export function delete_role(data) {
    return request({
        url: '/bussRole/delete_new.do',
        method: 'post',
        data
    })
}

export function initEditQuery_new(data) {
    return request({
        url: '/bussRolePower/initEditQuery_new.do?&roleCode=' + data,
        method: 'get'
    })
}

export function getRisk(data) {
    return request({
        url: '/bussRolePower/getRisk.json',
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

export function searchRolePower(data) {
    return request({
        url: '/bussRolePower/searchRolePower.json',
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