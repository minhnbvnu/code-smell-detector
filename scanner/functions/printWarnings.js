function printWarnings (deps, type) {
  if (!Object.keys(deps).length) return

  var warnings = {
    E404: { title: 'Unregistered', list: [] },
    ESCM: { title: 'SCM', list: [] },
    EDEPTYPE: { title: 'Non-string dependency', list: [] }
  }

  for (var name in deps) {
    var dep = deps[name]

    if (dep.warn) {
      warnings[dep.warn.code].list.push([clc.magenta(name), clc.red(dep.warn.toString())])
    }
  }

  Object.keys(warnings).forEach(function (warnType) {
    var warnList = warnings[warnType].list

    if (!warnList.length) return

    var table = new Table({ head: ['Name', 'Message'], style: { head: ['reset'] } })

    console.log(clc.underline(warnings[warnType].title + ' ' + (type ? type + 'D' : 'd') + 'ependencies') + '\n')
    warnList.forEach(function (row) { table.push(row) })
    console.log(table.toString() + '\n')
  })
}