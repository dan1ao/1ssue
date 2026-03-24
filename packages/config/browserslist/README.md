# `@1ssue/browserslist-config`

> https://browsersl.ist/#q=baseline+widely+available

## Usage

```
// package.json
{
  "devDependencies": {
    "@1ssue/browserslist-config": "latest"
  }
  "browserslist": [
    "extends @1ssue/browserslist-config"
  ]
}

// vite.config.ts
import { ViteTarget } from '@1ssue/browserslist-config'

defineConfig({
  build: {
   target: ViteTarget,
  },
})
```
