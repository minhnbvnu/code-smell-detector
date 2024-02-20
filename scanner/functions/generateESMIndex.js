function generateESMIndex(files) {
  const fileLines = files.map(
    (fn) => `export { default as ${fn.name} } from '${fn.path.replace(/\.js$/, '')}/index.js'`
  )

  const indexLines = [generatedAutomaticallyMessage].concat('').concat(fileLines).join('\n')

  return `${indexLines}\n`
}