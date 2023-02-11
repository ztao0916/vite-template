/*
 * @Author: ztao
 * @Date: 2023-02-08 15:29:31
 * @LastEditTime: 2023-02-11 17:24:47
 * @Description:
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path';

const nodeResolve = (dir) => path.resolve(__dirname, '.', dir);

const commonUrl = 'http://test.epean.cn';

// const commonUrl = 'https://lms.epean.com.cn';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
      cache: false
    }),
    viteMockServe({
      //配置mock位置
      mockPath: '/src/mock',
      localEnabled: true, // 开发环境设为true,本地开发用
      prodEnabled: false, // 生产环境设为true,这样可以控制关闭mock的时候不让mock打包到最终代码内
      injectCode: ` import { setupProdMockServer } from './mockServer'; setupProdMockServer(); `, //注入mock接口
      logger: false, //是否在控制台显示请求日志
      supportTs: false, //打开后，可以读取 ts 文件模块.请注意,打开后将无法监视js文件
      watchFiles: true // 监听文件内容变更
    })
  ],
  //定义全局常量
  define: {
    INITIAL_COUNT: 10
  },
  //配置别名
  resolve: {
    alias: {
      '@': nodeResolve('src'),
      '~': nodeResolve('public')
    }
  },
  //配置代理
  server: {
    host: '0.0.0.0',
    port: 3000, //可写可不写,写了就是固定端口3000
    proxy: {
      '/api': {
        target: commonUrl, //实际的后端 api 地址。如请求/api/abc 会转发到http://test.epean.cn/api/abc
        changeOrigin: true, //是否改写origin.设为true,则请求header中origin将会与target配置项的域名一致
        secure: true, //如果是https请设置为true
        logLevel: 'debug',
        rewrite: (url) => url.replace(/^\/api/, ''), //重写转发的请求链接
        cookieDomainRewrite: {
          // 'lms.epean.com.cn': 'localhost'
          'test.epean.cn': 'localhost'
        },
        onProxyRes(proxyRes, req) {
          const realUrl = new URL(req.url || '', commonUrl)?.href || '';
          proxyRes.headers['x-real-url2'] = realUrl;
        }
      }
    }
  },
  //提供全局scss变量
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `$injectedColor: orange;`,//直接提供变量$injectedColor
        additionalData: `@import "@/assets/scss/variables.scss";`, //导入scss文件提供变量,这个最好
        javascriptEnabled: true
      }
    }
  }
});
