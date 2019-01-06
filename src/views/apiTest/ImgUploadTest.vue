<style lang="less">
</style>

<template>
  <div class="content-body">
    <Row>
      <Col span="24" :style="{marginLeft: '10px'}">
      <div class="query-condition">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="150">
          <Card>
            <p slot="title" class="align">
              <Icon type="navicon-round" /> 影像采集
            </p>
            <div slot="extra">
              <Button type="primary" icon="search" @click="setData('ZXPT','upload')">征信平台</Button>
              <Button type="success" icon="search" @click="setData('ZJ','upload')">资金系统</Button>
              <Button type="info" icon="search" @click="setData('YSF','upload')">清分清算系统</Button>
            </div>
            <input type="hidden" id="viewType" name="initParamVo.viewType" value="upload">
            <input type="hidden" name="initParamVo.comCode" value="000000">
            <input type="hidden" name="initParamVo.imgBussVos[0].bussDate" value="201801">
            <FormItem label="业务类型" prop="bussNo">
              <Tooltip content="请选择业务类型" placement="right">
                <Select v-model="formValidate.bussType" id="bussType" name="initParamVo.imgBussVos[0].bussType" value="ZXPT" placeholder="请选择业务类型" style="width:200px">
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
              </Tooltip>
            </FormItem>
            <FormItem label="业务号" prop="bussNo">
              <Tooltip content="输入业务类型对应的完整业务号" placement="right">
                <Input v-model="formValidate.bussNo" name="initParamVo.imgBussVos[0].bussNo" clearable placeholder="请输入业务号" style="width:300px"></Input>
              </Tooltip>
            </FormItem>
            <FormItem label="是否删除影像" prop="validFlag">
              <Tooltip content="是否显示已删除的影像文件" placement="right">
                <Select v-model="formValidate.validFlag" name="initParamVo.showDelete" placeholder="请选择有效状态" style="width:200px">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </Tooltip>
            </FormItem>
            <FormItem label="角色代码" prop="optRole">
              <Tooltip content="业务类型对应的操作角色" placement="right">
                <Input v-model="formValidate.optRole" name="initParamVo.optRole" clearable placeholder="请输入角色代码" style="width:300px"></Input>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Button type="primary" icon="android-expand" @click="imgScan('upload')">影像扫描</Button>
              <Button type="primary" icon="eye" @click="imgScan('view')">影像查看</Button>
              <Button type="ghost" icon="reply" @click="handleReset('formValidate')">重置条件</Button>
            </FormItem>
          </Card>
        </Form>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import { imgScan } from '@/api/apiTest.js'
export default {
  data() {
    return {
      formValidate: {
        validFlag: '1',
        bussNo: '',
        bussType: '',
        optRole: ''
      },

      ruleValidate: {
        bussNo: [{ required: true, message: '请输入业务号', trigger: 'blur' }],
        validFlag: [
          { required: true, message: '请选择有效状态', trigger: 'change' }
        ],
        bussType: [
          { required: true, message: '请选择业务类型', trigger: 'change' }
        ],
        optRole: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ]
      },
      loading: false,
      showAddNewTodo: false,
      token: '',
      viewType: 'upload',
      classificationSelected: [] // 在所有分类目录中选中的目录数组
    }
  },
  methods: {
    // 影像扫描,影像查看
    imgScan(viewType) {
      this.viewType = viewType
      var formData = $(this.$refs['formValidate'].$el).serialize()
      imgScan(formData).then(response => {
        this.token = response.data.data
        if (this.isIE()) {
          window.open(
            'http://localhost:8080/h5img/app/flash.img?token=' + this.token
          )
        } else if (this.viewType === 'upload') {
          window.open(
            'http://localhost:8080/h5img/app/upload.img?token=' + this.token
          )
        } else {
          window.open(
            'http://localhost:8080/h5img/app/view.img?token=' + this.token
          )
        }
      })
    },
    setData(type, view) {
      this.viewType = view
      if (type === 'ZXPT') {
        this.formValidate = Object.assign(
          {},
          {
            bussNo: 'ZX201701030005',
            optRole: 'optRole',
            validFlag: '1',
            bussType: type
          }
        )
      } else if (type === 'ZJ') {
        this.formValidate = Object.assign(
          {},
          {
            bussNo: 'ZJ201701030005',
            optRole: 'ZJRole01',
            validFlag: '1',
            bussType: type
          }
        )
      } else if (type === 'YSF') {
        this.formValidate = Object.assign(
          {},
          {
            bussNo: 'QS201701030006',
            optRole: 'YSFXRole01',
            validFlag: '1',
            bussType: type
          }
        )
      }
    },
    isIE() {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return true
      } else {
        return false
      }
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>


