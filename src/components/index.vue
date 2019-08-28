<template>
  <el-container class="index">
  <el-header>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="center">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="out">
      欢迎光临~<a href="javascript:void(0);" @click="open"> 退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-col :span="24">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/users">用户列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/roles">角色列表</el-menu-item>
          <el-menu-item index="/rights">权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    open () {
      this.$confirm('亲，你确定要退出系统吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出已取消'
        })
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
  .index {
    height: 100%;
    .el-header {
      background-color: #d8d8d8;
      display: flex;
      .logo {
        width: 180px;
        padding: 10px;
        img {
          height: 35.52px;
        }
      }
      .center {
          flex-grow: 1;
          h1 {
          text-align: center;
          line-height: 60px;
          }
      }
      .out {
        width: 180px;
        font-weight: 700;
        text-align: right;
        a {
          line-height: 60px;
          color: orange;
        }
      }
    }
    .el-aside {
      background-color: #545c64;
       .el-menu-item-group .el-menu-item-group__title {
        padding: 0;
      }
    }
    .el-main {
      background-color: #ecf0f1;
    }
  }
</style>
