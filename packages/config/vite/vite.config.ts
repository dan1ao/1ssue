import { defineConfig, mergeConfig } from 'vite'
import { peerDependencies } from './package.json'
import { defineExternalConfig, libraryConfig } from './src'

export default mergeConfig(
  libraryConfig,
  defineConfig({
    build: {
      rolldownOptions: {
        external: defineExternalConfig(peerDependencies),
      },
    },
  }),
)
