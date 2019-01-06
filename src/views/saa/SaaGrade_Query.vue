<style lang="less">
  @import './style.less';
</style>

<template>
  <div class="content-body">
    <Spin size="large" fix v-if="spinShow" />
    <Row>
      <Col span="6">
      <Card>
        <p slot="title" class="align">
          <Icon type="navicon-round" /> 岗位列表
        </p>
        <a slot="extra" type="text" @click="addOrModify('add','')">
          <Icon type="plus-round" /> 增加岗位
        </a>
        <RadioGroup v-model="gradeVoGroup" @on-change="addOrModify('modify',gradeVoGroup)">
          <div v-for="(item, index) in gradeVos" :key="'todo-item' + (gradeVos.length - index)" class="grade-list">
            <Row class="grade-item">
              <Col span="24" class="height-100">
              <Radio :label="item.id" name="options" :value="item.gradeCname">{{ item.gradeCname }}</Radio>
              </Col>
            </Row>
          </div>
        </RadioGroup>
      </Card>
      </Col>
      <Col span="11" style="margin:0 10px">
      <Card>
        <div class="query-condition">
          <Form ref="gradeVoFrom" :model="gradeVo" :rules="ruleValidate" :label-width="80">
            <input type="hidden" name="saaGradeVo.id" :value="gradeVo.id">
            <Row>
              <Col span="20">
              <FormItem label="岗位编码" prop="gradeCode">
                <Input v-model="gradeVo.gradeCode" name="saaGradeVo.gradeCode" :value="gradeVo.gradeCode" clearable placeholder="请输入岗位编码"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
              <FormItem label="岗位名称" prop="gradeCname">
                <Input v-model="gradeVo.gradeCname" name="saaGradeVo.gradeCname" :value="gradeVo.gradeCname" clearable placeholder="请输入岗位名称"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
              <FormItem label="公司编码" prop="comCode">
                <Input v-model="gradeVo.comCode" name="saaGradeVo.comCode" :value="gradeVo.comCode" clearable placeholder="请输入公司编码"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
              <FormItem label="有效状态" prop="validFlag">
                <RadioGroup v-model="gradeVo.validFlag" true-value="1" false-value="0" name="saaGradeVo.validFlag" :value="gradeVo.validFlag">
                  <Radio label="1">
                    <span>有效</span>
                  </Radio>
                  <Radio label="0">
                    <span>无效</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
              <FormItem label="创建人" prop="createUser">
                <Input disabled v-model="gradeVo.createUser" name="saaGradeVo.createUser" :value="gradeVo.createUser" clearable></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
              <FormItem label="创建时间" prop="createTime">
                <DatePicker disabled name="saaGradeVo.createTime" type="date" :value="gradeVo.createTime" v-model="gradeVo.createTime" clearable/>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
              <FormItem label="备注" prop="remark">
                <Input v-model="gradeVo.remark" name="saaGradeVo.remark" :value="gradeVo.remark" clearable></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
              <div style="visiable:none" v-for="(nodeVo,index) in nodeVoList" :key="nodeVo.id">
                <input type="hidden" v-model="nodeVo.gradeTaskId" :name="'saaGradeTasks['+index+'].id'">
                <input type="hidden" v-model="nodeVo.gradeId" :name="'saaGradeTasks['+index+'].gradeId'">
                <input type="hidden" v-model="nodeVo.taskId" :name="'saaGradeTasks['+index+'].taskId'" class="iptVal">
                <input type="hidden" :value="nodeVo.checked?1:0" :name="'saaGradeTasks['+index+'].flag'">
              </div>
              <FormItem>
                <Button type="primary" icon="checkmark-round" @click="handleSave('gradeVoFrom')">保存配置</Button>
                <Button type="ghost" icon="reply" @click="handleReset('gradeVoFrom')">重置条件</Button>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
      </Col>
      <Col span="6">
      <Card>
        <p slot="title" class="align">
          <Icon type="navicon-round" /> 岗位功能权限
        </p>
        <div id="areaTree">
          <div class="tree-box">
            <div class="zTreeDemoBackground left">
              <ul id="treeDemo" class="ztree" />
            </div>
          </div>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {
    initTree_new,
    addOrModify,
    saveGrade,
    getTreeNodes
  } from '@/api/saaGrade.js'
  export default {
    name: 'SaaGradeQuery',
    data() {
      return {
        setting: {
          check: {
            enable: true
          },
          data: {
            simpleData: {
              enable: true,
              idKey: 'id',
              pIdKey: 'pId',
              rootPId: ''
            }
          },
          callback: {
            beforeClick: this.beforeClick,
            onClick: this.zTreeOnClick,
            onCheck: this.zTreeOnCheck
          }
        },
        gradeVo: {
          validFlag: '',
          bussNo: '',
          bussType: ''
        },
        ruleValidate: {
          gradeCode: [{
            required: true,
            message: '请输入岗位编码',
            trigger: 'blur'
          }],
          comCode: [{
            required: true,
            message: '请输入公司编码',
            trigger: 'blur'
          }],
          gradeCname: [{
            required: true,
            message: '请输入公司编码',
            trigger: 'blur'
          }]
        },
        spinShow: false,
        loading: false,
        gradeVos: [],
        nodeVoList: [],
        gradeVoGroup: 1
      }
    },
    watch: {
      nodeVoList: {
        handler: function(newValue, oldValue) {
          // console.log(newValue);
        },
        deep: true
      }
    },
    mounted() {
      $.fn.zTree
        .init($('#treeDemo'), this.setting, this.nodeVoList)
        .expandAll(true)
    },
    created() {
      this.initTree()
      this.addOrModify('modify', 1)
    },
    methods: {
      // 添加或修改
      addOrModify(saveType, gradeId) {
        var that = this
        addOrModify({
            saveType: saveType,
            gradeId: gradeId
          })
          .then(function(response) {
            if (response.status === 200) {
              if (saveType === 'modify') {
                that.gradeVo = response.data.gradeVo
              } else {
                that.handleReset('gradeVoFrom')
              }
              that.nodeVoList = response.data.nodeVoList
              // that.freshArea();
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
      getTreeNodes(data) {
        var that = this
        getTreeNodes(data)
          .then(function(response) {
            if (response.status === 200) {
              that.nodeVoList = response.data
              that.freshArea()
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
      initTree() {
        var that = this
        that.spinShow = true
        initTree_new()
          .then(function(response) {
            if (response.status === 200) {
              that.nodeVoList = response.data.nodeVoList
              // that.gradeVo=response.data.gradeVos[0];
              that.gradeVos = response.data.gradeVos
              that.freshArea()
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
      // 保存配置
      handleSave(name) {
        var that = this
        var formData = $(this.$refs['gradeVoFrom'].$el).serialize()
  
        this.$refs[name].validate(valid => {
          if (valid) {
            this.spinShow = true
            saveGrade(formData)
              .then(function(response) {
                if (response.status === 200) {
                  that.initTree()
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
          } else {
            that.$Notice.error({
              title: '请填写信息!',
              duration: 3
            })
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      },
      freshArea() {
        $.fn.zTree.init($('#treeDemo'), this.setting, this.nodeVoList)
      },
  
      zTreeOnCheck(event, treeId, treeNode) {
        var zTree,
          checkedNode = zTree.getChangeCheckedNodes() // 获取输入框勾选状态被改变的节点集合（与原始数据 checkedOld 对比）
        zTree = $.fn.zTree.getZTreeObj('treeDemo')
        for (var i = 0; i <= checkedNode.length - 1; i++) {
          this.nodeVoList.forEach(item => {
            if (item.id === checkedNode[i].id) {
              // 更改节点的checked属性则更新nodeVoList
              item.checked = checkedNode[i].checked
            }
            return item
          })
        }
        // console.log(checkedNames);
      },
      beforeClick(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj('treeDemo')
        // zTree.checkNode(treeNode, !treeNode.checked, null, true);
        zTree.checkNode(treeNode, !treeNode.checked, true, true) // 第二个参数!treeNode.checked和"",省略此参数效果等同，则根据对此节点的勾选状态进行 toggle 切换，第三个参数设置为true时候进行父子节点的勾选联动操作 ，第四个参数true 表示执行此方法时触发 beforeCheck & onCheck 事件回调函数；false 表示执行此方法时不触发事件回调函数
        return false
      }
    }
  }
</script>


