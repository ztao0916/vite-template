/*
 * @Author: ztao
 * @Date: 2023-02-08 15:29:31
 * @LastEditTime: 2023-02-11 18:31:57
 * @Description:
 */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/scss/index.scss';
import App from '@/App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';

const app = createApp(App);

//图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  if (key == 'Menu') {
    app.component('IconMenu', component);
  } else {
    app.component(key, component);
  }
}

app.use(ElementPlus).use(router);
app.mount('#app');
