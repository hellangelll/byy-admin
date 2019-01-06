import {
    imgDocIndexQuerySearch
} from '@/api/manager'

const manager = {
    state: {
        imgDocIndexVos: {}
    },
    mutations: {
        SEARCH_IMGDOCI_INDEX: (state, imgDocIndexVos) => {
            state.imgDocIndexVos = imgDocIndexVos
        }
    },
    actions: {
        SerachImgDocIndex({
            commit
        }, formValidate) {
            return new Promise((resolve, reject) => {
                imgDocIndexQuerySearch(formValidate).then(response => {
                    if (!response.data) {
                        reject('error')
                    }
                    if (response.data.length > 0) {
                        commit('SEARCH_IMGDOCI_INDEX', response.data)
                    } else {
                        reject('getImgDocIndexVos: imgDocIndexVos must be a non-null array !')
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default manager