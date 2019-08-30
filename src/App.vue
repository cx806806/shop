<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
a {
  text-decoration:none;
}
#app .el-breadcrumb {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #C5C5C5;
    margin-bottom: 10px;
}
</style>
