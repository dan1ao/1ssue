# @1ssue/vite-config

## Install

```sh
  pnpm add -D @1ssue/vite-config
```

## App Usage in vite.config.ts

```
import { appConfig } from '@1ssue/vite-config'

// https://vitejs.dev/config/
export default mergeConfig(
  appConfig,
  defineConfig({
    ...
  }),
)
```

## Lib Usage in vite.config.ts

> src/index.ts => dist/index.js + dist/types/index.d.ts

```
import { defineExternalConfig, libraryConfig } from '@1ssue/vite-config'
import { dependencies, peerDependencies } from './package.json'

// https://vitejs.dev/config/
export default mergeConfig(
  libConfig,
  defineConfig({
    build: {
      rolldownOptions: {
        external: defineExternalConfig(peerDependencies, dependencies),
      },
    },
  }),
)
```
