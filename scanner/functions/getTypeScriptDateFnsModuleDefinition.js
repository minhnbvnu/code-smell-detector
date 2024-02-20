function getTypeScriptDateFnsModuleDefinition(submodule, fns) {
  const moduleName = `date-fns-tz${submodule}`

  const definition = formatBlock`
    declare module '${moduleName}' {
      import { OptionsWithTZ } from "date-fns-tz"

      ${addSeparator(fns.map(getTypeScriptFnDefinition), '\n')}
    }
  `

  return {
    name: moduleName,
    definition,
  }
}