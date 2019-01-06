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
            影像查询浏览
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
              placeholder="填写完整业务号" 
              style="width:200px"></Input>
          </FormItem>
          <FormItem 
            label="关联号" 
            prop="linkNo">
            <Input 
              v-model="formValidate.linkNo" 
              name="linkNo" 
              clearable 
              placeholder="关联的业务号，身份证，银行卡等" 
              style="width:200px"></Input>
          </FormItem>
          <FormItem 
            label="上传人" 
            prop="createUser">
            <Input 
              v-model="formValidate.createUser" 
              name="createUser" 
              clearable 
              placeholder="上传人代码" 
              style="width:200px"></Input>
          </FormItem>
          <FormItem label="创建时间">
            <Row>
              <Col span="11">
              <FormItem prop="createTimeStart">
                <DatePicker 
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
        border />
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
import {imgDocMainQuerySearch} from '@/api/manager.js'
export default {
  data () {
    return {
      formValidate: {
        linkNo: '',
        bussNo: '',
        bussType: '',
        createUser: '',
        createTimeStart: '',
        createTimeEnd: ''
      },

      columns1: [
        {
          title: '业务类型',
          key: 'bussType'
        },
        {
          title: '业务号',
          key: 'bussNo'
        },
        {
          title: '业务分类',
          key: 'riskCode'
        },
        {
          title: '归属机构',
          key: 'bussCom'
        },
        {
          title: '关联号(身份证，银行卡)',
          key: 'linkNo'
        },
        {
          title: '创建人',
          key: 'createUserName'
        },
        {
          title: '创建时间',
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
          imgDocMainQuerySearch(formData)
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


