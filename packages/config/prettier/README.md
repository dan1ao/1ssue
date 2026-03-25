# @1ssue/prettier-config

## Overwrite

```
semi: false
singleQuote: true
vueIndentScriptAndStyle: true
importOrder: ['<THIRD_PARTY_MODULES>', '^[@/*]', '^[./]']
```

## Install

```
# 如果使用的是 pnpm，需要在.npmrc 文件中新增
public-hoist-pattern[] = *prettier*
```

```sh
  pnpm add -D @1ssue/prettier-config
```

## Usage

```
在 package.json 中添加
{
  "prettier": "@1ssue/prettier-config"
}
```

### 或

```
// 在项目根目录添加 prettier.config.js

import config from '@1ssue/prettier-config'

/** @type {import('prettier').Config} */
export default config

or

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default [
  ...config,
  // 如果你使用了 tailwindcss 的话，需要加上这一行，指向 import '@tailwindcss' 的文件
  tailwindStylesheet: './src/index.css',
  // 你的配置
  ...
]
```
