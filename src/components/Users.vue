<template>
  <div class="users">
    <template>
      <el-table
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
        <el-table-column
          label="用户状态">
          <template v-slot:default="obj">
          <el-switch
            v-model="obj.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <el-button plain size="small" type="primary" icon="el-icon-edit"></el-button>
          <el-button plain size="small" type="danger" icon="el-icon-delete"></el-button>
          <el-button plain size="small" type="success" icon="el-icon-check">分配角色</el-button>
        </el-table-column>
      </el-table>
    </template>

  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: [],
      query: '',
      pagenum: 1,
      pagesize: 4
    }
  },
  created () {
    this.rander()
  },
  methods: {
    rander () {
      axios({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        this.list = res.data.data.users
        console.log(this.list)
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>
