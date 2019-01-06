<style lang="less">
  @import './style.less';
</style>

<template>
  <div class="content-body">
    <Spin size="large" fix v-if="spinShow" />
    <div class="query-condition" :style="{marginBottom: '10px'}">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline>
        <Card>
          <p slot="title" class="align">
            <Icon type="navicon-round" /> 前端操作记录查询
          </p>
          <div slot="extra">
            <Button type="primary" icon="search" @click="handleSearch('formValidate')">查询</Button>
            <Button type="ghost" icon="reply" @click="handleReset('formValidate')">重置条件</Button>
          </div>
          <input type="hidden" name="start" style="display:none" :value="start">
          <input type="hidden" name="length" style="display:none" :value="pageSize">
          <FormItem label="业务类型" prop="bussType">
            <Select v-model="formValidate.bussType" name="bussType" clearable filterable placeholder="请选择业务类型" style="width:200px">
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
          <FormItem label="业务号" prop="bussNo">

            <Input v-model="formValidate.bussNo" name="bussNo" clearable placeholder="填写完整业务号" style="width:200px"></Input>
          </FormItem>
          <FormItem label="客户端IP" prop="clientIP">
            <Input v-model="formValidate.clientIP" name="clientIP" clearable placeholder="请输入客户端IP" style="width:200px"></Input>
          </FormItem>
          <FormItem label="操作员IP" prop="userCode">
            <Input v-model="formValidate.userCode" name="userCode" clearable placeholder="请输入操作员IP" style="width:200px"></Input>
          </FormItem>
          <FormItem label="操作时间">
            <Row>
              <Col span="11">
              <FormItem prop="openTimeStart">
                <DatePicker name="openTimeStart" :options="options1" type="date" v-model="formValidate.openTimeStart" />
              </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
              <FormItem prop="openTimeEnd">
                <DatePicker name="openTimeEnd" type="date" :options="options2" v-model="formValidate.openTimeEnd" />
              </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Card>
      </Form>
    </div>
    <div class="query-result">
      <Table :loading="loading" :columns="columns1" :data="queryResult" height="450" />
      <div class="page" :style="{marginTop: '10px'}">
        <Page @on-change="changePage" :total="totalCount" :page-size="pageSize" class="table-pager" show-elevator show-sizer/>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    operationLogSearch
  } from '@/api/loggerQuery.js'
  export default {
    data() {
      return {
        formValidate: {
          bussType: '',
          bussNo: '',
          userCode: '',
          openTimeStart: '',
          openTimeEnd: ''
        },
        ruleValidate: {
          bussType: [{
            required: true,
            message: '请选择业务类型',
            trigger: 'blur'
          }],
          openTimeStart: [{
            required: true,
            type: 'date',
            message: '请选择开始时间',
            trigger: 'blur'
          }],
          openTimeEnd: [{
            required: true,
            type: 'date',
            message: '请选择结束时间',
            trigger: 'blur'
          }]
        },
        options2: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now() - 36000000
          }
        },
        options1: {
          shortcuts: [{
              text: '最近三天',
              value() {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 3)
                return date
              },
              onClick: picker => {
                // this.$Message.info('Click today');
              }
            },
            {
              text: '最近一周',
              value() {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                return date
              },
              onClick: picker => {
                // this.$Message.info('Click yesterday');
              }
            },
            {
              text: '最近一个月',
              value() {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
                return date
              },
              onClick: picker => {
                // this.$Message.info('Click a week ago');
              }
            }
          ]
        },
        columns1: [{
            title: '业务类型',
            key: 'bussType'
          },
          {
            title: '业务号',
            key: 'bussNo'
          },
          {
            title: '操作员',
            key: 'userCode'
          },
          {
            title: '客户端IP',
            key: 'clientIP'
          },
          {
            title: '影像版本',
            key: 'imgVersion'
          },
          {
            title: '浏览器信息',
            key: 'browserInfo'
          },
          {
            title: 'token(仅30分钟有效)',
            key: 'token'
          },
          {
            title: '界面打开',
            key: 'openTime'
          },
          {
            title: '界面关闭时间',
            key: 'closeTime'
          },
          {
            title: '成功保存次数',
            key: 'successCount'
          },
          {
            title: '失败保存次数',
            key: 'failureCount'
          },
          {
            title: '最大上传时间',
            key: 'maxUploadTime'
          },
          {
            title: '最大上传文件',
            key: 'maxUploadFile'
          }
        ],
        queryResult: [],
        loading: false,
        spinShow: false,
        pageSize: 10,
        totalCount: 0,
        start: 0 // 初始化从0开始,start到pageSize即0-10之间条数
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
      handleSearch(name) {
        var that = this
        that.spinShow = true
        var formData = $(this.$refs['formValidate'].$el).serialize()
        console.log(formData)
        operationLogSearch(formData)
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
