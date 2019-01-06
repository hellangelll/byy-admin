<style lang="less">
  @import './style.less';
</style>

<template>
  <div class="content-body">
    <div class="query-condition" :style="{marginBottom: '10px'}">
      <Form ref="formValidate" :model="formValidate" :label-width="80" inline>
        <Card>
          <p slot="title" class="align">
            <Icon type="navicon-round" /> 岗位列表
          </p>
          <div slot="extra">
            <Button type="primary" icon="search" @click="handleSearch('formValidate')">查询</Button>
            <Button type="ghost" icon="reply" @click="handleReset('formValidate')">重置条件</Button>
          </div>
          <input type="hidden" name="start" style="display:none" :value="start">
          <input type="hidden" name="length" style="display:none" :value="pageSize">
          <FormItem label="客户端代码" prop="clientCode">
            <Input v-model="formValidate.clientCode" name="clientCode" clearable placeholder="可模糊查询" style="width:200px"></Input>
          </FormItem>
          <FormItem label="客户端名称" prop="clientName">
            <Input v-model="formValidate.clientName" name="clientName" clearable placeholder="可模糊查询" style="width:200px"></Input>
          </FormItem>
          <FormItem label="有效状态" prop="validFlag">
            <Select v-model="formValidate.validFlag" name="validFlag" clearable filterable placeholder="请选择有效状态" style="width:200px">
              <Option value="">请选择</Option>
              <Option value="1">有效</Option>
              <Option value="0">无效</Option>
            </Select>
          </FormItem>
        </Card>
      </Form>

    </div>
    <div class="query-result">
      <Row class="margin-top-10">
        <Col span="24">
        <Card>
          <div>
            <div class="align margin-top" :style="{paddingBottom: '10px'}">
              <Button type="primary" icon="plus-round" @click="openAdd">新增</Button>
              <Button type="primary" icon="loop" @click="update">修改</Button>
              <Button type="primary" icon="trash-a" v-show="sels.length>1" @click="batchRemove">批量删除</Button>
            </div>
          </div>
          <Row>
            <Col span="24">
            <Table @on-selection-change="selsChange" :loading="loading" :columns="columns1" :data="queryResult" border />
            <div class="page">
              <Page @on-change="changePage" :total="totalCount" :style="{marginTop: '30px'}" :page-size="pageSize" class="table-pager" show-elevator show-sizer/>
            </div>
            </Col>
          </Row>
        </Card>
        </Col>
      </Row>
    </div>
    <!-- 新增面板 -->
    <Modal v-model="modal1" width=600>
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled" />
        <span>{{ showEdit===false?'新增接口授权':'接口授权配置' }}</span>
      </p>
      <Form ref="addValidate" :model="addValidate" :rules="addRule" :label-width="150">
        <FormItem label="调用方编码" prop="clientCode">
          <Input v-model="addValidate.clientCode" name="clientCode" clearable placeholder="调用方编码" style="width:300px"></Input>
        </FormItem>
        <FormItem label="调用方名称" prop="clientName">
          <Input v-model="addValidate.clientName" name="clientName" clearable placeholder="调用方名称" style="width:300px"></Input>
        </FormItem>
        <FormItem label="调用方远程地址" prop="clientIP">
          <Input v-model="addValidate.clientIP" name="clientIP" clearable placeholder="调用方远程地址" style="width:300px"></Input>
        </FormItem>
        <FormItem label="I内网/O外网" props="inOrOut" class="none">
          <RadioGroup v-model="addValidate.inOrOut">
            <Radio label="I" name="inOrOut" value="I">I-内网</Radio>
            <Radio label="O" name="inOrOut" value="O">O-外网</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="数据字符集" prop="charSet">
          <Input v-model="addValidate.charSet" name="charSet" clearable placeholder="调用方远程地址" style="width:300px"></Input>
        </FormItem>
        <FormItem label="加密方式" props="encryptType">
          <RadioGroup v-model="addValidate.encryptType">
            <Radio label="0" name="encryptType" value="0">不加密</Radio>
            <Radio label="1" name="encryptType" value="1">DES</Radio>
            <Radio label="2" name="encryptType" value="2">Base64</Radio>
            <Radio label="3" name="encryptType" value="3">Ticket</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="search" @click="handleSave('addValidate')">保存</Button>
          <Button type="primary" @click="modal1 = false;showEdit=false">关闭</Button>
        </FormItem>
      </Form>
      <div slot="footer" />
    </Modal>
    <!-- 接口授权配置面板 -->
    <Modal v-model="showAuthModal" width='1200'>
      <div class="content-body">
        <div class="query-condition" :style="{marginBottom: '10px'}">
          <Form ref="AuthVosFrom" :model="AuthVosFrom" :label-width="80" inline>
            <Card>
              <p slot="title" class="align">
                <Icon type="navicon-round" /> {{ clientVo.clientCode }}({{ clientVo.clientName }})接口授权配置
              </p>
              <div slot="extra">
                <Button type="primary" icon="search" @click="handleClientAuthSave">保存配置</Button>
              </div>
              <div class="query-result">
                <Row class="configVos-header">
                  <Col span="5" class="head"> 接口代码
                  </Col>
                  <Col span="5" class="head"> 接口名称
                  </Col>
                  <Col span="4" class="head"> 授权
                  </Col>
                  <Col span="5" class="head"> 授权人
                  </Col>
                  <Col span="5" class="head"> 授权时间
                  </Col>
                </Row>
                <Row v-for="(apiClientAuthVo,index) in apiClientAuthVos" :key="index" class="configVos-body">
                  <Col span="5" class="item"> {{ apiClientAuthVo.apiCode }}
                  <input type="hidden" :name="'apiClientAuthVo['+index+'].id'" :v-model="apiClientAuthVo.id" :value="apiClientAuthVo.id">
                  <input type="hidden" :name="'apiClientAuthVo['+index+'].clientCode'" :v-model="apiClientAuthVo.clientCode" :value="apiClientAuthVo.clientCode">
                  </Col>
                  <Col span="5" class="item">
                  <input type="hidden" :name="'apiClientAuthVo['+index+'].apiCode'" :v-model="apiClientAuthVo.apiCode" :value="apiClientAuthVo.apiCode"> {{ apiClientAuthVo.apiCode }}
                  </Col>
                  <Col span="4" class="item">
                  <input type="hidden" :name="'apiClientAuthVo['+index+'].authFalg'" :value="apiClientAuthVo.authFalg">
                  <Checkbox true-value="1" false-value="0" value="true" v-model="apiClientAuthVo.authFalg" @on-change="checkAuthFlag(apiClientAuthVo)" />
                  </Col>
                  <Col span="5" class="item">
                  <input type="hidden" :name="'apiClientAuthVo['+index+'].createUser'" :v-model="apiClientAuthVo.createUser" :value="apiClientAuthVo.createUser"> {{ apiClientAuthVo.createUser||'-' }}
                  </Col>
                  <Col span="5" class="item">
                  <input type="hidden" :name="'apiClientAuthVo['+index+'].createTime'" :v-model="apiClientAuthVo.createTime" :value="apiClientAuthVo.createTime"> {{ apiClientAuthVo.createTime }}
                  </Col>
                </Row>
              </div>
            </Card>
          </Form>
        </div>
      </div>
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
  import {
    search,
    save,
    delete_api,
    clientAuthEdit_new,
    clientAuthSave
  } from '@/api/apiClientCfg.js'
  export default {
    data() {
      var that = this
      return {
        formValidate: {
          clientCode: '',
          clientName: '',
          validFlag: ''
        },
        addValidate: {
          clientCode: '',
          clientName: '',
          clientIP: '',
          inOrOut: '',
          charSet: '',
          encryptType: '0'
        },
        addRule: {
          clientCode: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }],
          clientName: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }],
          clientIP: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }],
          inOrOut: [{
            required: true,
            message: '请填写信息',
            trigger: 'change'
          }],
          charSet: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }],
          encryptType: [{
            required: true,
            message: '请填写信息',
            trigger: 'change'
          }]
        },
  
        spinShow: false,
        pageSize: 2,
        start: 0, // 初始化从0开始,start到pageSize即0-10之间条数
        loading: false,
        queryResult: [],
        totalCount: 0,
        modal1: false, // 新增面板的开关
        showAuthModal: false, // 接口授权配置开关
        sels: [], // 列表选中列
        showEdit: false, // showEdit=true表示是点击了修改,false为新增
        apiClientAuthVos: [],
        clientVo: {},
        columns1: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'id',
            key: 'id',
            width: 80,
            align: 'center'
          },
          {
            title: '客户端编码',
            key: 'clientCode'
          },
          {
            title: '客户端名称',
            key: 'clientName'
          },
          {
            title: '客户端远程地址',
            key: 'clientIP'
          },
          {
            title: '数字字符集',
            key: 'charSet'
          },
          {
            title: '修改时间',
            key: 'updateTime'
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
                        that.clientAuthEdit(params)
                      }
                    }
                  },
                  '接口授权'
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
        AuthVosFrom: {}
      }
    },
    methods: {
      // 换页
      changePage(pageNo) {
        var that = this
        this.start = (pageNo - 1) * this.pageSize
        this.$nextTick(function() {
          that.handleSearch()
        })
      },
      // 删除
      handleDel(row, index) {
        this.sels.push(row)
        this.batchRemove()
      },
      checkAuthFlag(apiClientAuthVo) {},
      // 保存配置
      handleClientAuthSave() {
        var that = this
        var formData = $(this.$refs['AuthVosFrom'].$el).serialize()
        console.log(formData)
        clientAuthSave(formData)
          .then(function(response) {
            if (response.status === 200) {
              that.$Notice.success({
                title: '保存成功!',
                duration: 4
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
      // 打开客户端接口授权配置界面
      clientAuthEdit(params) {
        var id = params.row.id
        var that = this
        that.spinShow = true
        clientAuthEdit_new(id)
          .then(function(response) {
            if (response.status === 200) {
              that.apiClientAuthVos = response.data.apiClientAuthVos
              that.clientVo = response.data.clientVo
              that.showAuthModal = true
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
      // 打开新增窗口
      openAdd() {
        this.handleReset('addValidate')
        this.modal1 = true
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
              var ids = that.sels.map(item => {
                return item.id
              })
              var params = {
                ids: ids
              }
              delete_api(params)
                .then(function(response) {
                  if (response.data.status === 200) {
                    that.$Notice.success({
                      title: '删除成功!',
                      duration: 2
                    })
                    that.sels = []
                    that.handleSearch()
                  } else {
                    that.$Notice.error({
                      title: '服务器异常,请稍候重试!',
                      duration: 3
                    })
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
          this.addValidate = Object.assign({}, this.sels[0])
          this.modal1 = true
          this.showEdit = true
        }
      },
      // sels：已选项数据
      selsChange(sels) {
        this.sels = sels
      },
      // 新增
      handleSave(name) {
        var that = this
        save(this.addValidate)
          .then(function(response) {
            if (response.data.status === 500) {
              that.modal1 = false
              that.$Notice.error({
                title: '服务器异常,请稍候重试!',
                duration: 3
              })
            } else {
              if (response.data !== null) {
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
        // this.$refs[name].validate((valid) => {
        //     if (valid) {
  
        //     } else {
        //         that.$Notice.error({title:'请填写信息!',duration: 3});
        //     }
        // })
      },
      // 查询
      handleSearch(name) {
        var that = this
        that.spinShow = true
        var formData = $(this.$refs['formValidate'].$el).serialize()
        search(formData)
          .then(function(response) {
            if (response.status === 200) {
              that.queryResult = response.data.data
              that.totalCount = response.data.recordsTotal
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
      handleReset(name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>


