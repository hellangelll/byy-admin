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
        :label-width="150" 
        inline>
        <Card>
          <p 
            slot="title" 
            class="align">
            <Icon type="navicon-round"/>
            影像扫描
          </p>
          <div slot="extra">
            <Button 
              type="primary" 
              icon="search" 
              ref="upload" 
              @click="handleSubmit('formValidate')">影像扫描</Button>
            <Button 
              type="primary" 
              icon="search" 
              ref="view" 
              @click="handleSubmit('formValidate')">影像查看</Button>
            <Button 
              type="ghost" 
              icon="reply" 
              @click="handleReset('formValidate')">重置条件</Button>
          </div>
          <FormItem 
            label="业务类型" 
            prop="bussType">
            <Select 
              name="bussType" 
              v-model="formValidate.bussType" 
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
            <input 
              type="hidden" 
              id="viewType" 
              name="viewType" 
              value="upload">
            <Input 
              v-model="formValidate.bussNo" 
              clearable 
              placeholder="请输入业务号" 
              autocomplete="on" 
              style="width:200px"></Input>
          </FormItem>
          <FormItem 
            label="业务年份" 
            prop="bussDate">
            <Input 
              v-model="formValidate.bussDate" 
              clearable 
              placeholder="请输入业务年份" 
              autocomplete="on" 
              style="width:200px"></Input>
          </FormItem>
          <FormItem 
            label="业务机构" 
            prop="comCode">
            <Input 
              v-model="formValidate.comCode" 
              clearable 
              placeholder="请输入业务机构" 
              autocomplete="on" 
              style="width:200px"></Input>
          </FormItem>
          <FormItem 
            label="显示删除影像" 
            prop="showDelete">
            <Select 
              v-model="formValidate.showDelete" 
              clearable 
              style="width:200px">
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
          <FormItem 
            label="角色代码" 
            prop="optRole">
            <Input 
              v-model="formValidate.optRole" 
              clearable 
              placeholder="请输入角色代码" 
              autocomplete="on" 
              style="width:200px"></Input>
          </FormItem>
        </Card>
      </Form>
    </div>
  </div>
    

</template>

<script>
import {scan_img} from '@/api/manager.js'
export default {
  data () {
    return {
      formValidate: {
        bussType: '',
        bussNo: '',
        bussDate: '',
        comCode: '',
        optRole: '',
        showDelete: '1'
      },
      ruleValidate: {
        bussType: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        bussNo: [
          { required: true, message: '请输入业务号', trigger: 'blur' }
        ],
        bussDate: [
          { required: true, message: '请选择业务年份', trigger: 'blur' }
        ],
        comCode: [
          { required: true, message: '请输入业务机构', trigger: 'blur' }
        ],
        optRole: [
          { required: true, message: '请输入角色代码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    isIEAX () { // ie?
      if (!!window.ActiveXObject || 'ActiveXObject' in window) { return true } else { return false }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        var that = this
        if (valid) {
          scan_img({
            bussType: this.formValidate.bussType,
            bussNo: this.formValidate.bussNo,
            bussDate: this.formValidate.bussDate,
            comCode: this.formValidate.comCode,
            showDelete: this.formValidate.showDelete,
            optRole: this.formValidate.optRole
          })
            .then(function (response) {
              if (response.data.status === 500) {
                that.$Notice.error({title: '服务器异常,请稍候重试!', duration: 3})
              } else {
                if (response.data.data !== null) {
                  that.$Notice.success({title: 'success!', duration: 2})
                  if (that.isIEAX()) {
                    window.open('http://localhost:8080/h5img/app/flash.img?token=' + response.data.data)
                  } else if (that.$refs.upload.$el.innerText.trim() === '影像扫描') {
                    window.open('http://localhost:8080/h5img/app/upload.img?token=' + response.data.data)
                  } else {
                    window.open('http://localhost:8080/h5img/app/view.img?token=' + response.data.data)
                  }
                } else {
                  this.$router.push({ path: '/' })
                }
              }
              console.log(response)
            })
            .catch(function (error) {
              that.loading = false
              that.$Notice.error({title: '服务器异常,请稍候重试!', duration: 3})
              console.log(error)
            })
        } else {
          that.$Notice.error({title: 'Fail!', duration: 3})
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>


