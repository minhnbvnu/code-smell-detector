function outputDiagnostics(diagnostic) {
  const prefix = '  '
  let output = `${prefix}---\n`

  output += prefix + yaml.dump(diagnostic).split('\n').join(`\n${prefix}`)
  output += '...\n'
  return output
}