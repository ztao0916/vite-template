/*
 * @Author: ztao
 * @Date: 2023-02-11 16:57:02
 * @LastEditTime: 2023-02-11 18:20:30
 * @Description:
 */
import request from '@/utils/request';

//测试接口
export const getMenus = () => {
  return request({
    url: '/mock/menus',
    method: 'get'
  });
};
