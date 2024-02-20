function getTypeScriptFPFnModuleDefinition(submodule, fnSuffix, isDefault, fn) {
  const { title } = fn
  const moduleName = `date-fns-tz${submodule}/fp/${title}${fnSuffix}`

  const definition = formatBlock`
    declare module '${moduleName}' {
      import {${title}} from 'date-fns-tz${submodule}/fp'
      export ${isDefault ? 'default' : '='} ${title}
    }
  `

  return {
    name: moduleName,
    definition,
  }
}