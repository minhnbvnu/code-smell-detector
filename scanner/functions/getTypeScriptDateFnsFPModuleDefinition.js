function getTypeScriptDateFnsFPModuleDefinition(submodule, fns) {
  const moduleName = `date-fns-tz${submodule}/fp`

  const fnDefinitions = fns.map(getTypeScriptFPFnDefinition)

  const definition = formatBlock`
    declare module '${moduleName}' {
      import { OptionsWithTZ } from "date-fns-tz"

      ${addSeparator(fnDefinitions, '\n')}
    }
  `

  return {
    name: moduleName,
    definition,
  }
}