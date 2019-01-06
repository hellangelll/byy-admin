<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in" /> 欢迎登录
        </p>
        <p class="error-msg" v-show="errorMsg">{{ errorMsg }}</p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="username">
              <Input v-model="form.username" name="username" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person" />
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" name="password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked" />
              </span>
              </Input>
            </FormItem>
            <FormItem prop="rememberId">
              <Checkbox name="rememberId" v-model="form.rememberId" true-value="1" false-value="0">记住用户名</Checkbox>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>

        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login.js'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      errorMsg: '',
      form: {
        username: '',
        password: '',
        rememberId: '1'
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          /* login({
                        username:this.form.username,
                        password:this.form.password,
                        rememberId:this.form.rememberId
                    })
                    then(function(){

                    }) */
          Cookies.set('user', this.form.userName)
          Cookies.set('password', this.form.password)
          this.$store.commit(
            'setAvator',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
          )
          if (this.form.userName === 'admin') {
            Cookies.set('access', 0)
          } else {
            Cookies.set('access', 1)
          }
          this.$router.push({
            name: 'home_index'
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
