function printDeps (deps, type) {
  if (!Object.keys(deps).length) return

  var oneLine = ['npm install']

  if (type === 'dev') {
    oneLine.push('--save-dev')
  } else if (type === 'optional') {
    oneLine.push('--save-optional')
  } else if (type === 'global') {
    oneLine.push('--global')
  } else {
    oneLine.push('--save')
  }

  var nonWarnDepNames = getNonWarnDepNames(deps)

  if (nonWarnDepNames.length) {
    if (type) {
      console.log(clc.underline('%sDependencies'), type)
    } else {
      console.log(clc.underline('dependencies'))
    }

    var table = new Table({ head: ['Name', 'Package', 'Latest'], style: { head: ['reset'] } })

    nonWarnDepNames.forEach(function (name) {
      var dep = deps[name]

      oneLine.push(name + '@' + dep[argv.unstable ? 'latest' : 'stable'])

      table.push([
        clc.magenta(name),
        clc.red(dep.required),
        clc.green(dep[argv.unstable ? 'latest' : 'stable'])
      ])
    })

    console.log('\n' + table.toString() + '\n\n' + oneLine.join(' ') + '\n')
  }

  printWarnings(deps, type)
}