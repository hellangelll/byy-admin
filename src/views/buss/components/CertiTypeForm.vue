<style lang="less">
  
</style>

<template>
  <Form label-position="left" :label-width="150" ref="typeTreeVo" :model="typeTreeVo" :rules="ruleValidate">
    <input type="hidden" v-model="typeTreeVo.id" id="addNodeId" name="id">
    <input type="hidden" v-model="typeTreeVo.parenTypeCode" name="parenTypeCode">
    <input type="hidden" v-model="typeTreeVo.typeLevel" name="typeLevel">
    <input type="hidden" name="limitSumSize" value="1024">
    <input type="hidden" name="readBarCode" value="0">
    <input type="hidden" name="readHash" value="0">
    <FormItem label="模块代码" prop="moduleCode">
      <Input v-model="typeTreeVo.moduleCode" name="moduleCode" :value="typeTreeVo.moduleCode" readonly="readonly" style="width:300px"></Input>
    </FormItem>
    <FormItem label="险种代码" prop="riskCode">
      <Input v-model="typeTreeVo.riskCode" name="riskCode" :value="typeTreeVo.riskCode" readonly="readonly" style="width:300px"></Input>
    </FormItem>
    <FormItem label="单证代码" prop="typeCode">
      <Tooltip content="单证类型代码" placement="right">
        <Input v-model="typeTreeVo.typeCode" name="typeCode" :value="typeTreeVo.typeCode" clearable placeholder="请输入单证代码" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="单证名称" prop="typeName">
      <Tooltip content="单证类型代码" placement="right">
        <Input v-model="typeTreeVo.typeName" name="typeName" :value="typeTreeVo.typeName" clearable placeholder="请输入单证名称" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="累计可上传影像数量" prop="limitSumCount">
      <Tooltip content="该业务模块用于上传的最大影像数量，例如1000(设置范围：1-999999)~200之间" placement="right">
        <Input v-model="typeTreeVo.limitSumCount" name="limitSumCount" :value="typeTreeVo.limitSumCount" clearable placeholder="请输入累计可上传影像数量" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="图像最大长/宽" prop="picMaxSize">
      <Tooltip content="单位像素(px),该模块下面允许的最大图像长度或宽度，建议设置在3000px以内" placement="right">
        <Input v-model="typeTreeVo.picMaxSize" name="picMaxSize" :value="typeTreeVo.picMaxSize" clearable placeholder="请输入图像最大长/宽" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="图片质量压缩比" prop="picQuality">
      <Tooltip content="图像压缩质量，10~100之间，数字越大图像约清晰，文件也会越大" placement="right">
        <Input v-model="typeTreeVo.picQuality" name="picQuality" :value="typeTreeVo.picQuality" clearable placeholder="请输入图片质量压缩比" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="文档文件最大大小" prop="docMaxSize">
      <Tooltip content="单位MB,文档类文件最大大小，建议100MB以内" placement="right">
        <Input v-model="typeTreeVo.docMaxSize" name="docMaxSize" :value="typeTreeVo.docMaxSize" clearable placeholder="请输入文档文件最大大小" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="音频视频文件最大大小" prop="medMaxSize">
      <Tooltip content="单位MB,音频视频类文件最大大小，建议100MB以内" placement="right">
        <Input v-model="typeTreeVo.medMaxSize" name="medMaxSize" :value="typeTreeVo.medMaxSize" clearable placeholder="请输入音频视频文件最大大小" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="是否有效" prop="validFlag">
      <Select v-model="typeTreeVo.validFlag" name="validFlag" :value="typeTreeVo.validFlag" clearable filterable placeholder="请选择有效状态" style="width:300px">
        <Option value="">请选择</Option>
        <Option value="1">有效</Option>
        <Option value="0">无效</Option>
      </Select>
    </FormItem>
    <FormItem label="备注说明" prop="remark">
      <Textarea v-model="typeTreeVo.remark" name="remark" :value="typeTreeVo.remark" clearable placeholder="请输入音频视频文件最大大小" style="width:300px" />
    </FormItem>
    <FormItem>
      <Button type="primary" v-if="saveType==='modify'" icon="loop" @click="handleSubmit('typeTreeVo')">修改</Button>
      <Button type="primary" v-else icon="plus-round" @click="handleSubmit('typeTreeVo')">新增</Button>
      <Button type="ghost" icon="reply" @click="handleReset()">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
  import {
    saveOrUpdateBussTypeTree_new
  } from '@/api/buss.js'
  
  export default {
    props: {
      typeTreeVo: {
        type: Object,
        default: function() {
          return {
            id: '',
            parenTypeCode: '',
            typeLevel: '',
            moduleCode: '',
            riskCode: '',
            typeCode: '',
            typeName: '',
            limitSumCount: '',
            picMaxSize: '',
            picQuality: '',
            docMaxSize: '',
            medMaxSize: '',
            validFlag: '',
            remark: ''
          }
        }
      },
      saveType: String
    },
    data() {
      return {
        typeTreeVoCopy: this.typeTreeVo,
        ruleValidate: {
          typeCode: [{
            required: true,
            message: '请输入单证代码',
            trigger: 'blur'
          }],
          typeName: [{
            required: true,
            message: '请输入单证名称',
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
          validFlag: [{
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
        this.$refs['typeTreeVo'].resetFields()
      },
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            var that = this
            var formData = $(this.$refs['typeTreeVo'].$el).serialize()
            saveOrUpdateBussTypeTree_new(formData)
              .then(function(response) {
                if (response.status === 200) {
                  that.typeTreeVo = response.data.typeTreeVo
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