function getMeteorBinding () {
  const argv = this.process.argv
  if (Array.isArray(argv)) {
    const index = argv.findIndex(
      arg => arg.indexOf('-p') === 0 || arg.indexOf('--port') === 0
    )
    if (index !== -1) {
      const arg = argv[index]
      const equalIndex = arg.indexOf('=')
      let value
      if (equalIndex !== -1) {
        value = arg.substr(equalIndex + 1)
      } else {
        value = argv[index + 1]
      }
      const results = value.split(':')
      let networkInterface
      let port
      if (results.length === 2) {
        networkInterface = results[0]
        port = results[1]
      } else {
        port = results[0]
      }
      return {
        networkInterface,
        port: parseInt(port),
      }
    }
  } else {
    const reg = /(?:--port|-p)(?:=|\s)(?:([0-9.]+):)?(\d+)/gi
    const result = reg.exec(argv)
    if (result && result.length >= 2) {
      const networkInterface = result[1]
      const port = parseInt(result[2])
      return {
        networkInterface,
        port,
      }
    }
  }
  return {}
}