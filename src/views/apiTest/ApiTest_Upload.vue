<style lang="less">
@import './style.less';
</style>

<template>
  <div class="content-body">
    <Row>
      <Col span="24" class="align-center">
      <Form :label-width="150" inline>
        <Row :gutter="16" type="flex" justify="center">
          <Col :xs="8" :sm="10" :md="12" :lg="16" style="text-align:right">
          <FormItem label="访问影像的Token" prop="token">
            <Input v-model="token" clearable placeholder="输入上传或查看地址栏中访问影像的Token,输入空时获取测试样本数据" style="width:450px"></Input>
          </FormItem>
          </Col>
          <Col :xs="16" :sm="14" :md="12" :lg="8" style="text-align:left">
          <Button type="primary" @click="loadCacheParam">获取缓存数据</Button>
          <Button type="primary" v-if="token" @click="openToken('upload')">打开上传界面</Button>
          <Button type="primary" v-if="token" @click="openToken('view')">打开查看界面</Button>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
    <Row style="background:#eee;" type="flex" justify="space-around" align="middle">
      <Col span="11" class="msg-form">
      <Form ref="paramVo" :model="paramVo">
        <Card :style="{marginBottom: '10px'}">
          <p slot="title" class="align">
            <Icon type="navicon-round" /> 接口服务
          </p>
          <FormItem label="网络类型">
            <RadioGroup v-model="paramVo.netType">
              <Radio label="http.inner">
                <span>内网</span>
              </Radio>
              <Radio label="http.outer">
                <span>外网</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="机构代码" prop="apiCode">
            <Input v-model="paramVo.comCode" clearable placeholder="机构代码" style="width:300px"></Input>
          </FormItem>
          <FormItem label="操作员" prop="apiName">
            <Input v-model="paramVo.optUserId" clearable placeholder="操作员ID" style="width:150px"></Input>
            <Input v-model="paramVo.optUserName" clearable placeholder="操作员姓名" style="width:150px"></Input>
          </FormItem>
          <FormItem label="操作角色" prop="apiCode">
            <Input v-model="paramVo.optRole" clearable placeholder="操作角色" style="width:300px"></Input>
          </FormItem>
        </Card>
        <Card v-for=" (bussVo,index) in paramVo.imgBussVos" :key="index" :style="{marginBottom: '10px'}">
          <p slot="title" class="align">
            <Icon type="navicon-round" /> 业务信息
          </p>
          <FormItem label="业务类型" prop="apiCode">
            <Input v-model="bussVo.bussType" clearable placeholder="请输入接口代码" style="width:300px"></Input>
          </FormItem>
          <FormItem label="业务编码" prop="apiName">
            <Input v-model="bussVo.bussNo" clearable placeholder="请输入接口名称" style="width:300px"></Input>
          </FormItem>
          <FormItem label="业务分类" prop="apiCode">
            <Input v-model="bussVo.riskCode" clearable placeholder="请输入接口代码" style="width:300px"></Input>
          </FormItem>
          <FormItem label="批次日期" prop="apiCode">
            <Input v-model="bussVo.bussDate" clearable placeholder="格式YYYYMMDD" style="width:300px"></Input>
          </FormItem>
          <FormItem label="业务归属机构" prop="apiCode">
            <Input v-model="bussVo.bussCom" clearable placeholder="请输入接口代码" style="width:300px"></Input>
          </FormItem>
        </Card>
        <Card :style="{marginBottom: '10px'}" v-for=" (imgItemVo,index) in paramVo.imgItemVos" :key="index">
          <div slot="title" class="align">
            <Icon type="navicon-round" /> 标的
            <Input size="small" placeholder="标的名称" v-model="imgItemVo.itemCode" style="width:300px"></Input>
          </div>
          <div v-for=" (itemImgTypeVo,index) in imgItemVo.imgTypeVos" :key="index">
            <Row :gutter='16'>
              <Col span="12">
              <FormItem label="单证类型" prop="apiCode">
                <Input v-model="itemImgTypeVo.typeCode" clearable placeholder="请输入接口代码" style="width:150px"></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="名称" prop="apiName">
                <Input v-model="itemImgTypeVo.typeName" clearable placeholder="请输入接口名称" style="width:150px"></Input>
              </FormItem>
              </Col>
            </Row>
          </div>
        </Card>
        <Card :style="{marginBottom: '10px'}">
          <div slot="title" class="align">
            <Icon type="navicon-round" /> 标的
            <Input size="small" value="粤B34567" clearable placeholder="请输入接口代码" style="width:300px"></Input>
          </div>
          <a slot="extra">
            单证类型控制
          </a>
          <div v-for=" (imgTypeVo,index) in paramVo.imgTypeVos" :key="index">
            <Row :gutter='16'>
              <Col span="12">
              <FormItem label="单证类型" prop="apiCode">
                <Input v-model="imgTypeVo.typeCode" clearable placeholder="请输入接口代码" style="width:150px"></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="名称" prop="apiName">
                <Input v-model="imgTypeVo.typeName" clearable placeholder="请输入接口名称" style="width:150px"></Input>
              </FormItem>
              </Col>
            </Row>
          </div>
        </Card>
        <Card :style="{marginBottom: '10px'}">
          <p slot="title" class="align">
            <Icon type="navicon-round" /> 其他属性
          </p>
          <FormItem label="已删除影像">
            <RadioGroup v-model="paramVo.showDelete">
              <Radio label="1">
                <span>显示</span>
              </Radio>
              <Radio label="0">
                <span>不显示</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="上传环节">
            <Input v-model="paramVo.uploadStep" clearable placeholder="请输入接口名称" style="width:300px"></Input>
          </FormItem>
        </Card>
      </Form>
      </Col>
      <Col span="2">
      <Row :gutter="16">
        <Col class="align-center">
        <Button type="primary" icon="search" @click="formToJson">生成JSON</Button>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col class="align-center">
        <Button type="primary" icon="search" @click="jsonToform">JSON解析</Button>
        </Col>
      </Row>
      </Col>
      <Col span="11" class="texterea">
      <Card shadow>
        <p slot="title">生成JSON</p>
        <Input v-model="paramJson" value="paramJson" type="textarea" :autosize="{minRows: 24,maxRows: 80}"></Input>
      </Card>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="24" class="align-center">
      <Button type="primary" icon="search" @click="callUploadApi('upload')">模拟调用上传接口</Button>
      <Button type="primary" icon="search" @click="callUploadApi('view')">模拟调用查看接口</Button>
      </Col>
    </Row>
    <div class="hidden">
      <form id="uploadform" name="uploadform" action="http://localhost:8080/h5img/app/upload.img" target="_blank">
        <input type="text" name="token" value="token">
      </form>
      <form id="viewform" name="viewform" action="http://localhost:8080/h5img/app/view.img" target="_blank">
        <input type="text" name="token" value="token">
      </form>
    </div>
  </div>
</template>

<script>
import { getApiData, callApi } from '@/api/apiTest.js'
export default {
  data() {
    return {
      imgBussVos: [],
      imgItemVos: [],
      imgTypeVos: [],
      paramVo: {},
      paramJson: '',
      loading: false,
      token: ''
    }
  },
  created() {
    this.loadCacheParam()
  },
  mounted() {},
  computed: {},
  methods: {
    loadCacheParam() {
      var that = this
      getApiData(this.token)
        .then(function(response) {
          if (response.data.status === 500) {
            that.$Notice.error({ title: '服务器异常,请稍候重试!', duration: 3 })
          } else {
            that.paramVo = response.data.data
            that.paramJson = JSON.stringify(response.data.data, null, 4)
            that.imgBussVos = response.data.data.imgBussVos
            that.imgItemVos = response.data.data.imgItemVos
            that.imgTypeVos = response.data.data.imgTypeVos
          }
        })
        .catch(function(error) {
          that.$Notice.error({ title: '服务器异常,请稍候重试!', duration: 3 })
          console.log(error)
        })
    },
    // 打开上传,查看界面
    openToken(viewType) {
      if (viewType === 'upload') {
        uploadform.submit()
      } else {
        viewform.submit()
      }
    },
    // 模拟调用上传接口
    callUploadApi(viewType) {
      var that = this
      this.paramVo = JSON.parse(this.paramJson)
      this.paramVo.viewType = viewType
      callApi(this.paramVo)
        .then(function(response) {
          if (response.data.status === 200) {
            var url = response.data.datas.url
            that.token = response.data.datas.token
            window.open(url, '_blank')
          } else {
            that.$Notice.error({ title: response.data.statusText, duration: 3 })
          }
          console.log(that.paramJson)
        })
        .catch(function(error) {
          that.$Notice.error({ title: '服务器异常,请稍候重试!', duration: 3 })
          console.log(error)
        })
    },
    // 生成json
    formToJson() {
      this.paramJson = JSON.stringify(this.paramVo, null, 4)
    },
    // json解析
    jsonToform() {
      this.paramVo = JSON.parse(this.paramJson)
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>


