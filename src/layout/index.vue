<template>
    <div class="layout_container">
        <div class="layout_slider">]
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="#fff" active-text-color="#409EFF" :default-active="$route.path" >
                    <Menu :menuList="useStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar">
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main">
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

let useStore = useUserStore()

const $route = useRoute()


</script>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: white;

    .layout_slider {
        width: $base-menu-width;
        height: 100%;
        background-color: $base-menu-background;
        color: white;
        .scrollbar {
            width: $base-menu-width;
            height: calc(100vh - $base-menu-logo-hight);
            .el-menu{
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
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
    }
}
</style>