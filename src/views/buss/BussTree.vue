<style lang="less">
  @import './style.less';
</style>

<template>
  <div class="content-body">
    <Spin size="large" fix v-if="spinShow" />
    <Row>
      <Col span="6">
      <Card>
        <div>
          <Row>
            <Col span="12" v>
            <Icon type="navicon-round" />业务类型树
            </Col>
            <Col span="12">
            <div class="align btns">
              <Button icon="minus-round" type="primary" @click="getCheckedNode">删除节点</Button>
            </div>
            </Col>
          </Row>
        </div>
        <div class="border-top height">
          <div id="areaTree">
            <div class="tree-box">
              <div class="zTreeDemoBackground left">
                <ul id="treeDemo" class="ztree" />
              </div>
            </div>
          </div>
        </div>
      </Card>
      </Col>
      <Col span="17" class="padding-left-10" :style="{marginLeft: '10px'}">
      <Card>
        <div>
          <p slot="title" class="align">
            <Icon type="navicon-round" /> {{ title }}
          </p>
          <div class="align btns">
            <Button type="primary" icon="plus-round" @click="handleAdd('addBussType')">业务类型</Button>
            <Button type="primary" icon="plus-round" @click="handleAdd('addRiskType')">险种类型</Button>
            <Button type="primary" icon="plus-round" @click="handleAdd('addCertiType')">单证类型</Button>
          </div>
        </div>
        <transition name="slide-fade">
          <div class="border-top form-container">

            <!-- 新增险种类型 -->
            <span v-if="addType==='addRiskType'">
              <risk-type-form ref="child" :risk-vo="riskVo" :save-type="saveType" />
            </span>
            <!-- 新增单证类型 -->
            <span v-else-if="addType==='addCertiType'">
              <certi-type-form ref="child" :type-tree-vo="typeTreeVo" :save-type="saveType" />
            </span>
            <!-- 新增业务类型 -->
            <span v-else>
              <buss-type-form ref="child" :module-vo="moduleVo" :save-type="saveType" />
            </span>
          </div>
        </transition>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import BussTypeForm from './components/BussTypeForm.vue'
  import RiskTypeForm from './components/RiskTypeForm.vue'
  import CertiTypeForm from './components/CertiTypeForm.vue'
  import request from '@/utils/request'
  import {
    getTreeNodes,
    deleteModule,
    deleteRisk,
    deleteTypeTree
  } from '@/api/buss.js'
  export default {
    name: 'BussTree',
    components: {
      BussTypeForm,
      RiskTypeForm,
      CertiTypeForm
    },
    data() {
      return {
        title: '业务类型信息',
        addType: '',
        spinShow: false,
        nodeVoList: [],
        setting: {
          check: {
            enable: true
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            beforeClick: this.beforeClick,
            onClick: this.zTreeOnClick,
            onCheck: this.zTreeOnCheck
          }
        },
        moduleVo: {},
        riskVo: {},
        typeTreeVo: {},
        saveType: '',
        pNode: '',
        zTree: '',
        zNodes: '',
        code: '',
        upData: '',
        urlType: '',
        currentNode: '',
        treeNodeParent: ''
      }
    },
    mounted() {
      $.fn.zTree
        .init($('#treeDemo'), this.setting, this.nodeVoList)
        .expandAll(true)
    },
    created() {
      this.getTreeNodes()
    },
    computed: {},
    methods: {
      // 删除
      getCheckedNode() {
        var that = this
        var params = ''
        var zTree
        var nodes = zTree.getCheckedNodes(true) // 获取ztree中checked勾选的节点
        var moduleCodes = [],
          riskIds = [],
          certiIds = [],
          moduleCodesNodes = [],
          riskIdsNodes = [],
          certiIdsNodes = [],
          checkedNodesList = []
        zTree = $.fn.zTree.getZTreeObj('treeDemo')
        for (var i = 0; i < nodes.length; i++) {
          if (!nodes[i].children || nodes[i].children === '') {
            // 被删除的子节点后，children属性为空，不是undefined
            if (nodes[i].nodeType === 'M') {
              // 业务模块
              moduleCodesNodes.push(nodes[i])
              moduleCodes.push(nodes[i].key)
            } else if (nodes[i].nodeType === 'R') {
              // 险种模块
              riskIdsNodes.push(nodes[i])
              riskIds.push(nodes[i].key)
            } else if (nodes[i].nodeType === 'C') {
              // 单证模块
              certiIdsNodes.push(nodes[i])
              certiIds.push(nodes[i].key)
            }
          }
        }
        // 删除提示
        if (
          moduleCodes.length === 0 &&
          riskIds.length === 0 &&
          certiIds.length === 0
        ) {
          // 前端页面删除节点
          that.$Notice.error({
            title: '请先在多选框中勾选一个节点!',
            duration: 3
          })
          return
        }
        this.$Modal.confirm({
          title: '提示',
          content: '确认删除该记录吗?',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.loading = true
            if (moduleCodes.length > 0) {
              // 删除模块
              params = {
                moduleCodes: moduleCodes
              }
              deleteModule(params)
                .then(function(response) {
                  if (response.status === 200) {
                    checkedNodesList = checkedNodesList.concat(moduleCodesNodes)
                    that.deleteNode(checkedNodesList)
                  } else {
                    that.$Notice.error({
                      title: '选中业务模块删除失败!',
                      duration: 3
                    })
                  }
                  that.loading = false
                  console.log(response)
                })
                .catch(function(error) {
                  that.$Notice.error({
                    title: '选中业务模块删除失败!',
                    duration: 3
                  })
                  that.loading = false
                  console.log(error)
                })
            }
            if (riskIds.length > 0) {
              // 删除险种
              params = {
                riskIds: riskIds
              }
              deleteRisk(params)
                .then(function(response) {
                  if (response.status === 200) {
                    checkedNodesList = checkedNodesList.concat(riskIdsNodes)
                    that.deleteNode(checkedNodesList)
                  } else {
                    that.$Notice.error({
                      title: '选中险种删除失败!',
                      duration: 3
                    })
                  }
                  that.loading = false
                  console.log(response)
                })
                .catch(function(error) {
                  that.$Notice.error({
                    title: '选中险种删除失败!',
                    duration: 3
                  })
                  that.loading = false
                  console.log(error)
                })
            }
            if (certiIds.length > 0) {
              // 删除单证
              params = {
                certiIds: certiIds
              }
              deleteTypeTree(params)
                .then(function(response) {
                  if (response.status === 200) {
                    checkedNodesList = checkedNodesList.concat(certiIdsNodes)
                    that.deleteNode(checkedNodesList)
                  } else {
                    that.$Notice.error({
                      title: '选中单证删除失败!',
                      duration: 3
                    })
                  }
                  that.loading = false
                  console.log(response)
                })
                .catch(function(error) {
                  that.$Notice.error({
                    title: '选中单证删除失败!',
                    duration: 3
                  })
                  that.loading = false
                  console.log(error)
                })
            }
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        })
      },
      // 前端删除
      deleteNode(checkedNodesList) {
        var zTree = $.fn.zTree.getZTreeObj('treeDemo')
        if (checkedNodesList.length > 0) {
          for (var i = 0; i < checkedNodesList.length; i++) {
            zTree.removeNode(checkedNodesList[i], true)
          }
          var deleteNode = zTree.getSelectedNodes()[0]
          this.$Notice.success({
            title: '删除成功!',
            duration: 3
          })
          if (!deleteNode) {
            var nodes = zTree.getNodes()
            if (nodes.length > 0) {
              // 初始化时选中第一个节点
              zTree.selectNode(nodes[0])
              $('.curSelectedNode').trigger('click') // 初始化选中第一个节点信息
            }
          }
        }
      },
      // 获取树节点
      getTreeNodes() {
        var that = this
        that.spinShow = true
        getTreeNodes()
          .then(function(response) {
            if (response.status === 200) {
              that.nodeVoList = response.data
              that.freshArea()
              that.$nextTick(function() {
                that.zTree = $.fn.zTree.getZTreeObj('treeDemo')
                var nodes = that.zTree.getNodes()
                if (nodes.length > 0) {
                  // 初始化时选中第一个节点
                  that.zTree.selectNode(nodes[0])
                  $('.curSelectedNode').trigger('click') // 初始化选中第一个节点信息
                }
              })
            } else {
              that.$Notice.error({
                title: '服务器异常,请稍候重试!',
                duration: 3
              })
            }
            that.spinShow = false
            console.log(response)
          })
          .catch(function(error) {
            that.spinShow = false
            that.$Notice.error({
              title: '服务器异常,请稍候重试!',
              duration: 3
            })
            console.log(error)
          })
      },
      // 新增
      handleAdd(addType) {
        var that = this
        var zTree = $.fn.zTree.getZTreeObj('treeDemo')
        var currentNode = zTree.getSelectedNodes()[0]
        this.addType = addType
        that.saveType = 'add'
        this.$refs.child.handleReset()
        switch (addType) {
          case 'addBussType':
            this.title = '新增业务类型'
  
            break
          case 'addRiskType':
            that.$nextTick(function() {
              $("input[name='moduleCode']").val(currentNode.id) // 新增险种类型
            })
            this.title = '新增险种类型'
            break
          case 'addCertiType':
            that.$nextTick(function() {
              var treeNodeParent = currentNode.getParentNode() // 当前选中节点父节点
              $("input[name='parenTypeCode']").val('0') // 上级单证
              $("input[name='typeLevel']").val('1') // 单证层级
              if (currentNode.nodeType === 'M') {
                // 选中节点为业务类型
                $("input[name='moduleCode']").val(currentNode.id)
              }
              if (currentNode.nodeType === 'R') {
                // 选中节点为险种类型
                $("input[name='moduleCode']").val(treeNodeParent.id)
                $("input[name='riskCode']").val(currentNode.id)
              }
              if (currentNode.nodeType === 'C') {
                // 选中节点为单证类型
                $("input[name='parenTypeCode']").val(currentNode.id) // 上级单证
                $("input[name='typeLevel']").val('2') // 单证层级
                if (treeNodeParent.nodeType === 'C') {
                  var count = 2
                  var rootNode = that.getRootNode(treeNodeParent, count)
                  $("input[name='typeLevel']").val(++count) // 单证层级
                  if (rootNode.nodeType === 'R') {
                    $("input[name='riskCode']").val(rootNode.id)
                    $("input[name='moduleCode']").val(treeNodeParent.id)
                  } else {
                    $("input[name='moduleCode']").val(rootNode.id)
                  }
                }
                if (treeNodeParent.nodeType === 'M') {
                  $("input[name='moduleCode']").val(treeNodeParent.id)
                } else if (treeNodeParent.nodeType === 'R') {
                  $("input[name='riskCode']").val(treeNodeParent.id)
                  $("input[name='moduleCode']").val(treeNodeParent.id)
                }
              }
            })
            this.title = '新增单证类型'
            break
        }
      },
      // 刷新树节点
      freshArea() {
        $.fn.zTree.init($('#treeDemo'), this.setting, this.nodeVoList)
      },
      // 获取根节点
      getRootNode(nObj, count) {
        var nowNodeParent = nObj.getParentNode()
        if (nowNodeParent.nodeType === 'C') {
          count++
          return arguments.callee(nowNodeParent, count) // 递归
        } else return nowNodeParent
      },
      // 点击树节点
      zTreeOnClick(event, treeId, treeNode) {
        var that = this
        that.zTree = $.fn.zTree.getZTreeObj('treeDemo')
        that.pNode = treeNode.getParentNode()
        that.currentNode = that.zTree.getSelectedNodes()[0]
  
        function treeTypeStyle() {
          if (that.currentNode.nodeType === 'C') {
            // 单证节点
            var rootNode = that.getRootNode(that.currentNode)
            if (rootNode.nodeType === 'R') {
              var treeNodeParentP = rootNode.getParentNode() // 找到险种节点的模块节点
              return {
                moduleCode: treeNodeParentP.id,
                riskCode: rootNode.id,
                typeCode: treeNode.id
              }
            } else {
              return {
                moduleCode: rootNode.id,
                riskCode: '',
                typeCode: treeNode.id
              }
            }
          }
        }
        that.urlType =
          that.currentNode.nodeType === 'M' ?
          'modifyBussType.json' :
          that.currentNode.nodeType === 'R' ?
          'modifyRiskType.json' :
          'modifyCertiType.json' // 确定ajax的action路径
        that.upData =
          that.currentNode.nodeType === 'M' ?
          {
            moduleCode: treeNode.id
          } :
          that.currentNode.nodeType === 'R' ?
          {
            moduleCode: that.pNode.id,
            riskCode: treeNode.id
          } :
          treeTypeStyle() // 确定ajax的action路径
        request({
          url: '/bussTree/' + that.urlType,
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: [
            function(data) {
              let ret = ''
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  '=' +
                  encodeURIComponent(data[it]) +
                  '&'
              }
              return ret
            }
          ],
          data: that.upData
        }).then(function(response) {
          if (response.data.moduleVo !== undefined) {
            that.moduleVo = response.data.moduleVo
          }
          if (response.data.riskVo !== undefined) {
            that.riskVo = response.data.riskVo
          }
          if (response.data.typeTreeVo !== undefined) {
            that.typeTreeVo = response.data.typeTreeVo
          }
          that.saveType = response.data.saveType
          console.log(response)
        })
        console.log(that.urlType + ', ' + that.upData)
      },
      zTreeOnCheck(event, treeId, treeNode) {
        var zTree,
          //  checkCount = zTree.getCheckedNodes(true).length, // 选中
          //  nocheckCount = zTree.getCheckedNodes(false).length, // 未选中
          //   changeCount = zTree.getChangeCheckedNodes().length,// 获取输入框勾选状态被改变的节点集合（与原始数据 checkedOld 对比）
          checkedNames = [],
          checkedIds = []
        zTree = $.fn.zTree.getZTreeObj('treeDemo')
        for (var i = 0; i <= zTree.getCheckedNodes(true).length - 1; i++) {
          checkedIds.push(zTree.getCheckedNodes(true)[i].id)
          checkedNames.push(zTree.getCheckedNodes(true)[i].name)
        }
      },
      beforeClick(treeId, treeNode) {
        // var zTree = $.fn.zTree.getZTreeObj('treeDemo')
        // zTree.checkNode(treeNode, !treeNode.checked, null, true);
        // zTree.checkNode(treeNode, !treeNode.checked, true, true); //第二个参数!treeNode.checked和"",省略此参数效果等同，则根据对此节点的勾选状态进行 toggle 切换，第三个参数设置为true时候进行父子节点的勾选联动操作 ，第四个参数true 表示执行此方法时触发 beforeCheck & onCheck 事件回调函数；false 表示执行此方法时不触发事件回调函数
        // return false;
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>


