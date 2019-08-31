<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
    <el-button @click="searchuser" slot="append" icon="el-icon-search"></el-button>
  </el-input>
    <el-button class="adduser" type="success" plain @click="dialogVisible = true">添加用户</el-button>
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
            @change="rem(obj.row)"
            v-model="obj.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template v-slot:default="obj">
          <el-button @click="show(obj.row)" plain size="small" type="primary" icon="el-icon-edit"></el-button>
          <el-button @click="open(obj.row)" plain size="small" type="danger" icon="el-icon-delete"></el-button>
          <el-button plain size="small" type="success" icon="el-icon-check">分配角色</el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
      @close='off("form")'
      title="添加用户"
      :visible.sync="dialogVisible"
      width="40%">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop='username'>
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop='password'>
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop='email'>
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop='mobile'>
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
        </span>
  </el-dialog>

  <el-dialog
    title="提示"
    :visible.sync="dialogVisible1"
    width="40%">
        <el-form ref="form1" :model="form1" :rules="rules" label-width="80px">
          <el-form-item label="用户名">
            <el-tag type="info">{{ form1.username }}</el-tag>
          </el-form-item>
          <el-form-item label="邮箱" prop='email'>
            <el-input v-model="form1.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop='mobile'>
            <el-input v-model="form1.mobile"></el-input>
          </el-form-item>
        </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="revuser('form1')">确 定</el-button>
    </span>
  </el-dialog>
  </div>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      dialogVisible: false,
      dialogVisible1: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      form1: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: ['blur', 'change'] }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.rander()
  },
  methods: {
    async rander () {
      const { data, meta } = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        this.list = data.users
        this.total = data.total
      } else {
        this.$message.error(meta.msg)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.rander()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.rander()
      console.log(`当前页: ${val}`)
    },
    searchuser () {
      this.rander()
    },
    async rem (info) {
      const { meta } = await this.$axios.put(`users/${info.id}/state/${info.mg_state}`)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
      } else {
        this.$message.error(meta.msg)
      }
    },
    async onSubmit (form) {
      console.log(this.total)
      try {
        await this.$refs[form].validate()
        const { meta } = await this.$axios.post('users', this.form)
        if (meta.status === 201) {
          this.$message.success(meta.msg)
          this.total++
          this.pagenum = Math.ceil(this.total / this.pagesize)
          this.rander()
          this.dialogVisible = false
        } else {
          this.$message.error(meta.msg)
        }
      } catch (error) {
        console.log(error)
      }
    },
    off (form) {
      this.$refs[form].resetFields()
    },
    async open (row) {
      console.log(this.list)
      try {
        await this.$confirm('亲，你确定要删除吗？？?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log(row)
        const { meta } = await this.$axios.delete(`users/${row.id}`)
        if (meta.status === 200) {
          if (this.list.length === 1) {
            this.pagenum = this.pagenum - 1
          }
          this.rander()
          this.$message({
            type: 'success',
            message: meta.msg
          })
        } else {
          this.$message.error(meta.msg)
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    show (row) {
      this.dialogVisible1 = true
      const { username, email, mobile, id } = row
      this.form1 = {
        id,
        username,
        email,
        mobile
      }
    },
    async revuser (form1) {
      try {
        await this.$refs[form1].validate()
        const { meta } = await this.$axios.put(`users/${this.form1.id}`, {
          email: this.form1.email,
          mobile: this.form1.mobile
        })
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.dialogVisible1 = false
        } else {
          this.$message.error(meta.msg)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-with-select {
    margin-bottom: 10px;
    width: 300px;
  }
  .adduser{
    margin-left: 20px;
  }
</style>
