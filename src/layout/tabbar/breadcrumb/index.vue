<template>

    <el-icon style="margin-right: 20px;" @click="changeIcon">
        <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">

        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span style="margin: 0px 5px">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>

</template>
<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
const settingStore = useLayoutSettingStore();
const changeIcon = () => {
    settingStore.changeFold(!settingStore.fold)
};

</script>
<style scoped lang="scss"></style>