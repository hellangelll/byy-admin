<style lang="less">
  @import '../tables/components/table.less';
</style>

<template>
  <div class="content-body">
    <div class="query-condition" :style="{marginBottom: '10px'}">
      <Form ref="formValidate" :model="formValidate" :label-width="80" inline>
        <Card>
          <p slot="title" class="align">
            <Icon type="navicon-round" /> 接口服务
          </p>
          <div slot="extra">
            <Button type="primary" icon="search" @click="handleSearch('formValidate')">查询</Button>
            <Button type="ghost" icon="reply" @click="handleReset('formValidate')">重置条件</Button>
          </div>
          <input type="hidden" name="start" style="display:none" :value="start">
          <input type="hidden" name="length" style="display:none" :value="pageSize">
          <FormItem label="接口代码" prop="apiCode">
            <Input v-model="formValidate.apiCode" name="apiCode" clearable placeholder="请输入接口代码" style="width:170px"></Input>
          </FormItem>
          <FormItem label="接口名称" prop="apiName">
            <Input v-model="formValidate.apiName" name="apiName" clearable placeholder="请输入接口名称" style="width:170px"></Input>
          </FormItem>
          <FormItem label="有效状态" prop="validFlag">
            <Select v-model="formValidate.validFlag" name="validFlag" clearable filterable placeholder="请选择有效状态" style="width:170px">
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
              <Button type="primary" icon="plus-round" @click="modal1 = true">新增</Button>
              <Button type="primary" icon="loop" @click="update">修改</Button>
              <Button type="primary" icon="trash-a" v-show="sels.length>1" @click="batchRemove">批量删除</Button>
            </div>
          </div>
          <Row>
            <Col span="24">
            <Table @on-selection-change="selsChange" :loading="loading" :columns="columns1" :data="queryResult" />
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
        <span>{{ showEdit===false?'新增接口管理':'编辑接口管理' }}</span>
      </p>
      <Form ref="addValidate" :model="addValidate" :rules="addRule" :label-width="80">

        <FormItem label="接口代码" prop="apiCode">
          <Input v-model="addValidate.apiCode" name="apiCode" clearable placeholder="请输入接口代码" style="width:300px"></Input>
        </FormItem>
        <FormItem label="接口名称" prop="apiName">
          <Input v-model="addValidate.apiName" name="apiName" clearable placeholder="请输入接口名称" style="width:300px"></Input>
        </FormItem>
        <FormItem label="接口描述" prop="apiDesc">
          <Input v-model="addValidate.apiDesc" name="apiDesc" clearable placeholder="请输入接口描述" style="width:300px"></Input>
        </FormItem>
        <FormItem label="记录日志" props="msgLogFlag">
          <RadioGroup v-model="addValidate.msgLogFlag">
            <Radio label="1" name="msgLogFlag" value="1">启用</Radio>
            <Radio label="0" name="msgLogFlag" value="0">禁用</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="接口监控" props="monitorFlag">
          <RadioGroup v-model="addValidate.monitorFlag">
            <Radio label="1" name="monitorFlag" value="1">启用</Radio>
            <Radio label="0" name="monitorFlag" value="0">禁用</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="有效状态" props="validFlag">
          <RadioGroup v-model="addValidate.validFlag">
            <Radio label="1" name="validFlag" value="1">有效</Radio>
            <Radio label="0" name="validFlag" value="0">无效</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="search" @click="handleSave('addValidate')">保存</Button>
          <Button type="primary" @click="modal1 = false;showEdit=false">关闭</Button>
        </FormItem>
      </Form>
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
  import canEditTable from '@/views/tables/components/canEditTable.vue'
  import {
    search,
    save,
    delete_api
  } from '@/api/apiServiceCfg.js'
  export default {
    name: 'ApiServiceCfgQuery',
    components: {
      canEditTable
    },
    data() {
      var that = this
      return {
        formValidate: {
          validFlag: '',
          apiCode: '',
          apiName: ''
        },
  
        addValidate: {
          apiCode: '',
          apiName: '',
          apiDesc: '',
          msgLogFlag: '1',
          monitorFlag: '1',
          validFlag: '1'
        },
        addRule: {
          apiCode: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }],
          apiName: [{
            required: true,
            message: '请填写信息',
            trigger: 'blur'
          }],
          msgLogFlag: [{
            required: true,
            message: '请填写信息',
            trigger: 'change'
          }],
          monitorFlag: [{
            required: true,
            message: '请填写信息',
            trigger: 'change'
          }],
          validFlag: [{
            required: true,
            message: '请填写信息',
            trigger: 'change'
          }],
          apiDesc: [{
            required: false,
            trigger: 'blur'
          }]
        },
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
            title: '接口代码',
            align: 'center',
            key: 'apiCode',
            editable: true
          },
          {
            title: '接口名称',
            align: 'center',
            key: 'apiName',
            editable: true
          },
          {
            title: '接口描述',
            align: 'center',
            key: 'apiDesc',
            editable: true
          },
          {
            title: '日志记录',
            align: 'center',
            key: 'msgLogFlag',
            editable: true
          },
          {
            title: '接口监控',
            align: 'center',
            key: 'monitorFlag',
            editable: true
          },
          {
            title: '有效状态',
            align: 'center',
            key: 'validFlagName',
            editable: true
          },
          {
            title: '修改时间',
            align: 'center',
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
        queryResult: [],
        pageSize: 5,
        start: 0, // 初始化从0开始,start到pageSize即0-10之间条数
        loading: false,
        totalCount: 0,
        modal1: false, // 新增面板的开关
        sels: [], // 列表选中列
        showEdit: false // showEdit=true表示是点击了修改,false为新增
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


