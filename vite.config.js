import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

const nodeResolve = (dir) => path.resolve(__dirname, '.', dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
      cache: false
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
        target: 'http://test.epean.cn', //实际的后端 api 地址。如请求/api/abc 会转发到http://test.epean.cn/api/abc
        // target: 'https://lms.epean.com.cn',
        changeOrigin: true, //是否改写origin.设为true,则请求header中origin将会与target配置项的域名一致
        secure: true, //如果是https请设置为true
        rewrite: (url) => url.replace(/^\/api/, ''), //重写转发的请求链接
        cookieDomainRewrite: {
          // 'lms.epean.com.cn': 'localhost'
          'test.epean.cn': 'localhost'
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
