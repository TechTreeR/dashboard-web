<template>
  <div class="my-lessons" @click="hi">
    <h3 class="my-class">My Selected Courses</h3>
    <div class="lesson-progress">
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="lessons4pick.num1[0]"
      />
    </div>
    <el-table :data="lessons4pick.list" stripe style="width: 100%" height="600">
      <el-table-column prop="cid" label="ID" width="120" />
      <el-table-column prop="cname" label="Class Name" width="220" />
      <el-table-column prop="tname" label="Teacher" width="100" />
      <el-table-column prop="place" label="Location" width="100" />
      <el-table-column prop="major" label="Major" width="120" />
      <el-table-column prop="capacity" label="Capacity" width="120" />
      <el-table-column label="Operation" width="120" align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="success"
            @click="handleUnsubscribe(scope.$index, scope.row)"
            >Unsubscribe</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRaw, ref } from "vue";
import { request } from "@/network/request";
import { useStore } from "vuex";
import localCache from "@/utils/cache";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    const store = useStore();
    const lessons4pick = reactive({
      list: [],
      pickedList: [],
      num1: [],
    });
    const getAllClass = () => {
      lessons4pick.num1[0] = 0;
      request(
        {
          url: "/students/allcourses/" + localCache.getCache("uid"),
          method: "get",
        },
        (res) => {
          lessons4pick.pickedList = res.data.data;
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
          console.log("123");
          console.log(lessons4pick.list);
          console.log(lessons4pick.list.length);
          if (lessons4pick.pickedList === null) {
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
          lessons4pick.num1[0] = (lessons4pick.list.length / 4) * 100;
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
    const handleUnsubscribe = (index, row) => {
      request(
        {
          url: "/students/withdraw",
          method: "put",
          data: {
            cid: row.cid,
            sid: localCache.getCache("uid"),
          },
        },
        (res) => {
          ElMessage({
            message: "Congrats, you have unsubscribed the lesson.",
            type: "success",
          });
          lessons4pick.num1[0] -= 25;
          localCache.setCache("cnum", localCache.getCache("cnum") - 1);
          const result = res.data;
          console.log(result);
          if (result.code === 200) {
            lessons4pick.list = lessons4pick.list.filter((allLesson) => {
              if (row.cid === allLesson.cid) {
                return false;
              }
              return true;
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    };

    return {
      //num,
      lessons4pick,
      hi,
      handleUnsubscribe,
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
