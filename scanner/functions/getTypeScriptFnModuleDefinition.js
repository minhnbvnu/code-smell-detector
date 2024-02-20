function getTypeScriptFnModuleDefinition(submodule, fnSuffix, isDefault, fn) {
  const name = fn.content.name
  const moduleName = `date-fns-tz${submodule}/${name}${fnSuffix}`

  const definition = formatBlock`
    declare module '${moduleName}' {
      import {${name}} from 'date-fns-tz${submodule}'
      export ${isDefault ? 'default' : '='} ${name}
    }
  `

  return {
    name: moduleName,
    definition,
  }
}