<template>
  <div class="app">
    <el-config-provider>
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    const handleClick = () => {
      console.log("123123");
    };

    return { handleClick };
  },
});
</script>

<style>
.app {
  height: 100%;
}
</style>
