<template>

    <el-button icon="Refresh" circle size="small" @click="refreshMain"></el-button>
    <el-button icon="FullScreen" circle size="small"></el-button>
    <el-button icon="Setting" circle size="small"></el-button>
    <img src="public/logo.jpg" alt="" style="width: 24px;height: 24px;margin-left:10px;margin-right: 10px;" />

    <el-dropdown>
        <span class="el-dropdown-link">
            Admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';

let layoutSettingStore = useLayoutSettingStore();

const refreshMain = () => {
    layoutSettingStore.changeRefresh(!layoutSettingStore.refresh)
}


</script>
<style scoped lang="scss"></style>