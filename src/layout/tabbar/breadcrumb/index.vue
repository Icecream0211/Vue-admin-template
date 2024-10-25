<template>

    <el-icon style="margin-right: 20px;" @click="changeIcon">
        <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

</template>
<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";

const settingStore = useLayoutSettingStore();
const changeIcon = () => {
    settingStore.fold = !settingStore.fold
};

</script>
<style scoped lang="scss"></style>