<template>
  <el-card>

    <el-table border :data="skuArr">
      <el-table-column label="序号" type="index" width="80px"></el-table-column>
      <el-table-column label="名称" prop="skuName" show-overflow-tooltip width="250px"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" show-overflow-tooltip width="550px"></el-table-column>

      <el-table-column label="默认图片" width="150px">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" style="width:100px;height:100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" prop="weight" width="150px"></el-table-column>

      <el-table-column label="价格(元)" prop="price" width="150px"></el-table-column>

      <el-table-column label="操作" fixed="right" width="250px">
        <template #="{ row, $index }">

          <el-button :type="row.isSale == 0 ? 'primary' : 'info'" :icon="row.isSale == 0 ? 'Top' : 'Bottom'"
            size="small" @click="upOrCancelToSale(row)"></el-button>
          <el-button type="primary" icon="Edit" size="small" @click="editSku(row)"></el-button>
          <el-button type="primary" icon="InfoFilled" size="small" @click="infoSku(row)"></el-button>
          <el-button type="danger" icon="Delete" size="small" @click="deleteSku(row)"></el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination style="margin: 5px 0px;" v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.pageSize" :page-sizes="[3, 5, 7, 9]" size="5" :background="true"
      layout="prev, pager, next, jumper,->,total, sizes" :total="pagination.total" @size-change="handleSizeChange"
      @current-change="getSku" />





    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin:10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>

        <el-row style="margin:10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>

        <el-row style="margin:10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>


        <el-row style="margin:10px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="attr in skuInfo.skuAttrValueList">{{ attr.valueName }}</el-tag>
          </el-col>
        </el-row>

        <el-row style="margin:10px 0px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">

            <el-tag v-for="attr in skuInfo.skuSaleAttrValueList">{{ attr.saleAttrValueName }}</el-tag>
          </el-col>
        </el-row>


        <el-row style="margin:10px 0px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
                <img :src="item.imgUrl" alt="" style="width:100%;height:100%">          
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { reqSkuList, reqDeleteSku, reqCancelSale, reqOnSale,reqSkuInfo } from '@/api/product/sku/index.ts';
import { SkuResponseData, SkuData,SkuInfoData } from '@/api/product/sku/type';

let pagination = reactive({
  currentPage: 1,
  pageSize: 3,
  total: 0
});

let drawer = ref(false);

const handleSizeChange = (val: number) => {
  pagination.pageSize = val;
  getSku();

};

onMounted(() => {
  getSku();
})

let skuArr = ref<SkuData[]>([]);

const getSku = async (currentPage = 1) => {

  const result: SkuResponseData = await reqSkuList(currentPage, pagination.pageSize);
  if (result.code == 200) {
    pagination.currentPage = result.data.current;
    pagination.total = result.data.total;
    skuArr.value = result.data.records;
  }
};



const deleteSku = async (row: any) => {
  let result = await reqDeleteSku(row.id);
}

const upOrCancelToSale = async (row: SkuData) => {

  if (row.isSale == 1) {
    let result = await reqCancelSale(row.id as number);
    if (result.code == 200) {
      row.isSale = 0;
      ElMessage.success("下架成功");
    } else {
      ElMessage.error("下架失败");
      return Promise.reject(new Error("error"))
    }

  } else {
    let result = await reqOnSale(row.id as number);
    if (result.code == 200) {
      row.isSale = 1;
      ElMessage.success("上架成功");
    } else {
      ElMessage.error("上架失败");
      return Promise.reject(new Error("error"))
    }
  }
  getSku(pagination.currentPage);
}


const skuInfo = ref<SkuData>({
});
const infoSku = async (row: SkuData) => {
  let result:SkuInfoData = await reqSkuInfo(row.id as number);
  if (result.code == 200) {
    drawer.value = true;
    skuInfo.value = result.data;
  }

}



const editSku = async (row: any) => {

}


</script>


<style lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>