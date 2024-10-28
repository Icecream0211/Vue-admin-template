<template>
    <Category :scene="scene"></Category>
    <el-card style="margin:10px 0">

        <div v-show="scene == 0">
            <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addSpu" plain>添加SPU</el-button>
            <el-table :data="spuList" border style="margin: 5px 0px;">
                <el-table-column label="序号" type="index" width="80px"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName" width="120px"></el-table-column>
                <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="210px">
                    <template v-slot="{ row, $index }">
                        <el-button type="success" icon="Plus" title="添加SKU" size="small"></el-button>
                        <el-button type="primary" icon="Edit" @click="updateSpu(row)" title="修改SPU" size="small"></el-button>
                        <el-button type="primary" icon="View" title="查看SKU" size="small"></el-button>
                        <el-button type="warning" icon="Delete" title="上传图片" size="small"></el-button>
                    </template>

                </el-table-column>


            </el-table>
            <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
                :page-sizes="[3, 5, 7, 9]" size="5" :background="true"
                layout="prev, pager, next, jumper,->,total, sizes" :total="pagination.total"
                @size-change="handleSizeChange" @current-change="getSPU" />

        </div>
        
        <SpuForm ref="spu" v-show="scene == 1" @changeScene="handleSceneChange"></SpuForm>
        <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>


</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/product';
import { reqHasSpu } from '@/api/product/spu/index';
import { HasSpuResponseData, SpuData } from '@/api/product/spu/type';
import SkuForm from './skuForm.vue';
import SpuForm from './spuForm.vue';

const spuList = ref<SpuData[]>([]);

let spu = ref<any>();


let scene = ref(0);//0 显示现有列表；1：添加新增SPU ;2：添加修改SPU
let categoryStore = useCategoryStore();

let pagination = reactive({
    currentPage: 1,
    pageSize: 3,
    total: 0
});


watch(() => categoryStore.c3Id, async () => {
    if (!categoryStore.c3Id) {
        return;
    }
    getSPU();
});



const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    getSPU();
}

const getSPU = async (currentPage = 1) => {
    pagination.currentPage = currentPage;
    const result: HasSpuResponseData = await reqHasSpu(pagination.currentPage, pagination.pageSize, categoryStore.c3Id);
    if (result.code === 200) {
        spuList.value = result.data.records;
        pagination.total = result.data.total;
    } else {
        ElMessage.error(result.message);
    }
}


const addSpu = () => {
    scene.value = 1;
    spu.value.initAddSpu(categoryStore.c3Id);
}
const updateSpu = (row:SpuData)=>{
    scene.value = 1;
    //调用子组件实例方法
    spu.value.initHasSpuData(row);
}


const handleSceneChange = (obj:any) => {
     scene.value = obj.flag;
     if(obj.params=='update'){
        //修改
        getSPU(pagination.currentPage);
     }else{
        getSPU();
     }
}


</script>
<style scoped lang="scss"></style>