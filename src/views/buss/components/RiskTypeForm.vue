<style lang="less">
  
</style>

<template>
  <Form label-position="left" :label-width="150" ref="riskVo" :model="riskVo" :rules="ruleValidate">
    <input type="hidden" ref="addNodeId" id="addNodeId" name="id" :value="riskVo.id">
    <input type="hidden" name="limitSumSize" value="1024">
    <input type="hidden" name="readBarCode" value="0">
    <input type="hidden" name="readHash" value="0">
    <FormItem label="模块代码" prop="moduleCode">
      <Input v-model="riskVo.moduleCode" name="moduleCode" :value="riskVo.moduleCode" readonly="readonly" style="width:300px"></Input>
    </FormItem>
    <FormItem label="险种代码" prop="riskCode">
      <Tooltip content="险种类型代码" placement="right">
        <Input v-model="riskVo.riskCode" name="riskCode" :value="riskVo.riskCode" clearable placeholder="请输入险种代码" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="险种名称" prop="riskName">
      <Tooltip content="险种类型名称" placement="right">
        <Input v-model="riskVo.riskName" name="riskName" :value="riskVo.riskName" clearable placeholder="请输入险种名称" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="未上传影像数量限制" prop="limitOnceCount">
      <Tooltip content="上传界面中允许的最多未上传文件数量，一般设置在100" placement="right">
        <Input v-model="riskVo.limitOnceCount" name="limitOnceCount" :value="riskVo.limitOnceCount" clearable placeholder="请输入未上传影像数量限制" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="累计可上传影像数量" prop="limitSumCount">
      <Tooltip content="该业务模块用于上传的最大影像数量，例如1000(设置范围：1-999999)~200之间" placement="right">
        <Input v-model="riskVo.limitSumCount" name="limitSumCount" :value="riskVo.limitSumCount" clearable placeholder="请输入累计可上传影像数量" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="图像最大长/宽" prop="picMaxSize">
      <Tooltip content="单位像素(px),该模块下面允许的最大图像长度或宽度，建议设置在3000px以内" placement="right">
        <Input v-model="riskVo.picMaxSize" name="picMaxSize" :value="riskVo.picMaxSize" clearable placeholder="请输入图像最大长/宽" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="图片质量压缩比" prop="picQuality">
      <Tooltip content="图像压缩质量，10~100之间，数字越大图像约清晰，文件也会越大" placement="right">
        <Input v-model="riskVo.picQuality" name="picQuality" :value="riskVo.picQuality" clearable placeholder="请输入图片质量压缩比" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="文档文件最大大小" prop="docMaxSize">
      <Tooltip content="单位MB,文档类文件最大大小，建议100MB以内" placement="right">
        <Input v-model="riskVo.docMaxSize" name="docMaxSize" :value="riskVo.docMaxSize" clearable placeholder="请输入文档文件最大大小" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="音频视频文件最大大小" prop="medMaxSize">
      <Tooltip content="单位MB,音频视频类文件最大大小，建议100MB以内" placement="right">
        <Input v-model="riskVo.medMaxSize" name="medMaxSize" :value="riskVo.medMaxSize" clearable placeholder="请输入音频视频文件最大大小" style="width:300px"></Input>
      </Tooltip>
    </FormItem>
    <FormItem label="是否有效" prop="validFlag">
      <Select v-model="riskVo.validFlag" name="validFlag" :value="riskVo.validFlag" clearable filterable placeholder="请选择有效状态" style="width:300px">
        <Option value="">请选择</Option>
        <Option value="1">有效</Option>
        <Option value="0">无效</Option>
      </Select>
    </FormItem>
    </FormItem>
    <FormItem label="备注说明" prop="remark">
      <Textarea v-model="riskVo.remark" name="remark" :value="riskVo.remark" clearable placeholder="请输入音频视频文件最大大小" style="width:300px" />
    </FormItem>
    <FormItem>
      <Button type="primary" v-if="saveType==='modify'" icon="loop" @click="handleSubmit('riskVo')">修改</Button>
      <Button type="primary" v-else icon="plus-round" @click="handleSubmit('riskVo')">新增</Button>
      <Button type="ghost" icon="reply" @click="handleReset()">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
  import {
    saveOrUpdateBussRisk_new
  } from '@/api/buss.js'
  
  export default {
    props: {
      riskVo: {
        type: Object,
        default: function() {
          return {
            moduleCode: '',
            riskCode: '',
            riskName: '',
            limitOnceCount: '',
            limitSumCount: '',
            picMaxSize: '',
            picQuality: '',
            docMaxSize: '',
            medMaxSize: '',
            ValidFlag: 1,
            remark: ''
          }
        }
      },
      saveType: String
    },
    data() {
      return {
        ruleValidate: {
          riskCode: [{
            required: true,
            message: '请输入险种代码',
            trigger: 'blur'
          }],
          riskName: [{
            required: true,
            message: '请输入险种名称',
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
        this.$refs['riskVo'].resetFields()
      },
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            var that = this
            var formData = $(this.$refs['riskVo'].$el).serialize()
            saveOrUpdateBussRisk_new(formData)
              .then(function(response) {
                if (response.status === 200) {
                  if (response.data !== null) {
                    that.riskVo = response.data.riskVo
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
