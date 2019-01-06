<style lang="less">
  @import './style.less';
</style>

<template>
  <div class="content-body">
    <!-- 查询界面 -->
    <div class="query-condition" :style="{marginBottom: '10px'}">
      <Form ref="formValidate" :model="formValidate" :label-width="80" inline>
        <Card>
          <p slot="title" class="align">
            <Icon type="navicon-round" /> 业务角色配置
          </p>
          <div slot="extra">
            <Button type="primary" icon="search" @click="handleSearch()">查询</Button>
            <Button type="ghost" icon="reply" @click="handleReset('formValidate')">重置条件</Button>
          </div>
          <input type="hidden" name="start" style="display:none" :value="start">
          <input type="hidden" name="length" style="display:none" :value="pageSize">
          <FormItem label="角色代码" prop="roleCode">
            <Input v-model="formValidate.roleCode" :value="formValidate.roleCode" name="roleCode" clearable placeholder="请输入角色代码" style="width:200px"></Input>
          </FormItem>
          <FormItem label="角色名称" prop="roleName">
            <Input v-model="formValidate.roleName" :value="formValidate.roleName" name="roleName" clearable placeholder="请输入角色名称" style="width:200px"></Input>
          </FormItem>
          <FormItem label="有效状态" prop="validFlag">
            <Select v-model="formValidate.validFlag" :value="formValidate.validFlag" name="validFlag" clearable filterable placeholder="请选择有效状态" style="width:200px">
              <Option value="">请选择</Option>
              <Option value="1">有效</Option>
              <Option value="0">无效</Option>
            </Select>
          </FormItem>
        </Card>
      </Form>
    </div>
    <!-- 列表界面 -->
    <div class="query-result">
      <Card>
        <div>
          <div class="align margin-top">
            <Button type="primary" icon="plus-round" @click="modal1 = true">新增</Button>
            <Button type="primary" icon="loop" @click="update">修改</Button>
            <Button type="primary" icon="trash-a" v-show="sels.length>1" @click="batchRemove">批量删除</Button>
          </div>
        </div>
        <Table :loading="loading" :columns="column1" :data="queryResult" border height="400" @on-selection-change="selsChange" @on-row-click="selectItem" />
        <Page @on-change="changePage" :total="recordsTotal" :style="{marginTop: '30px'}" :page-size="pageSize" class="table-pager" show-elevator show-sizer/>
      </Card>
    </div>
    <!-- 新增面板 -->
    <Modal v-model="modal1" width=600>
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled" />
        <span>{{ showEdit===false?'新增角色管理':'编辑角色管理' }}</span>
      </p>
      <Form ref="addValidate" :model="addValidate" :rules="ruleValidate" :label-width="80">

        <FormItem label="角色代码" prop="roleCode">
          <Input v-model="addValidate.roleCode" clearable placeholder="请输入角色代码" style="width:300px"></Input>
        </FormItem>
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="addValidate.roleName" clearable placeholder="请输入角色名称" style="width:300px"></Input>
        </FormItem>
        <FormItem label="角色描述" prop="roleDesc">
          <Input v-model="addValidate.roleDesc" clearable placeholder="请输入角色描述" style="width:300px"></Input>
        </FormItem>
        <FormItem label="有效状态" prop="validFlag">
          <Select v-model="addValidate.validFlag" clearable filterable style="width:300px">
            <Option value="1">有效</Option>
            <Option value="0">无效</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="checkmark" @click="handleSave('addValidate')">保存</Button>
          <Button type="primary" icon="close" @click="modal1 = false;showEdit=false">关闭</Button>
        </FormItem>
      </Form>
      <div slot="footer" />
    </Modal>
    <!-- 权限管理面板 -->
    <Modal v-model="showPowerConfig" width='1050' class="configModal" :mask-closable="false">
      <div class="content-body">
        <div class="query-condition" :style="{marginBottom: '10px'}">
          <Form ref="powerFrom" :model="powerFrom" :label-width="80" inline>
            <Card>
              <p slot="title" class="align">
                <Icon type="navicon-round" /> {{ roleVo.roleName }}{{ (roleVo.roleCode) }}角色配置
              </p>
              <div slot="extra">
                <Button type="primary" icon="search" @click="searchRolePower('powerFrom')">查询</Button>
                <Button type="primary" icon="search" @click="handleSubmit('powerFrom')">保存配置</Button>
                <Button type="ghost" @click="handleReset('powerFrom')" value="最近一周">重置条件</Button>
              </div>
              <Input type="hidden" value=""></Input>
              <FormItem label="模块代码" prop="moduleCode">
                <Select @on-change="selectModule(powerFrom.moduleCode)" v-model="powerFrom.moduleCode" clearable placeholder="请选择模块代码" style="width:200px">
                  <Option value="CB">CB-CB_E</Option>
                  <Option value="CL">CL-理赔</Option>
                  <Option value="SP">SP-销管</Option>
                  <Option value="XY">XY-协议</Option>
                  <Option value="XZC">XZC-X资产</Option>
                  <Option value="YSF">YSF-清分清算</Option>
                  <Option value="YX">YX-营销</Option>
                  <Option value="ZC">ZC-资产</Option>
                  <Option value="ZJ">ZJ-资金</Option>
                  <Option value="ZXPT">ZXPT-征信平台</Option>
                </Select>
              </FormItem>
              <FormItem label="险种代码" prop="roleCode">
                <Select v-model="powerFrom.riskCode" clearable filterable placeholder="请选择险种代码" style="width:200px">
                  <Option v-for="item in riskVos" :key="item.id" :value="item.riskCode">{{ item.riskName }}</Option>
                </Select>
              </FormItem>
            </Card>
          </Form>
        </div>
        <div class="query-result">
          <table id="table" class="tree-table">
            <thead>
              <tr>
                <th data-field="typeCodeName">单证类型</th>
                <th data-field="readable">可读</th>
                <th data-field="writable">可写</th>
                <th data-field="editable">可编辑</th>
                <th data-field="deletable">可删除</th>
                <th data-field="deleteOther">可删除他人</th>
              </tr>
            </thead>
          </table>
          <div class="zTreeDemoBackground left">
            <ul id="treeDemo" class="ztree" />
          </div>
          <!--  <Row class="configVos-header">
                         <Col span="4" class="head">
                             单证类型
                         </Col>
                         <Col span="4" class="head">
                             <Checkbox @click="checkBoxAll(value,'readable')" name="" :value="checkAll" true-value="1" false-value="0">可读</Checkbox>
                         </Col>
                         <Col span="4" class="head">
                             <Checkbox name="" value="writable" true-value="1" false-value="0">可写</Checkbox>
                         </Col>
                         <Col span="4" class="head">
                             <Checkbox name="" value="editable" true-value="1" false-value="0">可编辑</Checkbox>
                         </Col>
                         <Col span="4" class="head">
                             <Checkbox name="" value="deletable" true-value="1" false-value="0">可删除</Checkbox>
                         </Col>
                         <Col span="4" class="head">
                              <Checkbox name="" value="deletable" true-value="1" false-value="0">可删他人上传</Checkbox>
                         </Col>
                     </Row>
             
                     <Row v-for="(rolePowersVo,index) in rolePowers" class="configVos-body">
                         <Col span="4" class="item">
                             <span class="nameTypeLevel" val="rolePowersVo.typeLevel"></span><span>{{rolePowersVo.typeCodeName}}</span>
                             <input type="hidden" :name="'rolePowersVo['+index+'].roleCode'" v-model="rolePowersVo.roleCode">
                             <input type="hidden" :name="'rolePowersVo['+index+'].moduleCode'" v-model="rolePowersVo.moduleCode">
                             <input type="hidden" :name="'rolePowersVo['+index+'].riskCode'" v-model="rolePowersVo.riskCode">
                             <input type="hidden" :name="'rolePowersVo['+index+'].typeCode'" v-model="rolePowersVo.typeCode">
                             
                         </Col>
                         <Col span="4" class="item">
                             <input type="checkbox" :value="rolePowersVo.readable" v-model="readables">
                            <Checkbox v-model="" :name="'rolePowersVo['+index+'].readable'" :checked="rolePowersVo.readable" :value="rolePowersVo.readable" :code="rolePowersVo.typeCode"
                              :pcode="rolePowersVo.parenTypeCode" true-value="1" false-value="0"></Checkbox>
                         </Col>
                         <Col span="4" class="item">
                             <input type="checkbox" :value="rolePowersVo.readable" v-model="writables">
                             <Checkbox v-model="rolePowersVo.writable" :name="'rolePowersVo['+index+'].writable'" :value="rolePowersVo.writable" :code="rolePowersVo.typeCode"
                              :pcode="rolePowersVo.parenTypeCode" true-value="1" false-value="0"></Checkbox>
                         </Col>
                         <Col span="4" class="item">
                             <input type="checkbox" :value="rolePowersVo.readable" v-model="editables">
                             <Checkbox v-model="rolePowersVo.editable" :name="'rolePowersVo['+index+'].editable'" :value="rolePowersVo.editable" :code="rolePowersVo.typeCode"
                              :pcode="rolePowersVo.parenTypeCode" true-value="1" false-value="0"></Checkbox>
                         </Col>
                         <Col span="4" class="item">
                             <Checkbox v-model="rolePowersVo.deletable" :name="'rolePowersVo['+index+'].deletable'" :value="rolePowersVo.deletable" :code="rolePowersVo.typeCode"
                              :pcode="rolePowersVo.parenTypeCode" true-value="1" false-value="0"></Checkbox>
                         </Col>
                         <Col span="4" class="item">
                             <Checkbox v-model="rolePowersVo.deleteOther" :name="'rolePowersVo['+index+'].deleteOther'" :value="rolePowersVo.deleteOther" :code="rolePowersVo.typeCode"
                              :pcode="rolePowersVo.parenTypeCode" true-value="1" false-value="0"></Checkbox>
                         </Col>
                     </Row> -->
        </div>
      </div>
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
  import canEditTable from '@/views/tables/components/canEditTable.vue'
  import {
    search_role,
    save_role,
    delete_role,
    initEditQuery_new,
    getRisk,
    searchRolePower
  } from '@/api/buss.js'
  
  export default {
    name: 'BussRole',
    components: {
      canEditTable
    },
    data() {
      var that = this
      return {
        setting: {
          view: {
            showLine: false,
            showTitle: true,
            addDiyDom: this.addDiyDom
          },
          check: {
            enable: true,
            nocheckInherit: true
          },
          data: {
            key: {
              name: 'typeCodeName'
            },
            simpleData: {
              enable: true,
              idKey: 'typeCode',
              pIdKey: 'parenTypeCode'
            }
          },
          callback: {
            onCheck: this.zTreeOnClick
          }
        },
        zNodes: [],
        powerFrom: {
          moduleCode: '',
          riskCode: ''
        },
        powerRule: {
          moduleCode: [{
            required: true,
            message: '请选择模块代码',
            trigger: 'change'
          }],
          riskCode: [{
            required: true,
            message: '请选择险种代码',
            trigger: 'change'
          }]
        },
  
        formValidate: {
          roleCode: '',
          roleName: '',
          validFlag: 1
        },
        ruleValidate: {
          roleCode: [{
            required: true,
            message: '请输入角色代码',
            trigger: 'blur'
          }],
          roleName: [{
            required: true,
            message: '请选择角色名称',
            trigger: 'blur'
          }],
          validFlag: [{
            required: true,
            message: '请选择有效状态',
            trigger: 'change'
          }]
        },
        addValidate: {
          roleCode: '',
          roleName: '',
          roleDesc: '',
          validFlag: ''
        },
        column1: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '角色代码',
            key: 'roleCode'
          },
          {
            title: '角色名称',
            key: 'roleName'
          },
          {
            title: '角色描述',
            key: 'roleDesc'
          },
          {
            title: '有效性',
            key: 'validFlag'
          },
          {
            title: '创建人',
            key: 'manager'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: function(h, params) {
              return h('div', [
                h(
                  'Button', {
                    props: {
                      type: 'primary'
                    },
                    style: {
                      margin: ' 0 5px',
                      display: 'inline-block'
                    },
                    on: {
                      click: () => {
                        that.configModule(params)
                      }
                    }
                  },
                  '权限管理'
                ),
                h(
                  'Button', {
                    props: {
                      type: 'error'
                    },
                    style: {
                      margin: ' 0 5px',
                      display: 'inline-block'
                    },
                    on: {
                      click: () => {
                        that.handleDel(params.row, params.index)
                      }
                    }
                  },
                  '删除'
                )
              ])
            }
          }
        ],
        readableModel: [],
        totalData: 0,
        queryResult: [],
        modal1: false, // 新增面板的开关
        showEdit: false, // showEdit=true表示是点击了修改,false为新增
        sels: [], // 列表选中列
        start: 0, // 初始化从0开始,start到pageSize即0-10之间条数
        recordsTotal: 0, // 初始化信息总条数
        pageSize: 10, // 每页显示多少条,
        riskVos: [], // 险种list
        rolePowers: [],
        loadRolePowers: false,
        loading: false,
        showPowerConfig: false, // 权限管理面板开关
        roleVo: {}, // 当铺配置角色对象
        roleCode: '', // 当前配置的角色代码
        checkAll: 1
      }
    },
    mounted() {
      // $.fn.zTree.init($("#treeDemo"), this.setting, this.rolePowers).expandAll(true);
    },
    created() {},
    methods: {
      // 刷新树节点
      freshArea() {
        $.fn.zTree.init($('#treeDemo'), this.setting, this.rolePowers)
      },
      addDiyDom(treeId, treeNode) {
        var liObj = $('#' + treeNode.tId)
        var aObj = $('#' + treeNode.tId + '_a')
        var level = treeNode.id
        aObj.css('width', '100px')
        if (treeNode.level > 1) {
          aObj.after(
            '<span class="span-chk one readable" style="margin-left: ' +
            -18 * treeNode.level +
            'px"><span id="' +
            treeNode.tId +
            '_check" class="button chk" treenode_check="" ></span></span>'
          )
        } else if (treeNode.level === 0) {
          aObj.after(
            '<span class="span-chk one readable"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
        } else {
          aObj.after(
            '<span class="span-chk one readable" style="margin-left: ' +
            -18 +
            'px"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
        }
        if (treeNode.level > 1) {
          liObj.append(
            '<span class="span-chk tow deleteOther"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
          liObj.append(
            '<span class="span-chk three deletable"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
          liObj.append(
            '<span class="span-chk four editable"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
          liObj.append(
            '<span class="span-chk five writable"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
        } else {
          var spanObj = aObj.next()
          spanObj.after(
            '<span class="span-chk tow deleteOther"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
          spanObj.after(
            '<span class="span-chk three deletable"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
          spanObj.after(
            '<span class="span-chk four editable"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
          spanObj.after(
            '<span class="span-chk five writable"><span id="' +
            treeNode.tId +
            '_check" class="button chk " treenode_check="" ></span></span>'
          )
        }
      },
      zTreeOnClick(event, treeId, treeNode) {
        $('.readable').click(function() {
          console.log($(this))
          if (treeNode.readable === 0) {
            $(this)
              .children()
              .addClass('checkbox_true_full')
            treeNode.readable = 1
          } else {
            $(this)
              .children()
              .removeClass('checkbox_true_full')
            treeNode.readable = 0
          }
        })
        $('.deletable').click(function() {
          if (treeNode.deletable === 0) {
            $(this)
              .children()
              .addClass('checkbox_true_full')
            treeNode.deletable = 1
          } else {
            $(this)
              .children()
              .removeClass('checkbox_true_full')
            treeNode.deletable = 0
          }
        })
        $('.writable').click(function() {
          if (treeNode.writable === 0) {
            $(this)
              .children()
              .addClass('checkbox_true_full')
            treeNode.writable = 1
          } else {
            $(this)
              .children()
              .removeClass('checkbox_true_full')
            treeNode.writable = 0
          }
        })
        $('.editable').click(function() {
          if (treeNode.editable === 0) {
            $(this)
              .children()
              .addClass('checkbox_true_full')
            treeNode.editable = 1
          } else {
            $(this)
              .children()
              .removeClass('checkbox_true_full')
            treeNode.editable = 0
          }
        })
        $('.deleteOther').click(function() {
          if (treeNode.deleteOther === 0) {
            $(this)
              .children()
              .addClass('checkbox_true_full')
            treeNode.deleteOther = 1
          } else {
            $(this)
              .children()
              .removeClass('checkbox_true_full')
            treeNode.deleteOther = 0
          }
        })
      },
      // 全选
      checkBoxAll(value, type) {
        console.log(value, type)
      },
      // 模块配置
      configModule(params) {
        var that = this
        initEditQuery_new(params.row.roleCode)
          .then(function(response) {
            if (response.status === 200) {
              that.roleVo = response.data.roleVo
              that.roleCode = response.data.roleCode
              that.showPowerConfig = true
            } else {
              that.$Notice.error({
                title: '服务器异常,请稍候重试!',
                duration: 3
              })
            }
            console.log(response)
          })
          .catch(function(error) {
            that.loadRolePowers = false
            that.$Notice.error({
              title: '服务器异常,请稍候重试!',
              duration: 3
            })
            console.log(error)
          })
      },
      // 查询角色配置
      searchRolePower(name) {
        var that = this
        this.$refs[name].validate(valid => {
          if (valid) {
            that.loadRolePowers = true
            searchRolePower({
                moduleCode: that.powerFrom.moduleCode,
                riskCode: that.powerFrom.riskCode,
                roleCode: that.roleCode
              })
              .then(function(response) {
                that.loadRolePowers = false
                if (response.status === 200) {
                  that.rolePowers = response.data.rolePowers
                  that.totalData = response.data.rolePowers.length
                  that.freshArea()
                } else {
                  that.$Notice.error({
                    title: '服务器异常,请稍候重试!',
                    duration: 3
                  })
                }
                console.log(response)
              })
              .catch(function(error) {
                that.loadRolePowers = false
                that.$Notice.error({
                  title: '服务器异常,请稍候重试!',
                  duration: 3
                })
                console.log(error)
              })
          } else {
            this.$Message.warning({
              content: '请先选择模块代码和险种代码!',
              top: 50,
              duration: 3
            })
          }
        })
      },
      // 选择模块代码获取对应的riskVos
      selectModule(val) {
        var that = this
        getRisk({
            moduleCode: val
          })
          .then(function(response) {
            if (response.status === 500) {
              that.$Notice.error({
                title: '服务器异常,请稍候重试!',
                duration: 3
              })
            } else {
              that.riskVos = response.data
            }
            console.log(response)
          })
          .catch(function(error) {
            that.$Notice.error({
              title: '服务器异常,请稍候重试!',
              duration: 3
            })
            console.log(error)
          })
      },
      // 修改
      update() {
        if (this.sels.length > 1) {
          this.$Message.warning({
            content: '只能选择一个需要修改的角色!',
            top: 50,
            duration: 3
          })
        } else if (this.sels.length < 1) {
          this.$Message.warning({
            content: '请选择一个需要修改的角色!',
            top: 50,
            duration: 3
          })
        } else {
          // 执行修改
          this.modal1 = true
          this.showEdit = true
          this.addValidate = Object.assign({}, this.sels[0])
        }
      },
      // 换页
      changePage(pageNo) {
        var that = this
        this.start = (pageNo - 1) * this.pageSize
        this.$nextTick(function() {
          that.handleSearch()
        })
      },
      // 批量删除
      batchRemove() {
        var that = this
        if (this.sels.length > 0) {
          this.$Modal.confirm({
            title: '提示',
            content: '确认删除该记录吗?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
              this.loading = true
              var roleCodes = that.sels.map(item => {
                return item.roleCode
              })
              var params = {
                roleCodes: roleCodes
              }
              delete_role(params)
                .then(function(response) {
                  if (response.status === 500) {
                    that.$Notice.error({
                      title: '服务器异常,请稍候重试!',
                      duration: 3
                    })
                  } else {
                    that.$Notice.success({
                      title: '删除成功!',
                      duration: 2
                    })
                    that.sels = []
                    that.handleSearch()
                  }
                  that.loading = false
                  console.log(response)
                })
                .catch(function(error) {
                  that.$Notice.error({
                    title: '服务器异常,请稍候重试!',
                    duration: 3
                  })
                  that.loading = false
                  console.log(error)
                })
            },
            onCancel: () => {
              this.$Message.info('Clicked cancel')
            }
          })
        } else {
          this.$Message.warning({
            content: '请只是选择需要删除的记录!',
            top: 50,
            duration: 3
          })
        }
      },
      // 删除
      handleDel(row, index) {
        this.sels.push(row)
        this.batchRemove()
      },
      selectItem(selection, index) {
        this.selectedIndex = index
      },
      // sels：已选项数据
      selsChange(sels) {
        this.sels = sels
      },
      // 搜索
      handleSearch(name) {
        var that = this
        var formData = $(this.$refs['formValidate'].$el).serialize()
        console.log(formData)
        this.loading = true
        search_role(formData)
          .then(function(response) {
            if (response.status === 500) {
              that.loading = false
              that.$Notice.error({
                title: '服务器异常,请稍候重试!',
                duration: 3
              })
            } else {
              if (response.data !== null) {
                that.queryResult = response.data.data
                that.recordsTotal = response.data.recordsTotal
                that.$Notice.success({
                  title: '查询成功!',
                  duration: 2
                })
                that.loading = false
              } else {
                that.loading = false
                that.$Notice.error({
                  title: '服务器异常,请稍候重试!',
                  duration: 3
                })
              }
            }
            console.log(response)
          })
          .catch(function(error) {
            that.loading = false
            that.$Notice.error({
              title: '服务器异常,请稍候重试!',
              duration: 3
            })
            console.log(error)
          })
      },
      // 新增
      handleSave(name) {
        var that = this
        this.$refs[name].validate(valid => {
          if (valid) {
            save_role(that.addValidate)
              .then(function(response) {
                if (response.status === 500) {
                  that.modal1 = false
                  that.$Notice.error({
                    title: '服务器异常,请稍候重试!',
                    duration: 3
                  })
                } else {
                  if (response.data !== null) {
                    that.imgBussRole = response.data.datas.imgBussRole
                    that.$Notice.success({
                      title: '添加成功!',
                      duration: 2
                    })
                    that.modal1 = false
                    that.handleSearch('addValidate')
                    // 重置文本域
                    that.handleReset('addValidate')
                  } else {
                    that.modal1 = false
                    that.$Notice.error({
                      title: '服务器异常,请稍候重试!',
                      duration: 3
                    })
                  }
                }
                console.log(response)
              })
              .catch(function(error) {
                that.modal1 = false
                that.$Notice.error({
                  title: '服务器异常,请稍候重试!',
                  duration: 3
                })
                console.log(error)
              })
          } else {
            that.$Notice.error({
              title: '服务器异常,请稍候重试!',
              duration: 3
            })
          }
        })
      },
      // 重置
      handleReset(name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>


