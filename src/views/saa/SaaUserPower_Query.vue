<style lang="less">
  @import './style.less';
</style>

<template>
  <div class="content-body">
    <Spin size="large" fix v-if="spinShow" />
    <Row>
      <Col span="6">
      <div class="query-condition">
        <Card>
          <p slot="title" class="align">
            <Icon type="search" /> 用户查询
          </p>
          <Form ref="formValidate" :model="formValidate" :label-width="80">
            <Row>
              <Col span="24">
              <FormItem label="用户代码" prop="userCode">
                <Input v-model="formValidate.userCode" name="userCode" clearable placeholder="请输入用户代码"></Input>
              </FormItem>
              </Col>
              <Col span="24">
              <FormItem label="用户名称" prop="userName">
                <Input v-model="formValidate.userName" name="userName" clearable placeholder="请输入用户名称"></Input>
              </FormItem>
              </Col>
              <Col span="24">
              <FormItem>
                <Button type="primary" icon="search" @click="handleSearch('formValidate')">查询</Button>
                <Button type="ghost" icon="reply" @click="handleReset('formValidate')">重置条件</Button>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <div class="margin-top">
        <Card>
          <p slot="title" class="align">
            <Icon type="search" /> 用户查询列表
          </p>
          <RadioGroup v-model="userCode" @on-change="onUserVoChange">
            <div v-for="(item, index) in userVos" :key="'todo-item' + (userVos.length - index)" class="grade-list">
              <Row class="grade-item">
                <Col span="24" class="height-100">
                <Radio :label="item.userCode" name="options" :value="item.userCode">{{ item.userName }}</Radio>
                </Col>
              </Row>
            </div>
          </RadioGroup>
        </Card>
      </div>
      </Col>
      <Col span="17" :style="{marginLeft: '10px'}">
      <div class="query-result">
        <Card>
          <p slot="title" class="align">
            用户:
            <span>{{ userCode }}</span>
          </p>
          <div class="query-condition" :style="{marginBottom: '10px'}">
            <Form ref="userGradesFrom" :label-width="80" inline>
              <Card>
                <p slot="title" class="align">
                  <Icon type="navicon-round" /> 接口授权配置
                </p>
                <div slot="extra">
                  <Button type="primary" icon="checkmark-round" @click="handleUserAuthSave">保存配置</Button>
                </div>
                <div class="query-result">
                  <Row class="configVos-header">
                    <Col span="4" class="head"> 岗位代码
                    </Col>
                    <Col span="4" class="head"> 岗位名称
                    </Col>
                    <Col span="4" class="head"> 授权
                    </Col>
                    <Col span="4" class="head"> 生效日期
                    </Col>
                    <Col span="4" class="head"> 失效日期
                    </Col>
                    <Col span="4" class="head"> 创建人
                    </Col>
                  </Row>
                  <Row v-for="(gradeVo,index) in gradeVos" :key="gradeVo.id" class="configVos-body">
                    <Col span="4" class="item"> {{ gradeVo.gradeCode }}
                    <input type="hidden" :name="'gradeVo['+index+'].id'" :value="gradeVo.id">
                    <input type="hidden" :name="'gradeVo['+index+'].gradeCode'" :v-model="gradeVo.gradeCode" :value="gradeVo.gradeCode">
                    </Col>
                    <Col span="4" class="item">
                    <input type="hidden" :name="'gradeVo['+index+'].gradeCname'" :v-model="gradeVo.gradeCname" :value="gradeVo.gradeCname"> {{ gradeVo.gradeCname }}
                    </Col>

                    <Row v-for="(userGradeVo) in gradeVo.saaUserGrades" :key="userGradeVo.id" v-if="userGradeVo.userCode===userCode">
                      <Col span="4" class="item">
                      <input :name="'gradeVo['+index+'].saaUserGrades[0].id'" type="hidden" :value="userGradeVo.id">
                      <input :name="'gradeVo['+index+'].saaUserGrades[0].userCode'" type="hidden" :value="userCode">
                      <input :name="'gradeVo['+index+'].saaUserGrades[0].comCode'" type="hidden" :value="userGradeVo.comCode">
                      <input :name="'gradeVo['+index+'].saaUserGrades[0].grantWay'" :value="userGradeVo.grantWay" type="hidden">
                      <input :name="'gradeVo['+index+'].saaUserGrades[0].validFlag'" :value="userGradeVo.validFlag" type="hidden">
                      <Checkbox true-value="1" false-value="0" v-model="userGradeVo.validFlag" :value="userGradeVo.validFlag" />
                      </Col>
                      <Col span="4" class="item">
                      <DatePicker :name="'gradeVo['+index+'].saaUserGrades[0].validDate'" type="date" :value="userGradeVo.validDate" />
                      </Col>
                      <Col span="4" class="item">
                      <DatePicker :name="'gradeVo['+index+'].saaUserGrades[0].invalidDate'" type="date" :value="userGradeVo.invalidDate" />
                      </Col>
                      <Col span="4" class="item">
                      <input type="hidden" :name="'gradeVo['+index+'].saaUserGrades[0].createUser'" :value="userGradeVo.createUser"> {{ userGradeVo.createUser }}
                      </Col>
                    </Row>
                  </Row>
                </div>
              </Card>
            </Form>
          </div>
        </Card>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {
    initQuery_new,
    getUsers,
    getGrades,
    search,
    save,
    delete_api
  } from '@/api/saaUserPower.js'
  export default {
    data() {
      return {
        formValidate: {
          validFlag: '',
          userName: '',
          userCode: ''
        },
  
        ruleValidate: {
          userName: [{
            required: true,
            message: '请输入业务号',
            trigger: 'blur'
          }],
          validFlag: [{
            required: true,
            message: '请选择有效状态',
            trigger: 'blur'
          }],
          userCode: [{
            required: true,
            message: '请选择业务类型',
            trigger: 'change'
          }]
        },
        spinShow: false,
        gradeVos: [],
        userCode: 'admin',
        userVos: [],
        userVoGroup: 'admin',
        userGradesFrom: {}
      }
    },
    created() {
      this.initQuery()
    },
    methods: {
      // 保存配置
      handleUserAuthSave() {
        var that = this
        var formData = $(this.$refs['userGradesFrom'].$el).serialize()
        save(formData)
          .then(function(response) {
            if (response.status === 200) {
              that.$Notice.success({
                title: '保存成功!',
                duration: 4
              })
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
      onUserVoChange() {
        this.getGrades({
          userCode: this.userCode
        })
      },
      // 初始化查询
      initQuery() {
        var that = this
        this.spinShow = true
        initQuery_new()
          .then(function(response) {
            if (response.status === 200) {
              that.gradeVos = response.data.gradeVos
              that.userCode = response.data.userCode
              that.userVos = response.data.userVos
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
      getGrades(data) {
        var that = this
        this.spinShow = true
        getGrades(data)
          .then(function(response) {
            if (response.status === 200) {
              that.gradeVos = response.data.gradeVos
              that.userCode = response.data.userCode
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
      // 查询
      handleSearch(name) {
        var that = this
        this.spinShow = true
        getUsers({
            userCode: $('input[name="userCode"]').val(),
            userName: $('input[name="userName"]').val()
          })
          .then(function(response) {
            if (response.status === 200) {
              that.userVos = response.data.userVos
              that.getGrades({
                userCode: that.userCode
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


