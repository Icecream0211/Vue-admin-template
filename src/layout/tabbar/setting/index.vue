<template>

    <el-button icon="Refresh" circle size="small" @click="refreshMain"></el-button>
    <el-button icon="FullScreen" circle size="small" @click="fullScreen"></el-button>

    <el-popover placement="bottom" title="主题设置" :width="300" trigger="click">

        <el-form>
            <el-form-item label="主题色">
                <el-color-picker v-model="color" @change="colorChange" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch v-model="darkMode" size="large" class="mt-2" style="margin-left: 24px" inline-prompt
                    active-icon="MoonNight" inactive-icon="Sunny" @change="handleDarkMode"></el-switch>
            </el-form-item>
        </el-form>

        <template #reference>
            <el-button icon="Setting" circle size="small"></el-button>
        </template>
    </el-popover>
    <img :src="userStore.avatar" alt=""
        style="width: 24px;height: 24px;margin-left:10px;margin-right: 10px;border-radius: 50%" />

    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';

let userStore = useUserStore();
let $router = useRouter();
let darkMode = ref(false);
let layoutSettingStore = useLayoutSettingStore();

const refreshMain = () => {
    layoutSettingStore.changeRefresh(!layoutSettingStore.refresh)
}

const fullScreen = () => {
    let fullScreen = document.fullscreenElement;
    console.log(fullScreen);
    if (!fullScreen) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}


const logout = async () => {
    await userStore.userLogout();
    $router.push({ path: '/login', query: { redirect: $router.currentRoute.value.path } });
}



import { ref } from 'vue'

const color = ref('rgba(255, 69, 0, 0.68)')

const handleDarkMode = () => {
    let html = document.documentElement;
    darkMode.value ? html.className = 'dark' : html.className = '';
}


const colorChange = () => {
    console.log(111111111111111)
    let html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value);
}

</script>
<style scoped lang="scss"></style>