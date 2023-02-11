/*
 * @Author: ztao
 * @Date: 2023-02-08 15:29:31
 * @LastEditTime: 2023-02-11 15:36:29
 * @Description:
 */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/scss/base.scss';
import App from '@/App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.mount('#app');
