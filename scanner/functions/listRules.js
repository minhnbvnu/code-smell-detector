function listRules() {
  const args = process.argv.slice(2)
  let configPath = '.solhint.json'
  const configFileIndex = args.findIndex((arg) => arg === '-c' || arg === '--config')
  if (configFileIndex !== -1) {
    configPath = args[configFileIndex + 1]
    if (!configPath || configPath.startsWith('-')) {
      console.error('Error: Invalid configuration file path after -c or --config flag.')
      process.exit(1)
    }
  } else if (args.length !== 1) {
    console.log('Error!! no additional parameters after list-rules command')
    process.exit(1)
  }

  if (!fs.existsSync(configPath)) {
    console.log('Error!! Configuration does not exists')
    process.exit(1)
  } else {
    const config = readConfig()
    console.log('\nConfiguration File: \n', config)

    const reportLists = linter.processPath(configPath, config)
    const rulesObject = reportLists[0].config

    console.log('\nRules: \n')
    const orderedRules = Object.keys(rulesObject)
      .sort()
      .reduce((obj, key) => {
        obj[key] = rulesObject[key]
        return obj
      }, {})

    // eslint-disable-next-line func-names
    Object.keys(orderedRules).forEach(function (key) {
      console.log('- ', key, ': ', orderedRules[key])
    })
  }
}