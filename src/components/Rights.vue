<template>
  <div class="rights">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
      type="index"
      width="%10">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="%30">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="%30">
      </el-table-column>
      <el-table-column
        label="层级"
        width="%30">
        <template v-slot:default="{ row }">
        <div v-if='row.level === "0"'>一级</div>
        <div v-if='row.level === "1"'>二级</div>
        <div v-if='row.level === "2"'>三级</div>
        </template>
      </el-table-column>
    </el-table>
  </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.rander()
  },
  methods: {
    async rander () {
      const { data, meta } = await this.$axios.get('rights/list')
      if (meta.status === 200) {
        this.list = data
        this.$message.success(meta.msg)
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style>

</style>
