function swaggerFileFilter (file) {
  const isSwagger = /^\.(?:json|yaml|yml)$/.test(path.extname(file.Key))
  console.log(`file ${file.Key} is${isSwagger ? '' : ' not'} a swagger file.`)
  return isSwagger
}