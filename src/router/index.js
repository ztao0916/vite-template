/*
 * @Author: ztao
 * @Date: 2023-02-12 15:59:56
 * @LastEditTime: 2023-02-27 10:59:13
 * @Description: 路由文件
 */
import { createRouter, createWebHashHistory } from 'vue-router';

const Layout = () => import('@/layout/index.vue');

//常驻路由
export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页'
    },
    name: 'Login'
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/home/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          svgIcon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/menu1',
    name: 'Menu',
    meta: {
      title: '多级菜单',
      svgIcon: 'menu'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/menu/menu1/index.vue'),
        redirect: '/menu/menu1/menu1-1',
        name: 'Menu1',
        meta: {
          title: 'menu1'
        },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/menu/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: {
              title: 'menu1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/menu/menu1/menu1-2/index.vue'),
            redirect: '/menu/menu1/menu1-2/menu1-2-1',
            name: 'Menu1-2',
            meta: {
              title: 'menu1-2'
            },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/menu/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'menu1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/menu/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'menu1-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/menu/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: {
              title: 'menu1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/menu/menu2/index.vue'),
        name: 'Menu2',
        meta: {
          title: 'menu2'
        }
      }
    ]
  }
];
/**
 * 本地路由:所有需要权限的路由,必须带有 Name 属性
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: '权限管理',
      svgIcon: 'lock',
      roles: ['admin', 'editor'], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // 或者在子导航中设置角色
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限' // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: '/404',
    name: 'ErrorPage',
    component: () => import('@/views/404/index.vue'),
    meta: {
      hidden: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constRoutes]
});

export default router;
