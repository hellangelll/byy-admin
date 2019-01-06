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
            <Icon type="navicon-round" /> 岗位列表
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
          <FormItem label="统计方式" prop="statType">
            <Select v-model="formValidate.statType" @on-change="changeStatType" name="statType" clearable filterable placeholder="请选择业务类型" style="width:200px">
              <Option value="D">按天</Option>
              <Option value="M">按月</Option>
            </Select>
          </FormItem>
          <FormItem label="统计区间" v-if="!showStatMonth">
            <Row>
              <Col span="11">
              <FormItem prop="statDayStart">
                <DatePicker name="statDayStart" type="date" :options="options3" v-model="formValidate.statDayStart" />
              </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
              <FormItem prop="statDayEnd">
                <DatePicker name="statDayEnd" type="date" :options="options3" v-model="formValidate.statDayEnd" />
              </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="统计区间" v-if="showStatMonth">
            <Row>
              <Col span="11">
              <FormItem prop="statMonthStart">
                <DatePicker name="statMonthStart" type="month" format="yyyyMM" :options="options3" show-week-numbers v-model="formValidate.statMonthStart" />
              </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
              <FormItem prop="statMonthEnd">
                <DatePicker name="statMonthEnd" type="month" format="yyyyMM" :options="options3" show-week-numbers v-model="formValidate.statMonthEnd" />
              </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Card>
      </Form>

    </div>
    <div class="query-result">
      <Table :loading="loading" :columns="columns1" :data="queryResult" border height="400" />
      <div class="page" :style="{marginTop: '10px'}">
        <Page @on-change="changePage" :total="totalCount" :page-size="pageSize" class="table-pager" show-elevator show-sizer/>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    search_new
  } from '@/api/statReport.js'
  export default {
    data() {
      return {
        spinShow: false,
        formValidate: {
          bussType: '',
          statType: '',
          statDayStart: '',
          statDayEnd: ''
        },
  
        ruleValidate: {
          bussType: [{
            required: true,
            message: '请选择业务类型',
            trigger: 'blur'
          }],
          statDayStart: [{
            required: true,
            type: 'date',
            message: '请选择区间开始时间',
            trigger: 'blur'
          }],
          statDayEnd: [{
            required: true,
            type: 'date',
            message: '请选择区间结束时间',
            trigger: 'blur'
          }]
        },
        options3: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now() - 36000000
          }
        },
        columns1: [{
            title: '业务类型',
            key: 'apiCode'
          },
          {
            title: '上传机构',
            key: 'memory-space'
          },
          {
            title: '险种',
            key: 'filename'
          },
          {
            title: '客户端版本',
            key: 'file-size'
          },
          {
            title: '单证类型',
            key: 'image-type'
          },
          {
            title: '上传数量',
            key: 'object'
          },
          {
            title: '删除数量',
            key: 'image-type'
          },
          {
            title: '影像总大小',
            key: 'object'
          }
        ],
        loading: false,
        showStatMonth: false, // 是否按月,否则按天
        pageSize: 10,
        start: 0,
        totalCount: 0,
        queryResult: []
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
      // 选择区间
      changeStatType() {
        console.log()
        if (this.formValidate.statType === 'M') {
          this.showStatMonth = true
        } else {
          this.showStatMonth = false
        }
      },
      handleSearch(name) {
        var that = this
        this.$refs[name].validate(valid => {
          if (valid) {
            that.spinShow = true
            var formData = $(this.$refs['formValidate'].$el).serialize()
            search_new(formData)
              .then(function(response) {
                if (response.status === 200) {} else {
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
            this.$Message.error('请填写信息!')
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>


