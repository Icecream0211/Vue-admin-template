<template>

    <el-button icon="Refresh" circle size="small" @click="refreshMain"></el-button>
    <el-button icon="FullScreen" circle size="small" @click="fullScreen"></el-button>
    <el-button icon="Setting" circle size="small"></el-button>
    <img :src="userStore.avatar" alt="" style="width: 24px;height: 24px;margin-left:10px;margin-right: 10px;border-radius: 50%" />

    <el-dropdown>
        <span class="el-dropdown-link">
            {{userStore.username}}
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

let layoutSettingStore = useLayoutSettingStore();

const refreshMain = () => {
    layoutSettingStore.changeRefresh(!layoutSettingStore.refresh)
}

const fullScreen = () => {
    let fullScreen = document.fullscreenElement;
    console.log(fullScreen);
    if (!fullScreen) {
        document.documentElement.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
}


const logout = async() => {
    await userStore.userLogout();
    $router.push({path:'/login',query:{redirect:$router.currentRoute.value.path}});
}

</script>
<style scoped lang="scss"></style>