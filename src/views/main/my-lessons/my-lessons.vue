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
import { defineComponent, reactive, onMounted, toRaw } from "vue";
import { request } from "@/network/request";
import { useStore } from "vuex";
import localCache from "@/utils/cache";

export default defineComponent({
  setup() {
    const store = useStore();
    const lessons4pick = reactive({
      list: [],
      pickedList: [],
    });
    const getAllClass = () => {
      request(
        {
          url: "/students/allcourses/" + localCache.getCache("uid"),
          method: "get",
        },
        (res) => {
          lessons4pick.pickedList = res.data.data;
          console.log('123')
          console.log(lessons4pick.pickedList);
        },
        (err) => {
          console.log(err);
        }
      );
      request(
        {
          url: "/students/courses/" + localCache.getCache("uid"),
          method: "get",
        },
        (res) => {
          lessons4pick.list = res.data.data;
          console.log('123')
          console.log(lessons4pick.list);
          console.log(lessons4pick.list.length)
          if(lessons4pick.pickedList === null) {
            lessons4pick.list.length = 0;
          }
          lessons4pick.list = lessons4pick.list.filter((allLesson) => {
            for (const lesson of lessons4pick.pickedList) {
              console.log(lesson.cid);
              if (allLesson.cid === lesson.cid) {
                return true;
              }
            }
            return false;
          });
          console.log("hihihi", lessons4pick.list);
          console.log("end");
        },
        (err) => {
          console.log(err);
        }
      );
    };
    const hi = () => {
      let data = toRaw(store.getters[`login/getUserInfo`]);
      console.log(data);
    };
    onMounted(getAllClass);

    return {
      lessons4pick,
      hi,
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
