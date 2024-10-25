import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('LayoutSettingStore', {
    // 小仓库存储数据的地方
    state: () => {
        return {
            fold: false
        }
    },
});

export default useLayoutSettingStore