# @1ssue/eslint-config

> 基于 eslint v10 flat config

## Install

```
# 如果使用的是 pnpm，需要在.npmrc 文件中新增
public-hoist-pattern[] = *eslint*
```

```sh
  pnpm add -D @1ssue/eslint-config
```

## Usage

```
// 在项目根目录添加 eslint.config.js

// 默认配置是 react + ts + prettier
import config from '@1ssue/eslint-config'

/** @type {import('eslint').Linter.Config[]} */
export default config

or

export default [
  ...config,
  // 你的配置
]
```
