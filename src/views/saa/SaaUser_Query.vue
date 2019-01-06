<style lang="less">
  @import './style.less';
</style>

<template>
  <div class="content-body">
    <div class="query-condition" :style="{marginBottom: '10px'}">
      <Form ref="formValidate" :model="formValidate" :label-width="80" inline>
        <Card>
          <p slot="title" class="align">
            <Icon type="navicon-round" /> 用户查询
          </p>
          <div slot="extra">
            <Button type="primary" icon="search" @click="handleSearch('formValidate')">查询</Button>
            <Button type="ghost" icon="reply" @click="handleReset('formValidate')">重置条件</Button>
          </div>
          <input type="hidden" name="start" style="display:none" :value="start">
          <input type="hidden" name="length" style="display:none" :value="pageSize">
          <FormItem label="用户编码" prop="userCode">
            <Input v-model="formValidate.userCode" name="userCode" clearable placeholder="请输入用户编码" style="width:200px"></Input>
          </FormItem>
          <FormItem label="用户名称" prop="userName">
            <Input v-model="formValidate.userName" name="userName" clearable placeholder="请输入用户名称" style="width:200px"></Input>
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
            <Table @on-selection-change="selsChange" :loading="loading" :columns="columns1" :data="queryResult" border height="400" />
            <div class="page">
              <Page @on-change="changePage" :style="{marginTop: '30px'}" :total="totalCount" :page-size="pageSize" class="table-pager" show-elevator show-sizer/>
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
        <span>{{ showEdit===false?'新增用户管理':'编辑用户管理' }}</span>
      </p>
      <Form ref="addValidate" :model="addValidate" :rules="addRule" :label-width="150">

        <FormItem label="用户编码" prop="userCode">
          <Input v-model="addValidate.userCode" name="userCode" clearable placeholder="请输入用户编码" style="width:300px"></Input>
        </FormItem>
        <FormItem label="用户名称" prop="userName">
          <Input v-model="addValidate.userName" name="userName" clearable placeholder="请输入用户名称" style="width:300px"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="addValidate.password" name="password" clearable placeholder="请输入密码" style="width:300px"></Input>
        </FormItem>
        <FormItem label="密码设定时间" prop="pwdSetDate">
          <DatePicker type="date" placeholder="密码设定时间" name="pwdSetDate" :options="dateOptions" v-model="addValidate.pwdSetDate" style="width:300px" />
        </FormItem>
        <FormItem label="密码失效时间" prop="pwdExpDate">
          <DatePicker type="date" placeholder="密码失效时间" name="pwdExpDate" :options="dateOptions" v-model="addValidate.pwdExpDate" style="width:300px" />
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="addValidate.email" name="email" clearable placeholder="请输入邮箱" style="width:300px"></Input>
        </FormItem>
        <FormItem label="手机号" prop="mobileNo">
          <Input v-model="addValidate.mobileNo" name="mobileNo" clearable placeholder="请输入手机号" style="width:300px"></Input>
        </FormItem>
        <FormItem label="公司代码" prop="comCode">
          <Input v-model="addValidate.comCode" name="comCode" clearable placeholder="请输入公司代码" style="width:300px"></Input>
        </FormItem>
        <FormItem label="有效状态" prop="validFlag">
          <Select v-model="addValidate.validFlag" name="validFlag" clearable filterable placeholder="请选择有效状态" style="width:300px">
            <Option value="">请选择</Option>
            <Option value="1">有效</Option>
            <Option value="0">无效</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="checkmark-round" @click="handleSave('addValidate')">保存</Button>
          <Button type="primary" icon="close-round" @click="modal1 = false;showEdit=false">关闭</Button>
        </FormItem>
      </Form>
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
  import {
    search,
    save,
    delete_api
  } from '@/api/saaUser.js'
  export default {
    data() {
      var that = this
      return {
        formValidate: {
          userCode: '',
          userName: ''
        },
        addValidate: {
          userCode: '',
          userName: '',
          password: '',
          email: '',
          mobileNo: '',
          comCode: '',
          pwdSetDate: '',
          pwdExpDate: '',
          validFlag: '1'
        },
        addRule: {
          userCode: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }],
          userName: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }]
        },
        dateOptions: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        pageSize: 5,
        start: 0, // 初始化从0开始,start到pageSize即0-10之间条数
        loading: false,
        totalCount: 0,
        modal1: false, // 新增面板的开关
        sels: [], // 列表选中列
        showEdit: false, // showEdit=true表示是点击了修改,false为新增
        queryResult: [],
        columns1: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '用户编码',
            key: 'userCode'
          },
          {
            title: '用户名称',
            key: 'userName'
          },
          {
            title: '公司代码',
            key: 'comCode'
          },
          {
            title: '手机号码',
            key: 'mobileNo'
          },
          {
            title: '电子邮箱',
            key: 'email'
          },
          {
            title: '密码设定时间',
            key: 'pwdSetDate'
          },
          {
            title: '密码失效时间',
            key: 'pwdExpDate'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '修改时间',
            key: 'updateTime'
          },
          {
            title: '有效状态',
            key: 'validFlag'
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
        ]
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
              var userCodes = that.sels.map(item => {
                return item.userCode
              })
              var params = {
                userCodes: userCodes
              }
              delete_api(params)
                .then(function(response) {
                  if (response.data.status === 200) {
                    that.$Notice.success({
                      title: '删除成功!',
                      duration: 2
                    })
                    that.sels = []
                    that.handleSearch('addValidate')
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
          this.modal1 = true
          this.showEdit = true
          this.addValidate = Object.assign({}, this.sels[0])
        }
      },
      // sels：已选项数据
      selsChange(sels) {
        this.sels = sels
      },
      // 打开新增窗口
      openAdd() {
        this.handleReset('addValidate')
        this.modal1 = true
      },
      // 新增
      handleSave(name) {
        var that = this
        var formData = $(this.$refs['addValidate'].$el).serialize()
        console.log(formData)
        save(formData)
          .then(function(response) {
            if (response.data.status === 500) {
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
        console.log(formData)
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


