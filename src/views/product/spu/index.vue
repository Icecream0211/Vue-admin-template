<template>
    <Category :scene="scene"></Category>
    <el-card style="margin:10px 0">

        <div v-show="scene == 0">
            <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addSpu"
                plain>添加SPU</el-button>
            <el-table :data="spuList" border style="margin: 5px 0px;">
                <el-table-column label="序号" type="index" width="80px"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName" width="120px"></el-table-column>
                <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="210px">
                    <template v-slot="{ row, $index }">
                        <el-button type="success" icon="Plus" title="添加SKU" size="small"
                            @click="addSku(row)"></el-button>
                        <el-button type="primary" icon="Edit" @click="updateSpu(row)" title="修改SPU"
                            size="small"></el-button>
                        <el-button type="primary" icon="View" title="查看SKU" size="small"
                            @click="findSku(row)"></el-button>
               

                        <el-popconfirm :title="`确定要删除${row.spuName}嘛?`" icon="Delete" @confirm="deleteSpu(row)" width="260px">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>

                    </template>

                </el-table-column>


            </el-table>
            <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
                :page-sizes="[3, 5, 7, 9]" size="5" :background="true"
                layout="prev, pager, next, jumper,->,total, sizes" :total="pagination.total"
                @size-change="handleSizeChange" @current-change="getSPU" />

        </div>

        <SpuForm ref="spu" v-show="scene == 1" @changeScene="handleSceneChange"></SpuForm>
        <SkuForm ref="sku" v-show="scene == 2" @changeScene="handleSceneChange"></SkuForm>



        <el-dialog v-model="dialogVisible">
            <el-table :data="skuArr">
                <el-table-column label="SKU名称" prop="skuName"></el-table-column>
                <el-table-column label="SKU价格" prop="price"></el-table-column>
                <el-table-column label="sk重量" prop="weight"></el-table-column>
                <el-table-column label="图片">
                    <template v-slot="{ row }">
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </el-card>


</template>
<script setup lang="ts">
import { reactive, ref, watch ,onBeforeUnmount} from 'vue'
import useCategoryStore from '@/store/modules/product';
import { reqHasSpu, reqSkuList, reqDeleteSpu } from '@/api/product/spu/index';
import { HasSpuResponseData, SpuData, SkuData } from '@/api/product/spu/type';
import SkuForm from './skuForm.vue';
import SpuForm from './spuForm.vue';

const spuList = ref<SpuData[]>([]);

let spu = ref<any>();
let sku = ref<any>();


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
const updateSpu = (row: SpuData) => {
    scene.value = 1;
    //调用子组件实例方法
    spu.value.initHasSpuData(row);
}


const handleSceneChange = (obj: any) => {
    scene.value = obj.flag;
    if (obj.params == 'update') {
        //修改
        getSPU(pagination.currentPage);
    } else {
        getSPU();
    }
}


let skuArr = ref<SkuData[]>([]);
let dialogVisible = ref(false);



const findSku = async (row: SpuData) => {
    let result = await reqSkuList(row.id as number);
    console.log(result);
    if (result.code == 200) {
        skuArr.value = result.data;
        dialogVisible.value = true;
    }
}

const addSku = (row: SpuData) => {
    scene.value = 2;
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id, row);
}


const deleteSpu = async (row: SpuData) => {
    let response = await reqDeleteSpu(row.id as number);
    if (response.code == 200) {
        ElMessage.success('删除成功');
        getSPU();
    } else {
        ElMessage.error('删除失败');
    }
}


onBeforeUnmount(() => {
    categoryStore.$reset();
})

</script>
<style scoped lang="scss"></style>