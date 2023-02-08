## vue3+vite通用模板

### 生成脚手架

```yaml
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

### 环境变量

```
.env         # 存放不同环境共用的环境变量，定义的变量将被各环境共享
.env.dev     # 开发环境
.env.stage   # 测试环境
.env.prod    # 正式环境
```

.env

```
VITE_TOKEN_NAME = 'token'
```

.env.dev

```
NODE_ENV = development

VITE_BASE_URL = http://wwww.demo.com/api

VITE_BASE_PATH = /
```

.env.stage

```
NODE_ENV = production

VITE_BASE_URL = http://wwww.stage.com/api

VITE_BASE_PATH = /stage
```

.env.prod

```
NODE_ENV = production

VITE_BASE_URL = http://wwww.prod.com/api

VITE_BASE_PATH = /prod
```

vite 的--mode 选项，会读取指定的值匹配的环境变量，如运行 vite --mode dev 时，.env 和.env.dev 两个环境变量文件将被加载

```yaml
//package.json
"scripts": {
  "dev": "vite --mode dev",
  "stage": "vue-tsc --noEmit && vite build --mode stage",
  "prod": "vue-tsc --noEmit && vite build --mode prod",
},
```



### 配置`vite.config.js/ts`

以下配置都是在`vite.config.js/ts`文件的对象内进行的

#### 定义全局常量

```js
//vite.config.ts/vite.config.js
define: {
    INITIAL_COUNT: 10,
}
//代码中使用
const count = ref(INITIAL_COUNT);
```

#### 配置别名alias

```js
import path from 'path';

const nodeResolve = (dir) => path.resolve(__dirname, '.', dir);

//vite.config.ts/vite.config.js
resolve: {
    alias: {
      '@': nodeResolve('src'),
      '~': nodeResolve('public'),
    },
 }
```

#### 配置代理 Proxy

```js
 //配置代理
 server: {
    host: '0.0.0.0',
    // port: 3000, //可写可不写,写了就是固定端口3000
    proxy: {
      '/api': {
        target: 'http://test.epean.cn', //实际的后端 api 地址。如请求/api/abc 会转发到http://test.epean.cn/api/abc
        // target: 'https://lms.epean.com.cn',
        changeOrigin: true, //是否改写origin.设为true,则请求header中origin将会与target配置项的域名一致
        secure: true, //如果是https请设置为true
        rewrite: (url) => url.replace(/^\/api/, ''), //重写转发的请求链接
        cookieDomainRewrite: {
          // 'lms.epean.com.cn': 'localhost'
          'test.epean.cn': 'localhost',
        },
      },
    },
  },
```

#### 提供全局 less、scss 变量

```js
  //提供全局scss/less变量,二选一即可
  css: {
    preprocessorOptions: {
      less: {
        // additionalData: `@injectedColor: red;`, //直接提供变量@injectedColor
        additionalData: '@import "@/assets/less/variables.less";', //导入less文件提供变量
        javascriptEnabled: true,
      },
      scss: {
        // additionalData: `$injectedColor: orange;`,//直接提供变量$injectedColor
        additionalData: `@import "@/assets/scss/variables.scss";`,//导入scss文件提供变量
        javascriptEnabled: true,
      },
    },
  },
```



最终文件内容

```js
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

```





### 配置eslint/prettier

####  配置eslint

```js
//安装eslint
npm install -D @babel/core @babel/eslint-parser eslint
//创建文件
npx eslint --init
//.eslintrc.cjs,只改rules部分内容
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended', // 使用推荐的eslint
    'plugin:vue/vue3-recommended', // 使用插件支持vue3
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    requireConfigFile: false, //不能少
    parser: '@babel/eslint-parser'
  },
  // eslint-plugin-vue
  plugins: [
    'vue', // 引入vue的插件 vue <==> eslint-plugin-vue
    'prettier' // 引入规范插件  prettier <==>  eslint-plugin-prettier
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off', //关闭驼峰校验
    'no-unused-vars': 'warn', //警告已声明,未读取校验,不报错了
    'prettier/prettier': [
      //解决和prettier冲突的问题
      'error',
      {
        singleQuote: true, //强制单引号
        semi: true, //去掉结尾的分号
        vueIndentScriptAndStyle: true, //vue中的script和css缩进
        tabWidth: 2, //缩进2
        endOfLine: 'lf', //换行符使用lf
        arrowParens: 'always', //箭头函数参数始终带括号
        trailingComma: 'none' //结尾不加逗号
      }
    ]
  }
};

//安装插件
npx pnpm i -D vite-plugin-eslint
//把配置项放在plugin数组中,vite.config.js
plugins: [
    vue(),
    eslintPlugin({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'],
    }),
 ]
```

#### 配置prettier

```js
//安装
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

//.prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "vueIndentScriptAndStyle": true,
  "tabWidth": 2,
  "endOfLine": "lf",
  "arrowParens": "always",
  "eslintIntegration": true
}
```