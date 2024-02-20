function getFlowTypeAlias(type) {
  const { title, properties } = type
  return `type ${title} = ${getParams(properties)}`
}