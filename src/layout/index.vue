<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{fold: layoutSettingStore.fold? true : false}">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <el-menu :collapse="layoutSettingStore.fold?true:false" background-color="#001529" text-color="#fff" active-text-color="#409EFF" :default-active="$route.path" >
                    <Menu :menuList="useStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{fold: layoutSettingStore.fold? true : false}">
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{fold: layoutSettingStore.fold? true : false}">
            <Main></Main>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import useUserStore from '@/store/modules/user';
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import useLayoutSettingStore from '@/store/modules/setting';

let useStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()


const $route = useRoute()


</script>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: white;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        color: white;
        transition: all 0.3s;
        .scrollbar {
            width: auto;
            height: calc(100vh - $base-menu-logo-hight);
            .el-menu{
                border-right: none;
            }
        }
        &.fold{
            width: $base-menu-min-width;

        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        background-color: green;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>