<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 没有子路由-->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-else-if="item.children.length === 1">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" @click="goRoute">
                <el-icon>
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 只有一个-->

        <!-- 多个子路由-->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router = useRouter();
defineProps(["menuList"])

const goRoute = (vc:any)=>{
    $router.push(vc.index)
}



</script>
<script lang="ts">
export default {
    name: "Menu"
}
</script>
<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>