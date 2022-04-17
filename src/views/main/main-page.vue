<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><nav-left /> </el-aside>
      <el-container>
        <el-header
          ><div class="header"><h3>教务管理系统</h3></div></el-header
        >
        <el-main class="page-content"
          ><div class="page-info">
            <router-view></router-view></div
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavLeft from "./nav/nav-left.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { NavLeft },
});
</script>

<style scoped lang="less">
.header {
  margin-left: 50px;
  margin-top: 30px;
}
</style>
