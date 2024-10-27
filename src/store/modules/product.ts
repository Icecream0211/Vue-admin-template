/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-20 10:58:16
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-20 16:31:38
 */
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3, reqAllAttrInfo } from '@/api/product/attr'
import { CategoryResponseData, CategoryObj } from '@/api/product/attr/type'
import { CategoryState } from './types/types';

let useCategoryStore = defineStore('Category', {
    // 小仓库存储数据的地方
    state: (): CategoryState => {
        return {
            c1Arr: [],
            c1Id: '',
            c2Arr: [],
            c2Id: '',
            c3Arr: [],
            c3Id: ''
        }
    },
    actions: {
        async fetchC1() {
            let request: CategoryResponseData = await reqC1();
            if (request.code === 200) {
                this.c1Arr = request.data
            }
        },
        async fetchC2() {
            let request: CategoryResponseData = await reqC2(this.c1Id);
            if (request.code === 200) {
                this.c2Arr = request.data
            }
        },
        async fetchC3() {
            let request: CategoryResponseData = await reqC3(this.c2Id);
            if (request.code === 200) {
                this.c3Arr = request.data
            }
        }
    },
    getters: {
    }
});

export default useCategoryStore;
