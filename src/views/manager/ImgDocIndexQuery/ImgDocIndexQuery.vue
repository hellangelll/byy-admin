<style lang="less">
</style>

<template>
  <div class="content-body">
    <div 
      class="query-condition" 
      :style="{marginBottom: '10px'}">
      <Form 
        ref="formValidate" 
        :model="formValidate" 
        :rules="ruleValidate" 
        :label-width="80" 
        inline>
        <Card>
          <p 
            slot="title" 
            class="align">
            <Icon type="navicon-round"/>
            影像文件查询
          </p>
          <div slot="extra">
            <Button 
              type="primary" 
              icon="search" 
              @click="handleSearch('formValidate')">查询</Button>
            <Button 
              type="ghost" 
              icon="reply" 
              @click="handleReset('formValidate')">重置条件</Button>
          </div>
          <input 
            type="hidden" 
            name="start" 
            style="display:none" 
            :value="start">
          <input 
            type="hidden" 
            name="length" 
            style="display:none" 
            :value="pageSize">
          <FormItem 
            label="业务类型" 
            prop="bussType">
            <Select 
              v-model="formValidate.bussType" 
              name="bussType" 
              clearable 
              filterable 
              placeholder="请选择业务类型" 
              style="width:200px">
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
          <FormItem 
            label="业务号" 
            prop="bussNo">
            <Input 
              v-model="formValidate.bussNo" 
              name="bussNo" 
              autocomplete="on" 
              clearable 
              placeholder="请输入业务号" 
              style="width:200px"></Input>
          </FormItem>
          <FormItem 
            label="有效状态" 
            prop="validFlag">
            <Select 
              v-model="formValidate.validFlag" 
              name="validFlag" 
              clearable 
              filterable 
              placeholder="请选择有效状态" 
              style="width:200px">
              <Option value="">请选择</Option>
              <Option value="1">有效</Option>
              <Option value="0">无效</Option>
            </Select>
          </FormItem>
          <FormItem label="上传时间">
            <Row>
              <Col span="11">
              <FormItem prop="createTimeStart">
                <DatePicker 
                  :options="options1" 
                  v-model="formValidate.createTimeStart" 
                  name="createTimeStart" 
                  type="date" />
              </FormItem>
                    </Col>
              <Col 
                span="2" 
                style="text-align: center">-</Col>
              <Col span="11">
              <FormItem prop="createTimeEnd">
                <DatePicker 
                  v-model="formValidate.createTimeEnd" 
                  name="createTimeEnd" 
                  type="date" />
              </FormItem>
                    </Col>
            </Row>
          </FormItem>
            
        </Card>
      </Form>
    </div>
    <div class="query-result">
      <Table 
        :loading="loading" 
        :columns="columns1" 
        :data="queryResult" 
        border 
        height="350"/>
      <div class="page">
        <Page 
          @on-change="changePage" 
          :total="totalCount" 
          :page-size="pageSize" 
          class="table-pager" 
          show-elevator 
          show-sizer/>
      </div>
    </div>
  </div>
    

</template>

<script>
import {query_imgDocIndex} from '@/api/manager.js'
export default {
  data () {
    return {
      formValidate: {
        validFlag: '',
        bussNo: '',
        bussType: '',
        createTimeStart: '',
        createTimeEnd: ''
      },

      ruleValidate: {
        bussNo: [
          { required: true, message: '请输入业务号', trigger: 'blur' }
        ],
        bussType: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ]
      },
      options1: {
        shortcuts: [
          {
            text: '最近三天',
            value () {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 3)
              return date
            },
            onClick: (picker) => {
              // this.$Message.info('Click today');
            }
          },
          {
            text: '最近一周',
            value () {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              return date
            },
            onClick: (picker) => {
              // this.$Message.info('Click yesterday');
            }
          },
          {
            text: '最近一个月',
            value () {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
              return date
            },
            onClick: (picker) => {
              // this.$Message.info('Click a week ago');
            }
          }
        ]
      },
      columns1: [
        {
          title: '归属年月',
          key: 'bussDate'
        },
        {
          title: '险种',
          key: 'riskCode'
        },
        {
          title: '存储空间',
          key: 'bucket'
        },
        {
          title: '文件名',
          key: 'fileOrgName'
        },
        {
          title: '文件大小',
          key: 'fileSize'
        },
        {
          title: '影像类型',
          key: 'typePath'
        },
        {
          title: '标的',
          key: 'itemCode'
        },
        {
          title: '上传控件',
          key: 'systemTag'
        },

        {
          title: '相机型号',
          key: 'shootModel'
        },
        {
          title: '有效状态',
          key: 'validFlagName'
        },
        {
          title: '上传人',
          key: 'createUserName'
        },
        {
          title: '上传时间',
          key: 'createTime'
        }
      ],
      queryResult: [
      ],
      loading: false,
      totalCount: 0,
      pageSize: 10,
      start: 0
    }
  },
  methods: {
    // 换页
    changePage (pageNo) {
      var that = this
      this.start = (pageNo - 1) * this.pageSize
      this.$nextTick(function () {
        that.handleSearch('formValidate')
      })
    },
    error (msg) {
      this.$Message.error(msg)
    },
    handleSearch (name) {
      var that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          that.loading = true
          var formData = $(this.$refs['formValidate'].$el).serialize()
          query_imgDocIndex(formData)
            .then(function (response) {
              that.loading = false
              that.queryResult = response.data.data
              that.totalCount = response.data.recordsTotal
            })
            .catch(function (error) {
              that.loading = false
              that.error('服务器异常,请稍候重试!')
              console.log(error)
            })
        } else {
          that.loading = false
          that.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>


