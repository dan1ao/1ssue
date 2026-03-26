import { escapeRegExp } from 'es-toolkit'
import { defineConfig, mergeConfig } from 'vite'
import { peerDependencies } from './package.json'
import { defineExternalConfig, libraryConfig } from './src'

export const defineExternalConfig1 = (
  dependencies: Record<string, unknown>,
) => {
  return Object.keys(dependencies).map((item) => {
    return new RegExp('^' + escapeRegExp(item) + '(\\/|$)')
  })
}

console.log(
  'defineExternalConfig(peerDependencies)',
  defineExternalConfig(peerDependencies),
  defineExternalConfig1(peerDependencies),
)
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
