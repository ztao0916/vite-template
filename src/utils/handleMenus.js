/*
 * @Author: ztao
 * @Date: 2023-02-11 18:34:44
 * @LastEditTime: 2023-02-12 18:27:02
 * @Description:
 */
import { getMenus } from '@/api/user';

//获取传入的routes的所有次级路由数组
export const getChildrenRoutes = (routes) => {
  const result = [];
  routes.forEach((route) => {
    if (route.sub && route.sub.length > 0) {
      result.push(...route.sub);
    }
  });
  return result;
};

/**
 * 处理接口返回的菜单数据
 * @param {*} routes 路由参数
 * @returns vue-router==>routes结构
 * 思路:
 * 1. route对象参数格式: path, component(暂时不需要,先写好静态的,然后动态匹配), redirect, name, meta, children
 * 2. 先根据写好所有的路由(静态)
 * 3. 使用递归
 */
// export const generateMenus = (routes) => {};

/**
 * @description: 匹配本地全部路由和接口返回的菜单路由
 * @param {*} menus 接口菜单路由
 * @param {*} localRoutes 本地全部路由
 * @return {*} 返回匹配的localRoutes结构
 */
export const _arrRoutes = (menus, localRoutes) => {
  const list = [];
  localRoutes.filter((item) =>
    menus.some((ele) => {
      if (item.sub && item.sub.length) {
        const routeChild = _arrRoutes(ele.sub ?? [], item.sub ?? []);
        if (routeChild.length) item.sub = routeChild;
      }
      // 筛选条件
      if (item.name === ele.name && item.uri === ele.uri) {
        list.push(item);
      }
    })
  );
  return list;
};

//测试递归比对
const asyncRoutes = [
  {
    id: 900027, //当前数据的id
    pid: 0, //父级id,0表示最上级
    name: '配置', //原名
    alias: '配置', //别名,其实也用不到,也不需要
    code: 'configuration', //配置码
    uri: '/configuration', //每一个层级对应的链接
    isVue: 0, //0表示非最终节点
    menuType: 1, //1表示菜单
    sort: 1, //排序,后端返回的顺序
    icon: 'lock', //图标,但是我们用不到,不需要
    // checked: true, //表示有权限?这个是加在什么位置?
    sub: [
      {
        id: 900030,
        pid: 900027,
        name: '人员',
        code: 'staff',
        uri: '/configuration/staff',
        isVue: 0, //0表示非最终节点
        menuType: 1,
        sort: 1,
        sub: [
          {
            id: 900123,
            pid: 900030,
            name: '测试按钮',
            code: 'testCode',
            uri: '',
            menuType: 2, //2表示按钮
            isVue: 1,
            sort: 1
          },
          {
            id: 900125,
            pid: 900030,
            name: 'vue资源',
            code: 'resource',
            uri: '/configuration/staff/resource',
            menuType: 1,
            isVue: 1,
            sort: 2
          },
          {
            id: 900126,
            pid: 900030,
            name: 'lms资源',
            code: 'resource',
            uri: '/configuration/staff/resource',
            menuType: 1,
            isVue: 2,
            sort: 3
          },
          {
            id: 900127,
            pid: 900030,
            name: '组织用户',
            code: 'organization',
            uri: '/configuration/staff/organization',
            menuType: 1,
            isVue: 2,
            sort: 3
          },
          {
            id: 900128,
            pid: 900030,
            name: '角色',
            code: 'role',
            uri: '/configuration/staff/role',
            menuType: 1,
            isVue: 2,
            sort: 3
          }
        ]
      },
      {
        id: 900119,
        pid: 900027,
        name: '店铺',
        code: 'store',
        uri: '/configuration/store',
        menuType: 1,
        isVue: 0,
        sort: 2,
        sub: [
          {
            id: 900120,
            pid: 900119,
            name: 'Mercado店铺',
            isVue: 1,
            code: 'mercadoaccount',
            uri: '/configuration/store/mercadoaccount',
            menuType: 1,
            sort: 1
          },
          {
            id: 900121,
            pid: 900119,
            name: 'wish店铺',
            isVue: 2, //jsp页面
            code: 'wishAccount',
            uri: '/configuration/store/wishAccount',
            menuType: 1,
            sort: 2
          }
        ]
      },
      {
        id: 900120,
        pid: 900027,
        name: '其他',
        code: 'other',
        uri: '/configuration/other',
        menuType: 1,
        isVue: 0,
        sort: 3,
        sub: [
          {
            id: 900140,
            pid: 900120,
            name: '币种汇率',
            isVue: 2, //jsp页面
            code: 'exchangerate',
            uri: '/configuration/other/exchangerate',
            menuType: 1,
            sort: 1
          },
          {
            id: 900141,
            pid: 900120,
            name: '标签字典',
            isVue: 2, //jsp页面
            code: 'labeldict',
            uri: '/configuration/other/labeldict',
            menuType: 1,
            sort: 2
          },
          {
            id: 900142,
            pid: 900120,
            name: '语音播报',
            isVue: 2, //jsp页面
            code: 'voiceSpeech',
            uri: '/configuration/other/voiceSpeech',
            menuType: 1,
            sort: 3
          },
          {
            id: 900143,
            pid: 900120,
            name: '定时报表',
            isVue: 2, //jsp页面
            code: 'timetask',
            uri: '/configuration/other/timetask',
            menuType: 1,
            sort: 4
          }
        ]
      }
    ]
  }
];

const menus = [
  {
    id: 900027, //当前数据的id
    pid: 0, //父级id,0表示最上级
    name: '配置', //原名
    alias: '配置', //别名,其实也用不到,也不需要
    code: 'configuration', //配置码
    uri: '/configuration', //每一个层级对应的链接
    isVue: 0, //0表示非最终节点
    menuType: 1, //1表示菜单
    sort: 1, //排序,后端返回的顺序
    icon: 'lock', //图标,但是我们用不到,不需要
    // checked: true, //表示有权限?这个是加在什么位置?
    sub: [
      {
        id: 900030,
        pid: 900027,
        name: '人员',
        code: 'staff',
        uri: '/configuration/staff',
        isVue: 0, //0表示非最终节点
        menuType: 1,
        sort: 1,
        demo: '子组件资源',
        sub: [
          {
            id: 900123,
            pid: 900030,
            name: '测试按钮',
            code: 'testCode',
            uri: '',
            menuType: 2, //2表示按钮
            isVue: 1,
            sort: 1
          }
        ]
      }
    ]
  }
];

//测试用
export const newMenus = async () => {
  try {
    //获取views目录下一级和二级目录下的index.vue文件
    // const views = import.meta.glob(
    //   [`@/view/*/index.vue`, `@/view/*/*/index.vue`],
    //   { eager: true }
    // );
    // console.log(views);
    let menusObj = await getMenus();
    console.log(getChildrenRoutes(menusObj.data));
    const routes = _arrRoutes(menus, asyncRoutes);
    console.log('筛选后的数据', routes);
  } catch (err) {
    console.log(err);
  }
};
