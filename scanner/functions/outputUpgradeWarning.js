function outputUpgradeWarning (latest) {
  var lines = [
    'This version is outdated! Latest version: ' + colors.bold.green(latest),
    'To upgrade, run: ' + colors.grey('npm install -g ' + pkg.name + '@' + latest)
  ]
  var warning = format.boxMessage(lines, { borderChar: colors.blue('*') })
  winston.warn('\n\n' + warning + '\n')
}