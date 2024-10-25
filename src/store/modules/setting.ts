import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('LayoutSettingStore', {
    // 小仓库存储数据的地方
    state: () => {
        return {
            fold: false,
            refresh:false
        }
    },
    getters: {
        getFold(): boolean {
            return this.fold
        },
        getRefresh(): boolean {
            return this.refresh
        }
    },
    actions: {
        // 修改菜单折叠状态
        changeFold(fold: boolean) {
            this.fold = fold
        },
        // 修改菜单刷新状态
        changeRefresh(refresh: boolean) {
            this.refresh = refresh
        }
    }
});

export default useLayoutSettingStore