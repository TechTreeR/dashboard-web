<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="cname" label="Class Name" width="120" />
    <el-table-column prop="sname" label="Student Name" width="120" />
    <el-table-column prop="address" label="Content" />
    <el-table-column prop="date" label="Date" width="180" />
  </el-table>
</template>

<script setup>
const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex % 2 === 1) {
    return "";
  } else if (rowIndex % 2 === 0) {
    return "success-row";
  }
  return "";
};

const tableData = [
  {
    date: "2016-05-03",
    sname: "Tom",
    cname: "Maths",
    address: "Very impressive lessons, I really like the teacher.",
  },
  {
    date: "2016-05-02",
    sname: "Tom",
    cname: "Maths",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    sname: "Tom",
    cname: "Maths",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    sname: "Tom",
    cname: "Maths",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    sname: "Tom",
    cname: "Maths",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>