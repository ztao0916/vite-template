/*
 * @Author: ztao
 * @Date: 2023-02-12 15:59:56
 * @LastEditTime: 2023-02-12 16:00:01
 * @Description: 路由文件
 */

export const routes = [
  {
    path: '/login',
    component: () => import('@/view/Login/index.vue'),

    children: [],
    meta: {
      title: '登录页',
      hideMenu: true //加入hideMenu属性，不展示在侧边栏
    },
    name: 'Login'
  },
  {
    path: '/',
    component: () => import('@/view/Home/index.vue'),
    meta: {
      keepalive: true,
      title: '主页'
    },
    name: 'Home',
    // hideMenu: true,//不展示在侧边栏
    children: [],
    redirect: '/index'
  }
];
