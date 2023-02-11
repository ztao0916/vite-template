/*
 * @Author: ztao
 * @Date: 2023-02-11 16:57:02
 * @LastEditTime: 2023-02-11 17:21:15
 * @Description:
 */
import request from '@/utils/request';

//测试接口
export const test = () => {
  return request({
    url: '/mock/demo',
    method: 'get'
  });
};
