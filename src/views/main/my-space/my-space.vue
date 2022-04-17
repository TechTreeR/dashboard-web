<template>
  <div class="my-class">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="Student name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Sex" prop="sex">
        <el-input v-model="ruleForm.sex" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="Major" prop="major">
        <el-input v-model="ruleForm.major" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "Hello",
  sex: "male",
  email: "ab@test.com",
  major: "CS",
});
</script>
