import Vue from 'vue'
import iView from 'iview'
import {
    router
} from './router/index'
import {
    appRouter
} from './router/router'
import store from './store'
import App from './app.vue'
import $ from 'jquery'
import '../plugins/zTree/jquery-1.4.4.min.js'
import '../plugins/zTree/v3/js/jquery.ztree.core.js'
import '../plugins/zTree/v3/js/jquery.ztree.excheck.js'
import '../plugins/bootstrapTable/bootstrap-table.min.css'
import '../plugins/bootstrapTable/jquery.treegrid.min.css'
import '../plugins/bootstrapTable/bootstrap.min.js'
import '../plugins/bootstrapTable/bootstrap-table.min.js'
import '../plugins/bootstrapTable/jquery.treegrid.min.js'
import '../plugins/bootstrapTable/jquery.treegrid.bootstrap2.js'
import '@/locale'
import 'iview/dist/styles/iview.css'
import VueI18n from 'vue-i18n'
import util from './libs/util'

Vue.use(VueI18n)
Vue.use(iView)

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name
            // 显示打开的页面的列表
        this.$store.commit('setOpenedList')
        this.$store.commit('initCachepage')
            // 权限菜单过滤相关
        this.$store.commit('updateMenulist')
            // iview-admin检查更新
        // util.checkUpdate(this)
    },
    created() {
        let tagsList = []
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0])
            } else {
                tagsList.push(...item.children)
            }
        })
        this.$store.commit('setTagsList', tagsList)
    }
})