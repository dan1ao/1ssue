import { escapeRegExp } from 'es-toolkit'

export { libraryConfig } from './lib'
export { appConfig } from './app'

export const defineExternalConfig = (
  ...dependenciesList: Record<string, string>[]
) => {
  return Array.from(
    new Set(
      ...dependenciesList.map((dependencies) =>
        Object.keys(dependencies)
          .map((item) => {
            return new RegExp('^' + escapeRegExp(item) + '(?:\\\\/|$)')
          })
          .flat(),
      ),
    ),
  )
}
