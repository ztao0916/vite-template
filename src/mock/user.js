/*
 * @Author: ztao
 * @Date: 2023-02-11 16:37:14
 * @LastEditTime: 2023-02-11 16:48:35
 * @Description: 用户相关接口
 */
export default [
  {
    url: '/mock/demo',
    method: 'get',
    response: () => {
      return {
        code: '0000',
        message: 'ok',
        'data|12': [
          {
            warnBl: 0, // 预警占比
            'warnLevel|0-3': 0, // 预警等级
            'warnNum|0-100': 0, // 预警数量
            'warnTotal|0-100': 0 // 报警数量
          }
        ]
      };
    }
  }
];
