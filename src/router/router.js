import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () =>
        import ('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: {
                i18n: 'home'
            },
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'order-info',
            component: () =>
                import ('@/views/advanced-router/component/order-info.vue')
        }, // 用于展示动态路由
        {
            path: 'shopping',
            title: '购物详情',
            name: 'shopping',
            component: () =>
                import ('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
        {
            path: 'message',
            title: '消息中心',
            name: 'message_index',
            component: () =>
                import ('@/views/message/message.vue')
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [{
            path: 'index',
            title: '权限管理',
            name: 'access_index',
            component: () =>
                import ('@/views/access/access.vue')
        }]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '权限测试页',
            name: 'accesstest_index',
            access: 0,
            component: () =>
                import ('@/views/access/access-test.vue')
        }]
    },
    {
        path: '/international',
        icon: 'earth',
        title: {
            i18n: 'international'
        },
        name: 'international',
        component: Main,
        children: [{
            path: 'index',
            title: {
                i18n: 'international'
            },
            name: 'international_index',
            component: () =>
                import ('@/views/international/international.vue')
        }]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        component: Main,
        children: [{
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: () =>
                    import ('@/views/my-components/text-editor/text-editor.vue')
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: () =>
                    import ('@/views/my-components/markdown-editor/markdown-editor.vue')
            },
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: () =>
                    import ('@/views/my-components/image-editor/image-editor.vue')
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: () =>
                    import ('@/views/my-components/draggable-list/draggable-list.vue')
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: () =>
                    import ('@/views/my-components/area-linkage/area-linkage.vue')
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: () =>
                    import ('@/views/my-components/file-upload/file-upload.vue')
            },
            {
                path: 'scroll-bar',
                icon: 'android-upload',
                name: 'scroll-bar',
                title: '滚动条',
                component: () =>
                    import ('@/views/my-components/scroll-bar/scroll-bar-page.vue')
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                // component: () => import('@/views/my-components/count-to/count-to.vue')
                component: () =>
                    import ('@/views/my-components/count-to/count-to.vue')
            },
            {
                path: 'split-pane-page',
                icon: 'ios-pause',
                name: 'split-pane-page',
                title: 'split-pane',
                component: () =>
                    import ('@/views/my-components/split-pane/split-pane-page.vue')
            }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: Main,
        children: [{
                path: 'artical-publish',
                title: '文章发布',
                name: 'artical-publish',
                icon: 'compose',
                component: () =>
                    import ('@/views/form/article-publish/article-publish.vue')
            },
            {
                path: 'workflow',
                title: '工作流',
                name: 'workflow',
                icon: 'arrow-swap',
                component: () =>
                    import ('@/views/form/work-flow/work-flow.vue')
            }

        ]
    },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: Main,
        children: [{
                path: 'dragableTable',
                title: '可拖拽排序',
                name: 'dragable-table',
                icon: 'arrow-move',
                component: () =>
                    import ('@/views/tables/dragable-table.vue')
            },
            {
                path: 'editableTable',
                title: '可编辑表格',
                name: 'editable-table',
                icon: 'edit',
                component: () =>
                    import ('@/views/tables/editable-table.vue')
            },
            {
                path: 'searchableTable',
                title: '可搜索表格',
                name: 'searchable-table',
                icon: 'search',
                component: () =>
                    import ('@/views/tables/searchable-table.vue')
            },
            {
                path: 'exportableTable',
                title: '表格导出数据',
                name: 'exportable-table',
                icon: 'code-download',
                component: () =>
                    import ('@/views/tables/exportable-table.vue')
            },
            {
                path: 'table2image',
                title: '表格转图片',
                name: 'table-to-image',
                icon: 'images',
                component: () =>
                    import ('@/views/tables/table-to-image.vue')
            }
        ]
    },
    {
        path: '/advanced-router',
        icon: 'ios-infinite',
        name: 'advanced-router',
        title: '高级路由',
        component: Main,
        children: [{
                path: 'mutative-router',
                title: '动态路由',
                name: 'mutative-router',
                icon: 'link',
                component: () =>
                    import ('@/views/advanced-router/mutative-router.vue')
            },
            {
                path: 'argument-page',
                title: '带参页面',
                name: 'argument-page',
                icon: 'android-send',
                component: () =>
                    import ('@/views/advanced-router/argument-page.vue')
            }
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [{
            path: 'index',
            title: '错误页面',
            name: 'errorpage_index',
            component: () =>
                import ('@/views/error-page/error-page.vue')
        }]
    },
    {
        path: '/manager',
        icon: 'android-checkbox',
        name: 'manager',
        title: '影像管理',
        component: Main,
        children: [{
                path: 'img-doc-index-query',
                title: '影像文件查询',
                name: 'img-doc-index-query',
                icon: 'search',
                component: () =>
                    import ('@/views/manager/ImgDocIndexQuery/ImgDocIndexQuery.vue')
            },
            {
                path: 'img-doc-main-query',
                title: '影像查询浏览',
                name: 'img-doc-main-query',
                icon: 'search',
                component: () =>
                    import ('@/views/manager/ImgDocMainQuery.vue')
            },
            {
                path: 'img-scan',
                title: '影像扫描',
                name: 'img-scan',
                icon: 'qr-scanner',
                component: () =>
                    import ('@/views/manager/ImgScan.vue')
            },
            {
                path: 'historical-img-query',
                title: '历史影像文件处理',
                name: 'historical-img-query',
                icon: 'ios-navigate-outline',
                component: () =>
                    import ('@/views/manager/HistoricalImg_Query.vue')
            }
        ]
    },
    {
        path: '/api',
        icon: 'android-checkbox',
        name: 'api',
        title: '接口管理',
        component: Main,
        children: [{
                path: 'api-service-cfg-query',
                title: '接口服务配置',
                name: 'api-service-cfg-query',
                icon: 'search',
                component: () =>
                    import ('@/views/api/ApiServiceCfg_Query.vue')
            },
            {
                path: 'api-client-cfg-query',
                title: '接口客户端配置',
                name: 'api-client-cfg-query',
                icon: 'search',
                component: () =>
                    import ('@/views/api/ApiClientCfg_Query.vue')
            }
        ]
    },
    {
        path: '/buss',
        icon: 'android-checkbox',
        name: 'buss',
        title: '业务管理',
        component: Main,
        children: [{
                path: 'buss-tree',
                title: '业务模型定义',
                name: 'buss-tree',
                icon: 'search',
                component: () =>
                    import ('@/views/buss/BussTree.vue')
            },
            {
                path: 'buss-role',
                title: '业务角色配置',
                name: 'buss-role',
                icon: 'search',
                component: () =>
                    import ('@/views/buss/BussRole.vue')
            }
        ]
    },
    {
        path: '/saa',
        icon: 'android-checkbox',
        name: 'saa',
        title: '系统管理',
        component: Main,
        children: [{
                path: 'SaaUser_Query',
                title: '用户管理',
                name: 'SaaUser_Query',
                icon: 'search',
                component: () =>
                    import ('@/views/saa/SaaUser_Query.vue')
            },
            {
                path: 'SaaGrade_Query',
                title: '岗位管理',
                name: 'SaaGrade_Query',
                icon: 'search',
                component: () =>
                    import ('@/views/saa/SaaGrade_Query.vue')
            },
            {
                path: 'SaaUserPower_Query',
                title: '用户权限管理',
                name: 'SaaUserPower_Query',
                icon: 'search',
                component: () =>
                    import ('@/views/saa/SaaUserPower_Query.vue')
            },
            {
                path: 'SysAppConfig_Edit',
                title: '系统参数配置',
                name: 'SysAppConfig_Edit',
                icon: 'search',
                component: () =>
                    import ('@/views/saa/SysAppConfig_Edit.vue')
            },
        ]
    },
    {
        path: '/report',
        icon: 'android-checkbox',
        name: 'report',
        title: '运维管理',
        component: Main,
        children: [{
                path: 'OperationLog_Query',
                title: '操作记录查询',
                name: 'OperationLog_Query',
                icon: 'search',
                component: () =>
                    import ('@/views/report/OperationLog_Query.vue')
            },
            {
                path: 'ImgStatReport_Query',
                title: '影像信息统计',
                name: 'ImgStatReport_Query',
                icon: 'search',
                component: () =>
                    import ('@/views/report/ImgStatReport_Query.vue')
            }
        ]
    },
    {
        path: '/apiTest',
        icon: 'android-checkbox',
        name: 'apiTest',
        title: '模拟测试',
        component: Main,
        children: [{
                path: 'ApiTest_Upload',
                title: '影像接口模拟测试',
                name: 'ApiTest_Upload',
                icon: 'search',
                component: () =>
                    import ('@/views/apiTest/ApiTest_Upload.vue')
            },
            {
                path: 'ApiTest_OtherRecon',
                title: '识别测试',
                name: 'ApiTest_OtherRecon',
                icon: 'search',
                component: () =>
                    import ('@/views/apiTest/ApiTest_OtherRecon.vue')
            },
            {
                path: 'ImgUploadTest',
                title: '影像采集',
                name: 'ImgUploadTest',
                icon: 'search',
                component: () =>
                    import ('@/views/apiTest/ImgUploadTest.vue')
            }
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];