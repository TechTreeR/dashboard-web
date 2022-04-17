<template>
  <div class="pick-lessons" @click="hi">
    <el-table :data="lessons4pick.list" stripe style="width: 100%" height="600">
      <el-table-column prop="cid" label="ID" width="120" />
      <el-table-column prop="cname" label="Class Name" width="220" />
      <el-table-column prop="tname" label="Teacher" width="160" />
      <el-table-column prop="place" label="Location" width="160" />
      <el-table-column prop="major" label="Major" width="220" />
      <el-table-column prop="capacity" label="Capacity" width="120" />
      <el-table-column label="Operation" width="120" align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="success"
            @click="handleDelete(scope.$index, scope.row)"
            >Register</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { request } from "@/network/request";
export default defineComponent({
  setup() {
    const tableData = [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ];
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
          lessons4pick.list = res.data.data.slice(0, 40);
          console.log(lessons4pick.list);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    onMounted(getAllClass);
    const handleDelete = (index, row) => {
      console.log(index, row);
      lessons4pick.list.splice(index, index + 1);
    };
    return {
      tableData,
      lessons4pick,
      handleDelete,
    };
  },
  onMounted() {},
});
</script>
