function getSketchVersion(app) {
  return exec
    .execFile(
      path.join(
        getSketchPath(app),
        '/Contents/Resources/sketchtool/bin/sketchtool'
      ),
      ['-v']
    )
    .then(({ stdout }) => {
      let version = extractVersion(stdout)
      const pointNumbers = version.split('.').length
      if (pointNumbers === 1) {
        version += '.0.0'
      } else if (pointNumbers === 2) {
        version += '.0'
      }
      return version
    })
    .catch(() => undefined)
}