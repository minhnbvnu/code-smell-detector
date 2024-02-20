function getTypeScriptTypeAlias(type) {
  const { title, properties } = type

  return formatBlock`
    export type ${title} = ${getParams(properties)}
  `
}