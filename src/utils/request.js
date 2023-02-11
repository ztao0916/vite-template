/*
 * @Author: ztao
 * @Date: 2022-05-28 22:33:19
 * @LastEditTime: 2023-02-11 17:10:36
 * @Description: axios封装
 */
import axios from 'axios';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';

// 在全局请求和响应拦截器中添加请求状态
let loading = null;
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000, //10分钟
  withCredentials: true //携带身份认证文件cookie
});

service.interceptors.request.use(
  (config) => {
    if (config.loading) {
      loading = ElLoading.service({ text: '拼命加载中' });
    }
    return config; //必须返回配置
  },
  (error) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data;
    const { responseType } = response.config;
    if (loading) loading.close();
    if (responseType == 'blob') {
      return response.data;
    }
    //要根据code决定下面的操作
    if (code == '0000') {
      return response.data;
    } else {
      //业务错误

      ElMessageBox.alert(msg || '请求失败', '错误信息', {
        confirmButtonText: '确认',
        type: 'error',
        dangerouslyUseHTMLString: true
      });

      // ElMessage.error(msg || '请求失败'); //提示错误信息
      // return Promise.reject(new Error(msg || '请求失败'));
    }
  },
  (error) => {
    if (loading) loading.close();
    console.log('错误信息', error);
    ElMessage.error(error || error.message);
    return Promise.reject(error);
  }
);

export default service;
