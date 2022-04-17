<template>
  <div class="my-lessons" @click="hi">
    <h3 class="my-class">我的已选课程</h3>
    <div class="lesson-progress">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="70" />
    </div>
    <el-table :data="lessons4pick.list" stripe style="width: 100%" height="600">
      <el-table-column prop="cid" label="ID" width="120" />
      <el-table-column prop="cname" label="Class Name" width="220" />
      <el-table-column prop="tname" label="Teacher" width="160" />
      <el-table-column prop="place" label="Location" width="160" />
      <el-table-column prop="major" label="Major" width="220" />
      <el-table-column prop="capacity" label="Capacity" width="120" />
    </el-table>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { request } from "@/network/request";
export default defineComponent({
  setup() {
    const lessons4pick = reactive({
      list: [],
    });
    const getAllClass = () => {
      request(
        {
          url: "/courses/getAll",
          method: "get",
        },
        (res) => {
          lessons4pick.list = res.data.data.slice(6, 15);
          console.log(lessons4pick.list);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    onMounted(getAllClass);

    return {
      lessons4pick,
    };
  },
  onMounted() {},
});
</script>
<style scoped lang="less">
.lesson-progress {
  margin-top: -10px;
  margin-left: 240px;
  margin-bottom: 40px;
  width: 550px;
}
.my-class {
  margin-left: 60px;
  margin-top: -10px;
}
</style>
