/* eslint-disable semi */
<template>
  <div class="login">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
      <img class="erha" src="../assets/erha.jpg" alt>
      <el-form-item label="用户名" prop="username">
        <el-input  @keyup.native.enter="submitForm('form')" v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input  @keyup.native.enter="submitForm('form')" type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('form')" type="primary">登录</el-button>
        <el-button @click="resetForm('form')" class="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    submitForm (form) {
      console.log('1111')
      this.$refs[form].validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.form
          }).then(res => {
            console.log(res)
            const { meta, data } = res.data
            if (meta.status === 200) {
              localStorage.setItem('token', data.token)
              this.$message({
                message: meta.msg,
                type: 'success'
              })
              this.$router.push('/index')
            } else {
              console.log(meta.msg)
              this.$message.error(meta.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style lang='scss'>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    width: 440px;
    padding: 20px;
    padding-top: 75px;
    background-color: #fff;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 200px;
    position: relative;
    .reset {
      margin-left: 70px;
    }
    .erha {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translate(-50%);
      border: 5px solid #fff;
      border-radius: 50%;
    }
  }
}
</style>
