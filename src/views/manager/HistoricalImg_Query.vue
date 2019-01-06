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
              v-if="!formValidate.isRuning" 
              icon="ios-paperplane-outline" 
              @click="handleStart('formValidate')">开始执行</Button>
            <Button 
              type="primary" 
              v-else 
              icon="stop" 
              @click="handleStop('formValidate')">停止执行</Button>
            <Button 
              type="ghost" 
              icon="refresh" 
              @click="handleRefresh('formValidate')">刷新</Button>
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
          <input 
            type="hidden" 
            name="isRuning" 
            id="isRuning" 
            :value="formValidate.isRuning" >
          <Row>
            <Col span="24">
            <FormItem 
              label="提取机构" 
              prop="comCode">
              <Input 
                v-model="formValidate.comCode" 
                :value="formValidate.comCode" 
                name="comCode" 
                autocomplete="on" 
                clearable 
                placeholder="请输入提取机构" 
                style="width:200px"></Input>
            </FormItem>
            <FormItem 
              label="提取系统" 
              prop="appCode">
              <Input 
                v-model="formValidate.appCode" 
                :value="formValidate.appCode" 
                name="appCode" 
                autocomplete="on" 
                clearable 
                placeholder="请输入提取系统" 
                style="width:200px"></Input>
            </FormItem>

            <FormItem label="日期范围">
              <Row>
                <Col span="11">
                <FormItem prop="startDate">
                  <DatePicker 
                    v-model="formValidate.startDate" 
                    :value="formValidate.startDate" 
                    autocomplete="on" 
                    clearable 
                    name="startDate" 
                    type="date" />
                </FormItem>
                    </Col>
                <Col 
                  span="2" 
                  style="text-align: center">-</Col>
                <Col span="11">
                <FormItem prop="endDate">
                  <DatePicker 
                    v-model="formValidate.endDate" 
                    :value="formValidate.endDate" 
                    autocomplete="on" 
                    clearable 
                    name="endDate" 
                    type="date" />
                </FormItem>
                    </Col>
              </Row>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
            提取方式: 分<Input 
              v-model="formValidate.threadNum" 
              :value="formValidate.threadNum" 
              autocomplete="on" 
              clearable 
              name="threadNum" 
              style="width:40px"></Input>个线程提取，每
            <Input 
              v-model="formValidate.groupNum" 
              :value="formValidate.groupNum" 
              autocomplete="on" 
              name="groupNum" 
              clearable 
              style="width:40px"></Input>天一组 
                
             </Col>
          </Row>
        </Card>
      </Form>
    </div>
    <div class="query-result">
      <Table 
        :loading="loading" 
        :columns="columns1" 
        :data="queryResult" 
        border 
        height="470"/>
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
import {initQuery, startExecute, stopExecute, search} from '@/api/imgHistoricalLog.js'
export default {
  data () {
    return {
      formValidate: {
        isRuning: '',
        comCode: '',
        threadNum: '',
        groupNum: '',
        beginDate: '',
        finalDate: ''
      },
      columns1: [
        {
          title: '日期范围',
          key: 'startDate'
        },
        {
          title: '机构',
          key: 'comCode'
        },
        {
          title: '影像文件量',
          key: 'totalnum'
        },
        {
          title: '处理进度',
          key: 'handledRate'
        },
        {
          title: '开始时间',
          key: 'execstarttime'
        },
        {
          title: '完成时间',
          key: 'execendtime'
        },
        {
          title: '用时',
          key: 'execelapsetime'
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
  created () {
    this.initQuery()
  },
  methods: {
    initQuery () {
      var that = this
      initQuery()
        .then(function (response) {
          if (response.status === 200) {
            that.formValidate.isRuning = response.data.isRuning
            that.formValidate.comCode = response.data.comCode
            that.formValidate.threadNum = response.data.threadNum
            that.formValidate.groupNum = response.data.groupNum
            that.formValidate.beginDate = response.data.beginDate
            that.formValidate.finalDate = response.data.finalDate
          } else {
            that.$Notice.error({title: '服务器异常,请稍候重试!', duration: 3})
          }
          that.spinShow = false
          console.log(response)
        })
        .catch(function (error) {
          that.spinShow = false
          that.$Notice.error({title: '服务器异常,请稍候重试!', duration: 3})
          console.log(error)
        })
    },
    // 分页
    changePage (pageNo) {
      var that = this
      this.start = (pageNo - 1) * this.pageSize
      this.$nextTick(function () {
        that.handleRefresh('formValidate')
      })
    },
    error (msg) {
      this.$Message.error(msg)
    },
    // 刷新
    handleStart (name) {
      var that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          that.formValidate.isRuning = true
          var formData = $(this.$refs['formValidate'].$el).serialize()
          startExecute(formData)
            .then(function (response) {
            })
            .catch(function (error) {
              that.error('服务器异常,请稍候重试!')
              console.log(error)
            })
        } else {
          that.error('Fail!')
        }
      })
    },
    handleStop (name) {
      var that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          that.formValidate.isRuning = false
          var formData = $(this.$refs['formValidate'].$el).serialize()
          stopExecute(formData)
            .then(function (response) {
              that.loading = false
            })
            .catch(function (error) {
              that.error('服务器异常,请稍候重试!')
              console.log(error)
            })
        } else {
          that.error('Fail!')
        }
      })
    },
    handleRefresh (name) {
      var that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          that.loading = true
          var formData = $(this.$refs['formValidate'].$el).serialize()
          search(formData)
            .then(function (response) {
              that.loading = false
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


