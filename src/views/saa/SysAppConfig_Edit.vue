<style lang="less">
  @import './style.less';
</style>

<template>
  <div class="content-body">
    <div class="query-result">
      <Spin size="large" fix v-if="spinShow" />
      <Form ref="configVofrom">
        <Card>
          <p slot="title" class="align">
          <Icon type="navicon-round" /> 系统参数配置</p>
          <div slot="extra">
            <Button type="primary" icon="search" @click="handleSave()">保存配置</Button>
          </div>
          <Tabs type="card">
            <TabPane label="通用">
              <Row class="configVos-header">
                <Col span="5" class="head"> 参数代码
                </Col>
                <Col span="5" class="head"> 参数名称
                </Col>
                <Col span="7" class="head"> 参数名称
                </Col>
                <Col span="7" class="head"> 参数配置说明
                </Col>
              </Row>
              <Row v-for="(configVo,index) in commonList" :key="configVo.id" v-if="configVo.classifyType===0" class="configVos-body">
                <Col span="5" class="item"> {{ configVo.cfgKey }}
                <input type="hidden" :name="'configVos['+index+'].id'" :v-model="configVo.id" :value="configVo.id">
                <input type="hidden" :name="'configVos['+index+'].classifyType'" :v-model="configVo.classifyType" :value="configVo.classifyType">
                </Col>
                <Col span="5" class="item"> {{ configVo.cfgName }}
                </Col>
                <Col span="7" class="item">
                <Input v-model="configVo.cfgValue" :name="'configVos['+index+'].cfgValue'"></Input>
                </Col>
                <Col span="7" class="item"> {{ configVo.cfgDesc }}
                </Col>
              </Row>
            </TabPane>
            <TabPane label="本地">
              <Row class="configVos-header">
                <Col span="5" class="head"> 参数代码
                </Col>
                <Col span="5" class="head"> 参数名称
                </Col>
                <Col span="7" class="head"> 参数名称
                </Col>
                <Col span="7" class="head"> 参数配置说明
                </Col>
              </Row>
              <Row v-for="(configVo,index) in localList" :key="configVo.id" v-if="configVo.classifyType===1" class="configVos-body">
                <Col span="5" class="item"> {{ configVo.cfgKey }}
                <input type="hidden" :name="'configVos['+index+'].id'" :v-model="configVo.id" :value="configVo.id">
                <input type="hidden" :name="'configVos['+index+'].classifyType'" :v-model="configVo.classifyType" :value="configVo.classifyType">
                </Col>
                <Col span="5" class="item"> {{ configVo.cfgName }}
                </Col>
                <Col span="7" class="item">
                <Input v-model="configVo.cfgValue"></Input>
                </Col>
                <Col span="7" class="item"> {{ configVo.cfgDesc }}
                </Col>
              </Row>
            </TabPane>
            <TabPane label="云服务">
              <Row class="configVos-header">
                <Col span="5" class="head"> 参数代码
                </Col>
                <Col span="5" class="head"> 参数名称
                </Col>
                <Col span="7" class="head"> 参数名称
                </Col>
                <Col span="7" class="head"> 参数配置说明
                </Col>
              </Row>
              <Row v-for="(configVo,index) in serviceList" :key="configVo.id" v-if="configVo.classifyType===2" class="configVos-body">
                <Col span="5" class="item"> {{ configVo.cfgKey }}
                <input type="hidden" :name="'configVos['+index+'].id'" :v-model="configVo.id" :value="configVo.id">
                <input type="hidden" :name="'configVos['+index+'].classifyType'" :v-model="configVo.classifyType" :value="configVo.classifyType">
                </Col>
                <Col span="5" class="item"> {{ configVo.cfgName }}
                </Col>
                <Col span="7" class="item">
                <Input v-model="configVo.cfgValue"></Input>
                </Col>
                <Col span="7" class="item"> {{ configVo.cfgDesc }}
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </Form>
    </div>
  </div>
</template>

<script>
  import canEditTable from '@/views/tables/components/canEditTable.vue'
  import qs from 'qs'
  import {
    initEdit_new,
    save_new
  } from '@/api/sysConfig.js'
  export default {
    name: 'BussRole',
    components: {
      canEditTable
    },
    data() {
      var that = this
      return {
        configList: [], // 所有数据
        commonList: [], // 通用
        localList: [], // 本地
        serviceList: [], // 云服务
        spinShow: false
      }
    },
    created() {
      this.initEdit()
    },
    methods: {
      initEdit() {
        var that = this
        that.spinShow = true
        initEdit_new()
          .then(function(response) {
            if (response.status === 200) {
              that.configList = response.data.configList
              for (let i = 0; i < response.data.configList.length; i++) {
                let item = response.data.configList[i]
                if (item.classifyType === 0) {
                  that.commonList.push(item)
                } else if (item.classifyType === 1) {
                  that.localList.push(item)
                } else {
                  that.serviceList.push(item)
                }
              }
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
      handleSave(name) {
        var formData = $(this.$refs['configVofrom'].$el).serialize()
        var that = this
        save_new(formData)
          .then(function(response) {
            if (response.status === 200) {
              that.configList = response.data.configList
              that.$Notice.success({
                title: '配置保存成功',
                desc: '标记（R）的配置需要重启后生效!',
                duration: 0
              })
            } else {
              that.$Notice.error({
                title: '服务器异常,请稍候重试!',
                duration: 3
              })
            }
            console.log(response)
          })
          .catch(function(error) {
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


