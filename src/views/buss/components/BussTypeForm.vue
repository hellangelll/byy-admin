<style lang="less">
  
</style>

<template>
  <Form label-position="left" :label-width="150" ref="moduleVo" :model="moduleVo" :rules="ruleValidate">
    <input type="hidden" name="limitSumSize" value="1024">
    <input type="hidden" name="readBarCode" value="0">
    <input type="hidden" name="readHash" value="0">
    <FormItem label="模块代码" prop="moduleCode">
      <Tooltip content="业务类型代码" placement="right-start">
        <Input v-model="moduleVo.moduleCode" name="moduleCode" :value="moduleVo.moduleCode" clearable placeholder="请输入模块代码" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="模块名称" prop="moduleName">
      <Tooltip content="业务类型名称" placement="right">
        <Input v-model="moduleVo.moduleName" name="moduleName" :value="moduleVo.moduleName" clearable placeholder="请输入模块名称" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="模块说明" prop="moduleDesc">
      <Input v-model="moduleVo.moduleDesc" name="moduleDesc" :value="moduleVo.moduleDesc" clearable placeholder="请输入模块说明" style="width:300px"></Input>
    </FormItem>
    <FormItem label="Bucket" prop="bucket">
      <Tooltip content="该模块影像文件存储到阿里云的哪个Bucket" placement="right">
        <Input v-model="moduleVo.bucket" name="bucket" :value="moduleVo.bucket" clearable placeholder="请输入Buchet" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="未上传影像数量限制" prop="limitOnceCount">
      <Tooltip content="上传界面中允许的最多未上传文件数量，一般设置在100" placement="right">
        <Input v-model="moduleVo.limitOnceCount" name="limitOnceCount" :value="moduleVo.limitOnceCount" clearable placeholder="请输入未上传影像数量限制" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="累计可上传影像数量" prop="limitSumCount">
      <Tooltip content="该业务模块用于上传的最大影像数量，例如1000(设置范围：1-999999)~200之间" placement="right">
        <Input v-model="moduleVo.limitSumCount" name="limitSumCount" :value="moduleVo.limitSumCount" clearable placeholder="请输入累计可上传影像数量" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="图像最大长/宽" prop="picMaxSize">
      <Tooltip content="单位像素(px),该模块下面允许的最大图像长度或宽度，建议设置在3000px以内" placement="right">
        <Input v-model="moduleVo.picMaxSize" name="picMaxSize" :value="moduleVo.picMaxSize" clearable placeholder="请输入图像最大长/宽" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="图片质量压缩比" prop="picQuality">
      <Tooltip content="图像压缩质量，10~100之间，数字越大图像约清晰，文件也会越大" placement="right">
        <Input v-model="moduleVo.picQuality" name="picQuality" :value="moduleVo.picQuality" clearable placeholder="请输入图片质量压缩比" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="文档文件最大大小" prop="docMaxSize">
      <Tooltip content="单位MB,文档类文件最大大小，建议100MB以内" placement="right">
        <Input v-model="moduleVo.docMaxSize" name="docMaxSize" :value="moduleVo.docMaxSize" clearable placeholder="请输入文档文件最大大小" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="音频视频文件最大大小" prop="medMaxSize">
      <Tooltip content="单位MB,音频视频类文件最大大小，建议100MB以内" placement="right">
        <Input v-model="moduleVo.medMaxSize" name="medMaxSize" :value="moduleVo.medMaxSize" clearable placeholder="请输入音频视频文件最大大小" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="是否到达通知" prop="arriveNotify">
      <Select v-model="moduleVo.arriveNotify" name="arriveNotify" true-value="1" false-value="0" :value="moduleVo.arriveNotify" clearable filterable placeholder="请选择有效状态" style="width:300px">
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
    </FormItem>
    <FormItem label="是否有效" prop="validFlag">
      <Select v-model="moduleVo.validFlag" name="validFlag" :value="moduleVo.validFlag" clearable filterable placeholder="请选择有效状态" style="width:300px">
        <Option value="">请选择</Option>
        <Option value="1">有效</Option>
        <Option value="0">无效</Option>
      </Select>
    </FormItem>
    <FormItem label="备注说明" prop="remark">
      <Textarea v-model="moduleVo.remark" name="remark" :value="moduleVo.remark" clearable placeholder="请输入音频视频文件最大大小" style="width:300px" />
    </FormItem>
    <FormItem>
      <Button type="primary" v-if="saveType==='modify'" icon="loop" @click="handleSubmit('moduleVo')">修改</Button>
      <Button type="primary" v-else icon="plus-round" @click="handleSubmit('moduleVo')">新增</Button>
      <Button type="ghost" icon="reply" @click="handleReset()">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
  import {
    saveOrUpdateBussModule_new
  } from '@/api/buss.js'
  
  export default {
    name: 'BussTypeForm',
    props: {
      moduleVo: {
        type: Object
      },
      saveType: String
    },
    computed: {},
    watch: {
      pmoduleVo: function(newValue, oldValue) {
        if (newValue) {
          return newValue
        }
      },
      deep: true
    },
    data() {
      return {
        // moduleVo:{
        //     moduleCode: '',
        //         moduleName: '',
        //         moduleDesc:'',
        //         bucket: '',
        //         limitOnceCount: '',
        //         limitSumCount: '',
        //         picMaxSize:'',
        //         picQuality: '',
        //         docMaxSize:'',
        //         medMaxSize:'',
        //         arriveNotify:'',
        //         ValidFlag:'',
        //         remark:''
        // },
        ruleValidate: {
          moduleCode: [{
            required: true,
            message: '请输入模块代码',
            trigger: 'blur'
          }],
          moduleName: [{
            required: true,
            message: '请输入模块名称',
            trigger: 'blur'
          }],
          bucket: [{
            required: true,
            message: '请输入bucket',
            trigger: 'blur'
          }],
          limitOnceCount: [{
            required: true,
            message: '请输入未上传影像数量限制',
            trigger: 'blur'
          }],
          limitSumCount: [{
            required: true,
            message: '请输入累计可上传影像数量',
            trigger: 'blur'
          }],
          picMaxSize: [{
            required: true,
            message: '请输入图像最大长/宽',
            trigger: 'blur'
          }],
          picQuality: [{
            required: true,
            message: '请输入图片质量压缩比',
            trigger: 'blur'
          }],
          docMaxSize: [{
            required: true,
            message: '请输入文档文件最大大小',
            trigger: 'blur'
          }],
          medMaxSize: [{
            required: true,
            message: '请输入音频视频文件最大大小',
            trigger: 'blur'
          }],
          arriveNotify: [{
            required: true,
            message: '请选择是否到达通知',
            trigger: 'change'
          }],
          ValidFlag: [{
            required: true,
            message: '请选择是否有效',
            trigger: 'change'
          }],
          remark: [{
            required: false
          }]
        }
      }
    },
    methods: {
      handleReset() {
        this.$refs['moduleVo'].resetFields()
      },
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            var that = this
            var formData = $(this.$refs['moduleVo'].$el).serialize()
            saveOrUpdateBussModule_new(formData)
              .then(function(response) {
                if (response.status === 200) {
                  if (response.data !== null) {
                    that.moduleVo = response.data.bussModuleVo
                    that.saveType = response.data.saveType
                    that.$Notice.success({
                      title: '添加成功!',
                      duration: 2
                    })
                  } else {
                    that.$Notice.error({
                      title: '服务器异常,请稍候重试!',
                      duration: 3
                    })
                  }
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
          }
        })
      }
    }
  }
</script>

<style>
  
</style>