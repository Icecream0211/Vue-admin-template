<template>
    <el-form label-width="120px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(千克)">
            <el-input placeholder="重量" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item v-for="(item, $index) in attrArr" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
                        <el-option v-for="(attrValue, index) in item.attrValueList" :label="attrValue.valueName"
                            :value="`${item.id}:${attrValue.id}`"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item v-for="(attr, $index) in saleAttr" :key="attr.id" :label="attr.saleAttrName">
                    <el-select v-model="attr.saleIdAndValueId" placeholder="请选择">
                        <el-option v-for="item in attr.spuSaleAttrValueList" :key="item.id"
                            :label="item.saleAttrValueName" :value="`${attr.id}:${item.id}`"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片列表">
            <el-table border style="width: 100%" :data="imgArr" ref="table">
                <el-table-column type="selection" width="80" align="center"></el-table-column>
                <el-table-column label="图片" prop="name">
                    <template #default="{ row }">
                        <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;" />
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row, $index }">
                        <el-button type="success" size="small" @click="handleDefaultImg(row)">设置默认</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="mini" @click="saveSku">保存</el-button>
            <el-button size="mini" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { SpuData, SpuSaleAttr, SpuImage, SkuData } from '@/api/product/spu/type';
import { reqAllAttrInfo } from '@/api/product/attr';
import { AttrResponseData, Attr } from '@/api/product/attr/type';
import { reqAllBaseSaleAttrs, reqHasSpuImageList, reqHasSpuSaleAttrs, reqAddSku } from "@/api/product/spu/index.ts";


let table = ref<any>();

let $emit = defineEmits(['changeScene']);

let skuParams = reactive<SkuData>({
    category3Id: "",
    price: "",
    skuAttrValueList: [],
    skuDefaultImg: "",
    skuDesc: "",
    skuImageList: [],
    skuName: "",
    skuSaleAttrValueList: [],
    spuId: "",
    tmId: "",
    weight: "",
});


const cancel = () => {
    $emit('changeScene', { flag: 0, params: "" });
}

let attrArr = ref<Attr[]>([]);

let saleAttr = ref<SpuSaleAttr[]>([]);

let imgArr = ref<SpuImage[]>([]);
const initSkuData = async (c1Id: number, c2Id: number, c3Id: number, spu: any) => {
    skuParams.category3Id = c3Id;
    skuParams.spuId = spu.id;
    skuParams.tmId = spu.tmId;


    let result: AttrResponseData = await reqAllAttrInfo(c1Id, c2Id, c3Id);
    if (result.code === 200) {
        attrArr.value = result.data;
    }

    let result2 = await reqHasSpuSaleAttrs(spu.id);
    if (result2.code === 200) {
        saleAttr.value = result2.data;
    }


    let result3 = await reqHasSpuImageList(spu.id);
    if (result3.code === 200) {
        imgArr.value = result3.data;
    }

}


const handleDefaultImg = (row: any) => {

    imgArr.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    })

    skuParams.skuDefaultImg = row.imgUrl;
    table.value.toggleRowSelection(row, true);
}

const saveSku = async () => {
    let attrs = attrArr.value.reduce((prev: any, next: any) => {
        if(next.attrIdAndValueId){
            let [attrId,valueId] = next.attrIdAndValueId.split(':');
            prev.push({attrId,valueId})
        }
        return prev;
    }, [])
    skuParams.skuAttrValueList = attrs;

    let saleAttrs = saleAttr.value.reduce((prev: any, next: any) => {
        if(next.saleIdAndValueId){
            let [saleAttrId,saleAttrValueId] = next.saleIdAndValueId.split(':');
            prev.push({saleAttrId,saleAttrValueId})
        }
        return prev;
    }, []);
    skuParams.skuSaleAttrValueList = saleAttrs;


    let result  = await reqAddSku(skuParams);
    if(result.code === 200){
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        });
        $emit('changeScene', { flag: 0, params: "" });
    }else{
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        });
    }
}

defineExpose({ initSkuData })
</script>
<style scoped lang="scss"></style>