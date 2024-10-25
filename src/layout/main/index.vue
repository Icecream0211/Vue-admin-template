<template>
    <router-view v-slot="{ Component }" >
        <Transition name="fade">
             <component :is="Component" v-if="refreshFlag"/>
        </Transition>
    </router-view>
</template>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import { nextTick,ref, watch } from 'vue';

let refreshFlag = ref(true)

let layoutSettingStore = useLayoutSettingStore();

watch(()=>layoutSettingStore.getRefresh, () => {
    refreshFlag.value = false;
    nextTick(() => {
        refreshFlag.value = true;
    })
})
</script>
<style scoped lang="scss"></style>