import type { App } from 'vue'
import * as components from './components'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from './Category/index.vue'


/**
 * 两种注册方式，一种是直接将组件放到 allManualGloablComponent中；
 * 另一种是导入到components.ts中，自动注册
 */
const allManualGloablComponent: any = {Category}
const install = function (app: App) {


  Object.keys(allManualGloablComponent).forEach(key => {
    app.component(key, allManualGloablComponent[key])
  })

  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value)
  });
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default install
export * from './components'
