<template>
    <el-card class="box-card-catagray">
        <el-form :inline="true">
            <el-form-item label="一级分类" width="120px" >
                <el-select v-model="categoryStore.c1Id" @change="c1Change" :disabled="scene==1">
                    <el-option v-for="(c1, $index) in categoryStore.c1Arr" :label="c1.name" :key="$index"
                        :value="c1.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" width="120px">
                <el-select v-model="categoryStore.c2Id" @change="c2Change" :disabled="scene==1">
                    <el-option v-for="(c2, $index) in categoryStore.c2Arr" :label="c2.name" :key="$index"
                        :value="c2.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" width="120px">
                <el-select v-model="categoryStore.c3Id"  :disabled="scene==1">
                    <el-option v-for="(c3, $index) in categoryStore.c3Arr" :label="c3.name" :key="$index"
                        :value="c3.id" />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/product';


defineProps(['scene'])

let categoryStore = useCategoryStore();
onMounted(() => {
    getC1();
})

const getC1 = () => {
    categoryStore.fetchC1();
}

const c1Change = () => {
    categoryStore.c2Id = '';
    categoryStore.c2Arr = [];
    categoryStore.c3Id = '';
    categoryStore.c3Arr = [];
    categoryStore.fetchC2()
}

const c2Change = () => {
    categoryStore.c3Id = '';
    categoryStore.c3Arr = [];
    categoryStore.fetchC3()
}
</script>
<style scoped lang="scss">
.el-form--inline {
    .el-form-item {

        .el-input,
        .el-cascader,
        .el-select,
        .el-autocomplete {
            width: 240px;
        }
    }
}
</style>