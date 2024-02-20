function generateIndex(files) {
  const propertyRequireLines = files.map(
    (fn) => `  ${fn.name}: require('${fn.path.replace(/\.js$/, '')}/index.js')`
  )

  const indexLines = [generatedAutomaticallyMessage]
    .concat('')
    .concat('module.exports = {')
    .concat(propertyRequireLines.join(',\n'))
    .concat('}')
    .join('\n')

  return `${indexLines}\n`
}